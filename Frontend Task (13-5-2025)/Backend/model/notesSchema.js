import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

const notes = mongoose.model("note", notesSchema)

export default notes