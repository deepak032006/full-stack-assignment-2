import { Router } from "express";
import { getNotes, createNote, deleteNote } from "../controllers/note.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, getNotes);
router.post("/", authenticate, createNote);
router.delete("/:id", authenticate, deleteNote);

export default router;
