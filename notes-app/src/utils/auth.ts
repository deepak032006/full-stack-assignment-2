// src/utils/auth.ts
import jwtDecode from "jwt-decode";

export interface DecodedToken {
  id: string;
  email: string;
  exp: number;
}

export const getToken = () => localStorage.getItem("token");

export const decodeToken = (): DecodedToken | null => {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const isTokenExpired = (): boolean => {
  const decoded = decodeToken();
  if (!decoded) return true;
  const now = Date.now() / 1000;
  return decoded.exp < now;
};
