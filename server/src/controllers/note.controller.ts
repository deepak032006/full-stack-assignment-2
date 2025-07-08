import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getNotes = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const notes = await prisma.note.findMany({ where: { userId } });
  res.json(notes);
};

export const createNote = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { content } = req.body;

  const note = await prisma.note.create({
    data: { content, userId: userId! },
  });

  res.status(201).json(note);
};

export const deleteNote = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const noteId = req.params.id;

  const note = await prisma.note.findUnique({ where: { id: noteId } });
  if (!note || note.userId !== userId) {
    return res.status(404).json({ message: "Note not found" });
  }

  await prisma.note.delete({ where: { id: noteId } });
  res.json({ message: "Note deleted" });
};
