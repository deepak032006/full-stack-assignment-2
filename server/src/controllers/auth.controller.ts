import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { generateToken } from "../utils/jwt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const signupWithEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        provider: "email",
        name: null,
      },
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

  await prisma.oTP.create({
    data: {
      email,
      otp,
      expiresAt: expiry,
    },
  });

  try {
    await transporter.sendMail({
      from: `"HD Notes App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    return res.status(200).json({ message: "OTP sent to your email!" });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ message: "Failed to send OTP. Try again later." });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP required" });
  }

  const existingOtp = await prisma.oTP.findFirst({
    where: {
      email,
      otp,
      expiresAt: {
        gte: new Date(),
      },
    },
    orderBy: {
      expiresAt: "desc",
    },
  });

  if (!existingOtp) {
    return res.status(401).json({ message: "Invalid or expired OTP" });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = generateToken(user);

  return res.status(200).json({ token, user });
};
