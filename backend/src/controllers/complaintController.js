import { body, param } from "express-validator";
import { Complaint } from "../models/Complaint.js";
import { ActivityLog } from "../models/ActivityLog.js";
import { User } from "../models/User.js";
import { enqueueNotification } from "../services/queueService.js";
import { getIO } from "../services/socketService.js";
import { COMPLAINT_STATUS, RESPONSIBILITY_CATEGORY, ROLES } from "../utils/constants.js";

const ELEVATED_COMPLAINT_ROLES = [ROLES.ADMIN, ROLES.HOD, ROLES.DIRECTOR];

export const createComplaintValidators = [
  body("title").trim().notEmpty(),
  body("description").trim().notEmpty(),
  body("category").optional().isString(),
  body("location").trim().notEmpty(),
  body("department").trim().notEmpty(),
  body("priority").optional().isIn(["low", "medium", "high", "critical"]),
  body("responsibilityCategory").optional().isIn(Object.values(RESPONSIBILITY_CATEGORY))
];

export const createComplaint = async (req, res) => {
  const imageUrl = req.file?.path || "";
  const complaint = await Complaint.create({
    ...req.body,
    imageUrl,
    submittedBy: req.user._id
  });

  await ActivityLog.create({
    action: "complaint_created",
    actor: req.user._id,
    complaint: complaint._id,
    metadata: { status: complaint.status }
  });

  const io = getIO();
  if (io) {
    io.to(`user:${req.user._id}`).emit("complaint:update", complaint);
    io.to("role:admin").emit("complaint:new", complaint);
  }

  await enqueueNotification({
    to: req.user.email,
    subject: `Complaint Submitted: ${complaint.title}`,
    html: `<p>Your complaint has been submitted with status <strong>${complaint.status}</strong>.</p>`
  });

  return res.status(201).json({ complaint });
};

export const getMyComplaints = async (req, res) => {
  const complaints = await Complaint.find({ submittedBy: req.user._id })
    .populate("assignedTo", "name email")
    .sort({ createdAt: -1 });

  return res.json({ complaints });
};

export const getAllComplaints = async (req, res) => {
  const query = {};

  if (req.query.status) query.status = req.query.status;
  if (req.query.department) query.department = req.query.department;

  if ([ROLES.STAFF, ROLES.FACULTY].includes(req.user.role)) {
    query.assignedTo = req.user._id;
  }

  const complaints = await Complaint.find(query)
    .populate("submittedBy", "name email collegeId")
    .populate("assignedTo", "name email role")
    .sort({ createdAt: -1 });

  return res.json({ complaints });
};

export const assignComplaintValidators = [
  param("id").isMongoId(),
  body("staffId").optional().isMongoId(),
  body("assigneeId").optional().isMongoId(),
  body().custom((value) => {
    if (!value.staffId && !value.assigneeId) {
      throw new Error("staffId or assigneeId is required");
    }

    return true;
  })
];

export const assignComplaint = async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  const assigneeId = req.body.assigneeId || req.body.staffId;
  const assignee = await User.findById(assigneeId);
  if (!assignee || ![ROLES.STAFF, ROLES.FACULTY].includes(assignee.role)) {
    return res.status(400).json({ message: "Invalid assignee user" });
  }

  complaint.assignedTo = assignee._id;
  complaint.status = COMPLAINT_STATUS.IN_PROGRESS;
  await complaint.save();

  await ActivityLog.create({
    action: "complaint_assigned",
    actor: req.user._id,
    complaint: complaint._id,
    metadata: { assignedTo: assignee._id }
  });

  const io = getIO();
  if (io) {
    io.to(`user:${assignee._id}`).emit("complaint:update", complaint);
    io.to(`user:${complaint.submittedBy}`).emit("complaint:update", complaint);
  }

  await enqueueNotification({
    to: assignee.email,
    subject: `New Complaint Assigned: ${complaint.title}`,
    html: `<p>A complaint has been assigned to you. Please take action.</p>`
  });

  return res.json({ complaint });
};

export const updateComplaintStatusValidators = [
  param("id").isMongoId(),
  body("status").isIn(Object.values(COMPLAINT_STATUS)),
  body("resolutionNote").optional().isString()
];

