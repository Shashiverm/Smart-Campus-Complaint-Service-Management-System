import { Router } from "express";
import {
  assignComplaint,
  assignComplaintValidators,
  createComplaint,
  createComplaintValidators,
  downloadComplaintReport,
  getComplaintActivity,
  getComplaintActivityValidators,
  getAllComplaints,
  getComplaintAnalytics,
  getMyComplaints,
  updateComplaintCategory,
  updateComplaintCategoryValidators,
  updateComplaintStatus,
  updateComplaintStatusValidators
} from "../controllers/complaintController.js";
import { upload } from "../config/cloudinary.js";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";
import { validateRequest } from "../middlewares/validate.js";
import { ROLES } from "../utils/constants.js";

const router = Router();

router.post(
  "/",
  protect,
  authorize(ROLES.STUDENT, ROLES.FACULTY, ROLES.STAFF),
  upload.single("image"),
  createComplaintValidators,
  validateRequest,
  createComplaint
);
router.get("/my", protect, authorize(ROLES.STUDENT, ROLES.FACULTY, ROLES.STAFF), getMyComplaints);
router.get("/", protect, authorize(ROLES.ADMIN, ROLES.STAFF, ROLES.FACULTY, ROLES.HOD, ROLES.DIRECTOR), getAllComplaints);
router.get("/analytics", protect, authorize(ROLES.ADMIN, ROLES.HOD, ROLES.DIRECTOR), getComplaintAnalytics);
router.get("/report/download", protect, authorize(ROLES.ADMIN, ROLES.HOD, ROLES.DIRECTOR), downloadComplaintReport);
router.get(
  "/:id/activity",
  protect,
  authorize(ROLES.ADMIN, ROLES.STUDENT, ROLES.STAFF, ROLES.FACULTY, ROLES.HOD, ROLES.DIRECTOR),
  getComplaintActivityValidators,
  validateRequest,
  getComplaintActivity
);
router.patch("/:id/assign", protect, authorize(ROLES.ADMIN), assignComplaintValidators, validateRequest, assignComplaint);
router.patch(
  "/:id/category",
  protect,
  authorize(ROLES.ADMIN, ROLES.HOD, ROLES.DIRECTOR),
  updateComplaintCategoryValidators,
  validateRequest,
  updateComplaintCategory
);
router.patch(
  "/:id/status",
  protect,
  authorize(ROLES.ADMIN, ROLES.STAFF, ROLES.FACULTY, ROLES.STUDENT, ROLES.HOD, ROLES.DIRECTOR),
  updateComplaintStatusValidators,
  validateRequest,
  updateComplaintStatus
);

export default router;
