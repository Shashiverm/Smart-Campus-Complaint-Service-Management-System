import { Router } from "express";
import { loginUser, loginValidators, me, registerUser, registerValidators } from "../controllers/authController.js";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";
import { validateRequest } from "../middlewares/validate.js";
import { ROLES } from "../utils/constants.js";

const router = Router();

router.post("/login", loginValidators, validateRequest, loginUser);
router.post(
	"/register",
	protect,
	authorize(ROLES.ADMIN, ROLES.HOD, ROLES.DIRECTOR),
	registerValidators,
	validateRequest,
	registerUser
);
router.get("/me", protect, me);

export default router;
