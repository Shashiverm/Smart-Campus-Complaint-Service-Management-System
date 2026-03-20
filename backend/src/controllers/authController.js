import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { User } from "../models/User.js";
import { ROLES } from "../utils/constants.js";

const signToken = (user) =>
  jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d"
  });

export const registerValidators = [
  body("collegeId").trim().notEmpty(),
  body("name").trim().notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  body("role").isIn(Object.values(ROLES)),
  body("department").optional().isString()
];

export const registerUser = async (req, res) => {
  const { collegeId, name, email, password, role, department } = req.body;

  const exists = await User.findOne({ $or: [{ email }, { collegeId }] });
  if (exists) {
    return res.status(409).json({ message: "User already exists" });
  }

  const user = await User.create({ collegeId, name, email, password, role, department });

  return res.status(201).json({
    message: "User created successfully",
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

export const loginValidators = [body("email").isEmail(), body("password").notEmpty()];

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (!user.isActive) {
    return res.status(403).json({ message: "User is inactive" });
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
