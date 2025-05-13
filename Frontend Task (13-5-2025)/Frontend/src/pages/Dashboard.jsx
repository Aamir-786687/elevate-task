import React, { useState, useEffect } from "react";
import NoteForm from "../components/NoteForm";
import NoteItem from "../components/NoteItem";
import { notesService } from "../api/api";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await notesService.getNotes();
      setNotes(data);
    } catch (err) {
      setError("Failed to fetch notes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (title, content) => {
    try {
      setError(null);
      await notesService.createNote(title, content);
      // Refresh notes list
      fetchNotes();
    } catch (err) {
      setError("Failed to create note");
      console.error(err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      setError(null);
      await notesService.deleteNote(id);
      // Update the notes state by filtering out the deleted note
      setNotes(notes.filter(note => note._id !== id));
    } catch (err) {
      setError("Failed to delete note");
      console.error(err);
    }
  };

  return (
    <div className="dashboard">
      <h1>My Notes</h1>
      
      <NoteForm onCreateNote={handleCreateNote} />
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="notes-container">
        {loading ? (
          <div className="loading">Loading notes...</div>
        ) : notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem 
              key={note._id} 
              note={note} 
              onDelete={handleDeleteNote} 
            />
          ))
        ) : (
          <p className="no-notes">No notes yet. Create one above!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;