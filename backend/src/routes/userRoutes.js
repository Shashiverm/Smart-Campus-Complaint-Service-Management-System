import { Router } from "express";
import { getUsers } from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";
import { ROLES } from "../utils/constants.js";

const router = Router();

router.get("/", protect, authorize(ROLES.ADMIN), getUsers);

export default router;
