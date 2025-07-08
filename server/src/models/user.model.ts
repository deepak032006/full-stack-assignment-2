export interface User {
  id: string;
  email: string;
  passwordHash?: string;
  otp?: string;
  otpExpiry?: number;
  provider: "email" | "google";
  name?: string;
}

export const users: User[] = []; // Replace later with DB
