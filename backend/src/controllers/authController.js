import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { User } from "../models/User.js";
import { ROLES } from "../utils/constants.js";

const signToken = (user) =>
  jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d"
  });

export const registerValidators = [
  body("name").trim().notEmpty(),
  body("email").optional().isEmail(),
  body("personalEmail").optional({ checkFalsy: true }).isEmail(),
  body("password").isLength({ min: 8 }),
  body("role").isIn(Object.values(ROLES)),
  body("department").optional().isString(),
  body("phone").optional().isString(),
  body("branch").optional().isString(),
  body("className").optional().isString(),
  body("rollNumber").optional().isString(),
  body("registrationNumber").optional().isString(),
  body("batch").optional().isString(),
  body("facultyId").optional().isString(),
  body("roleInDepartment").optional().isString(),
  body("staffId").optional().isString(),
  body().custom((value) => {
    const requiredByRole = {
      [ROLES.STUDENT]: [
        "name",
        "email",
        "phone",
        "department",
        "branch",
        "className",
        "rollNumber",
        "registrationNumber",
        "batch"
      ],
      [ROLES.FACULTY]: ["name", "email", "personalEmail", "phone", "department", "facultyId"],
      [ROLES.STAFF]: ["name", "email", "department", "phone", "roleInDepartment", "staffId"],
      [ROLES.HOD]: ["name", "email", "department", "phone", "facultyId"],
      [ROLES.DIRECTOR]: ["name", "email", "department", "phone", "facultyId"],
      [ROLES.ADMIN]: ["name", "email"]
    };

    const requiredFields = requiredByRole[value.role] || ["name", "email"];
    const missing = requiredFields.filter((field) => !value[field]);

    if (missing.length > 0) {
      throw new Error(`Missing required fields for ${value.role}: ${missing.join(", ")}`);
    }

    return true;
  })
];

export const registerUser = async (req, res) => {
  const {
    collegeId,
    name,
    email,
    password,
    role,
    department,
    phone,
    branch,
    className,
    rollNumber,
    registrationNumber,
    batch,
    personalEmail,
    facultyId,
    roleInDepartment,
    staffId
  } = req.body;

  const identityCollegeId = collegeId || registrationNumber || facultyId || staffId;

  const exists = await User.findOne({
    $or: [
      { email },
      ...(identityCollegeId ? [{ collegeId: identityCollegeId }] : []),
      ...(registrationNumber ? [{ registrationNumber }] : []),
      ...(facultyId ? [{ facultyId }] : []),
      ...(staffId ? [{ staffId }] : [])
    ]
  });
  if (exists) {
    return res.status(409).json({ message: "User already exists" });
  }

  const user = await User.create({
    collegeId: identityCollegeId,
    name,
    email,
    password,
    role,
    department,
    phone,
    branch,
    className,
    rollNumber,
    registrationNumber,
    batch,
    personalEmail,
    facultyId,
    roleInDepartment,
    staffId
  });

  return res.status(201).json({
    message: "User created successfully",
    user: {
      id: user._id,
      collegeId: user.collegeId,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      phone: user.phone,
      branch: user.branch,
      className: user.className,
      rollNumber: user.rollNumber,
      registrationNumber: user.registrationNumber,
      batch: user.batch,
      personalEmail: user.personalEmail,
      facultyId: user.facultyId,
      roleInDepartment: user.roleInDepartment,
      staffId: user.staffId
    }
  });
};

export const loginValidators = [
  body("identifier").optional().isString(),
  body("email").optional().isEmail(),
  body("password").notEmpty(),
  body("role").optional().isIn(Object.values(ROLES)),
  body().custom((value) => {
    if (!value.identifier && !value.email) {
      throw new Error("identifier or email is required");
    }

    return true;
  })
];

export const loginUser = async (req, res) => {
  const { identifier, email, password, role } = req.body;

  const loginId = (identifier || email || "").trim();
  const normalizedEmail = loginId.toLowerCase();
  const normalizedId = loginId.toUpperCase();

  const user = await User.findOne({
    $or: [
      { email: normalizedEmail },
      { collegeId: normalizedId },
      { registrationNumber: normalizedId },
      { facultyId: normalizedId },
      { staffId: normalizedId }
    ]
  }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (!user.isActive) {
    return res.status(403).json({ message: "User is inactive" });
  }

  if (role && user.role !== role) {
    return res.status(403).json({ message: "Please use the correct role login" });
  }

  const token = signToken(user);

  return res.json({
    token,
    user: {
      id: user._id,
      collegeId: user.collegeId,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department
    }
  });
};

export const me = async (req, res) => {
  return res.json({ user: req.user });
};
