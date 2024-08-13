import { Router } from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
} from "../controllers/authController.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);

export default router;
