import { Router } from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import complaintRoutes from "./complaintRoutes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ ok: true, service: "smart-campus-api" });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/complaints", complaintRoutes);

export default router;
