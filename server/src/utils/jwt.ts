import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const generateToken = (user: User) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};
