// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";

import "./config/passport"; // Google Strategy config
import authRoutes from "./routes/auth.routes";
import noteRoutes from "./routes/note.routes";

dotenv.config();

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    callback(null, true); // allow all origins
  },
  credentials: true
}));
app.use(express.json());

app.use(
  session({
    secret: process.env.JWT_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);


export default app;
