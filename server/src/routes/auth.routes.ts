// src/routes/auth.routes.ts
import { Router } from "express";
import passport from "passport";
import { signupWithEmail, verifyOtp } from "../controllers/auth.controller";
import { generateToken } from "../utils/jwt";
import { prisma } from "../lib/prisma";

const router = Router();

// ✅ Email Signup Flow
router.post("/signup", signupWithEmail);
router.post("/verify-otp", verifyOtp);

// ✅ Google OAuth Flow
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  async (req, res) => {
    const user = req.user as any;
    const token = generateToken(user);
    res.redirect(`http://localhost:5173/welcome?token=${token}`);
  }
);

export default router;
