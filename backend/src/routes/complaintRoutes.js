import { Router } from "express";
import {
  assignComplaint,
  assignComplaintValidators,
  createComplaint,
  createComplaintValidators,
  getAllComplaints,
  getComplaintAnalytics,
  getMyComplaints,
  updateComplaintStatus,
  updateComplaintStatusValidators
} from "../controllers/complaintController.js";
import { upload } from "../config/cloudinary.js";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";
import { validateRequest } from "../middlewares/validate.js";
import { ROLES } from "../utils/constants.js";

const router = Router();

router.post("/", protect, authorize(ROLES.STUDENT), upload.single("image"), createComplaintValidators, validateRequest, createComplaint);
router.get("/my", protect, authorize(ROLES.STUDENT), getMyComplaints);
router.get("/", protect, authorize(ROLES.ADMIN, ROLES.STAFF), getAllComplaints);
router.get("/analytics", protect, authorize(ROLES.ADMIN), getComplaintAnalytics);
router.patch("/:id/assign", protect, authorize(ROLES.ADMIN), assignComplaintValidators, validateRequest, assignComplaint);
router.patch(
  "/:id/status",
  protect,
  authorize(ROLES.ADMIN, ROLES.STAFF),
  updateComplaintStatusValidators,
  validateRequest,
  updateComplaintStatus
);

export default router;