export const updateComplaintStatus = async (req, res) => {
  const complaint = await Complaint.findById(req.params.id).populate("submittedBy", "email");
  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  const isAssignedStaffOrFaculty = complaint.assignedTo?.toString() === req.user._id.toString();
  const isAdminLike = ELEVATED_COMPLAINT_ROLES.includes(req.user.role);
  const isRequester = complaint.submittedBy._id.toString() === req.user._id.toString();

  if (!isAssignedStaffOrFaculty && !isAdminLike && !isRequester) {
    return res.status(403).json({ message: "Not allowed to update this complaint" });
  }

  const requestedStatus = req.body.status;

  if (isRequester && !isAdminLike) {
    if (
      requestedStatus !== COMPLAINT_STATUS.RESOLVED ||
      complaint.status !== COMPLAINT_STATUS.PENDING_CONFIRMATION
    ) {
      return res.status(403).json({ message: "Requester can only confirm closure after pending confirmation" });
    }
  }

  if (
    requestedStatus === COMPLAINT_STATUS.RESOLVED &&
    isAssignedStaffOrFaculty &&
    !isAdminLike
  ) {
    complaint.status = COMPLAINT_STATUS.PENDING_CONFIRMATION;
  } else if (requestedStatus === COMPLAINT_STATUS.RESOLVED && !isRequester && !isAdminLike) {
    return res.status(403).json({ message: "Only requester or admin can close the complaint" });
  } else if (requestedStatus === COMPLAINT_STATUS.PENDING_CONFIRMATION && !isAssignedStaffOrFaculty && !isAdminLike) {
    return res.status(403).json({ message: "Only assignee or admin can request closure" });
  } else {
    complaint.status = requestedStatus;
  }
  complaint.resolutionNote = req.body.resolutionNote || complaint.resolutionNote;

  if (complaint.status === COMPLAINT_STATUS.RESOLVED) {
    complaint.resolvedAt = new Date();
  } else {
    complaint.resolvedAt = undefined;
  }

  await complaint.save();

  await ActivityLog.create({
    action: "complaint_status_updated",
    actor: req.user._id,
    complaint: complaint._id,
    metadata: { status: complaint.status }
  });

  const io = getIO();
  if (io) {
    io.to(`user:${complaint.submittedBy._id}`).emit("complaint:update", complaint);
    if (complaint.assignedTo) io.to(`user:${complaint.assignedTo}`).emit("complaint:update", complaint);
    io.to("role:admin").emit("complaint:update", complaint);
  }

  await enqueueNotification({
    to: complaint.submittedBy.email,
    subject: `Complaint Status Updated: ${complaint.title}`,
    html: complaint.status === COMPLAINT_STATUS.PENDING_CONFIRMATION
      ? `<p>Your complaint resolution has been requested by the assigned team. Please review and confirm closure.</p>`
      : `<p>Your complaint is now marked as <strong>${complaint.status}</strong>.</p>`
  });

  return res.json({ complaint });
};

export const getComplaintActivityValidators = [param("id").isMongoId()];

export const getComplaintActivity = async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  const isOwner = complaint.submittedBy.toString() === req.user._id.toString();
  const isAssignee = complaint.assignedTo?.toString() === req.user._id.toString();
  const isAdmin = ELEVATED_COMPLAINT_ROLES.includes(req.user.role);

  if (!isOwner && !isAssignee && !isAdmin) {
    return res.status(403).json({ message: "Not allowed to view activity for this complaint" });
  }

  const activity = await ActivityLog.find({ complaint: complaint._id })
    .populate("actor", "name email role")
    .sort({ createdAt: -1 });

  return res.json({ activity });
};

export const updateComplaintCategoryValidators = [
  param("id").isMongoId(),
  body("responsibilityCategory").optional().isIn(Object.values(RESPONSIBILITY_CATEGORY)),
  body("category").optional().isString()
];

export const updateComplaintCategory = async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  if (typeof req.body.responsibilityCategory === "string") {
    complaint.responsibilityCategory = req.body.responsibilityCategory;
  }

  if (typeof req.body.category === "string") {
    complaint.category = req.body.category;
  }

  await complaint.save();

  await ActivityLog.create({
    action: "complaint_category_updated",
    actor: req.user._id,
    complaint: complaint._id,
    metadata: {
      category: complaint.category,
      responsibilityCategory: complaint.responsibilityCategory
    }
  });

  return res.json({ complaint });
};

export const downloadComplaintReport = async (_req, res) => {
  const complaints = await Complaint.find({})
    .populate("submittedBy", "name email collegeId")
    .populate("assignedTo", "name email role")
    .sort({ createdAt: -1 });

  const headers = [
    "id",
    "title",
    "category",
    "responsibilityCategory",
    "department",
    "status",
    "priority",
    "submittedBy",
    "assignee",
    "createdAt",
    "resolvedAt"
  ];

  const escape = (value) => {
    const content = `${value ?? ""}`.replaceAll('"', '""');
    return `"${content}"`;
  };

  const rows = complaints.map((item) =>
    [
      item._id,
      item.title,
      item.category,
      item.responsibilityCategory,
      item.department,
      item.status,
      item.priority,
      item.submittedBy?.name || "",
      item.assignedTo?.name || "",
      item.createdAt?.toISOString?.() || "",
      item.resolvedAt?.toISOString?.() || ""
    ]
      .map(escape)
      .join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", `attachment; filename=complaints-report-${Date.now()}.csv`);

  return res.status(200).send(csv);
};

export const getComplaintAnalytics = async (_req, res) => {
  const [summary] = await Complaint.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        open: { $sum: { $cond: [{ $eq: ["$status", "open"] }, 1, 0] } },
        inProgress: { $sum: { $cond: [{ $eq: ["$status", "in_progress"] }, 1, 0] } },
        pendingConfirmation: { $sum: { $cond: [{ $eq: ["$status", "pending_confirmation"] }, 1, 0] } },
        resolved: { $sum: { $cond: [{ $eq: ["$status", "resolved"] }, 1, 0] } },
        rejected: { $sum: { $cond: [{ $eq: ["$status", "rejected"] }, 1, 0] } }
      }
    }
  ]);

  const byDepartment = await Complaint.aggregate([
    {
      $group: {
        _id: "$department",
        value: { $sum: 1 }
      }
    },
    { $sort: { value: -1 } }
  ]);

  return res.json({
    summary: summary || { total: 0, open: 0, inProgress: 0, pendingConfirmation: 0, resolved: 0, rejected: 0 },
    byDepartment
  });
};
