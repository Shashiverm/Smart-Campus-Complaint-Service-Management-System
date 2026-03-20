import { body, param } from "express-validator";
import { Complaint } from "../models/Complaint.js";
import { ActivityLog } from "../models/ActivityLog.js";
import { User } from "../models/User.js";
import { enqueueNotification } from "../services/queueService.js";
import { getIO } from "../services/socketService.js";
import { COMPLAINT_STATUS, ROLES } from "../utils/constants.js";

export const createComplaintValidators = [
  body("title").trim().notEmpty(),
  body("description").trim().notEmpty(),
  body("category").trim().notEmpty(),
  body("location").trim().notEmpty(),
  body("department").trim().notEmpty(),
  body("priority").optional().isIn(["low", "medium", "high", "critical"])
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

  const complaints = await Complaint.find(query)
    .populate("submittedBy", "name email collegeId")
    .populate("assignedTo", "name email")
    .sort({ createdAt: -1 });

  return res.json({ complaints });
};

export const assignComplaintValidators = [param("id").isMongoId(), body("staffId").isMongoId()];

export const assignComplaint = async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  const staff = await User.findById(req.body.staffId);
  if (!staff || staff.role !== ROLES.STAFF) {
    return res.status(400).json({ message: "Invalid staff user" });
  }

  complaint.assignedTo = staff._id;
  complaint.status = COMPLAINT_STATUS.IN_PROGRESS;
  await complaint.save();

  await ActivityLog.create({
    action: "complaint_assigned",
    actor: req.user._id,
    complaint: complaint._id,
    metadata: { assignedTo: staff._id }
  });

  const io = getIO();
  if (io) {
    io.to(`user:${staff._id}`).emit("complaint:update", complaint);
    io.to(`user:${complaint.submittedBy}`).emit("complaint:update", complaint);
  }

  await enqueueNotification({
    to: staff.email,
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

  const isAssignedStaff = complaint.assignedTo?.toString() === req.user._id.toString();
  const isAdmin = req.user.role === ROLES.ADMIN;

  if (!isAssignedStaff && !isAdmin) {
    return res.status(403).json({ message: "Not allowed to update this complaint" });
  }

  complaint.status = req.body.status;
  complaint.resolutionNote = req.body.resolutionNote || complaint.resolutionNote;

  if (req.body.status === COMPLAINT_STATUS.RESOLVED) {
    complaint.resolvedAt = new Date();
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
    html: `<p>Your complaint is now marked as <strong>${complaint.status}</strong>.</p>`
  });

  return res.json({ complaint });
};

export const getComplaintAnalytics = async (_req, res) => {
  const [summary] = await Complaint.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        open: { $sum: { $cond: [{ $eq: ["$status", "open"] }, 1, 0] } },
        inProgress: { $sum: { $cond: [{ $eq: ["$status", "in_progress"] }, 1, 0] } },
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
    summary: summary || { total: 0, open: 0, inProgress: 0, resolved: 0, rejected: 0 },
    byDepartment
  });
};
