import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true
    },
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    complaint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint"
    },
    metadata: {
      type: Object,
      default: {}
    }
  },
  { timestamps: true }
);

export const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);
