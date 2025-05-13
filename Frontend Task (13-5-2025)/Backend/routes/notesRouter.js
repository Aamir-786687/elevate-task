import express from "express";
import { createNote, getNotes, deleteNote } from "../controller/notesController.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.post("/notes", authenticate, createNote);
router.get("/notes", authenticate, getNotes);
router.delete("/notes/:id", authenticate, deleteNote);

export default router;
