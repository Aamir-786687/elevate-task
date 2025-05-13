import Notes from "../model/notesSchema.js";

const createNote = async (req, res) => {
  try {
    const note = new Notes({ ...req.body, userId: req.userId });
    await note.save();
    res.status(201).json({ note, message: "Note created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ userId: req.userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notes.findOneAndDelete({ _id: id, userId: req.userId });
    if (!note) return res.status(404).json({ message: "Note not found or unauthorized" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { createNote, getNotes, deleteNote };
