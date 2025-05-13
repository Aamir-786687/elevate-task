import React from "react";

const NoteItem = ({ note, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = () => {
    onDelete(note._id);
  };

  return (
    <div className="note-item">
      <div className="note-header">
        <h3>{note.title}</h3>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <p className="note-content">{note.content}</p>
      <p className="note-date">Created: {formatDate(note.createdAt)}</p>
    </div>
  );
};

export default NoteItem;