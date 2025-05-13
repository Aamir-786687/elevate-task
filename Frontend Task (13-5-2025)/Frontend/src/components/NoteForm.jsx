import React, { useState } from "react";

const NoteForm = ({ onCreateNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    setIsLoading(true);
    await onCreateNote(title, content);
    setIsLoading(false);
    
    // Reset form
    setTitle("");
    setContent("");
  };

  return (
    <div className="note-form-container">
      <h3>Add New Note</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? "Creating..." : "Add Note"}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;