import mongoose from "mongoose";
import { COMPLAINT_PRIORITY, COMPLAINT_STATUS, RESPONSIBILITY_CATEGORY } from "../utils/constants.js";

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: false,
      trim: true
    },
    responsibilityCategory: {
      type: String,
      enum: Object.values(RESPONSIBILITY_CATEGORY),
      default: RESPONSIBILITY_CATEGORY.OTHER
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    priority: {
      type: String,
      enum: Object.values(COMPLAINT_PRIORITY),
      default: COMPLAINT_PRIORITY.MEDIUM
    },
    status: {
      type: String,
      enum: Object.values(COMPLAINT_STATUS),
      default: COMPLAINT_STATUS.OPEN
    },
    imageUrl: {
      type: String,
      default: ""
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    department: {
      type: String,
      trim: true,
      required: true
    },
    resolutionNote: {
      type: String,
      default: ""
    },
    resolvedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

export const Complaint = mongoose.model("Complaint", complaintSchema);
