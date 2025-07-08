// src/services/auth.ts
import api from "./api";

export const signup = (email: string) =>
  api.post("/auth/signup", { email });

export const verifyOtp = (email: string, otp: string) =>
  api.post("/auth/verify-otp", { email, otp });
