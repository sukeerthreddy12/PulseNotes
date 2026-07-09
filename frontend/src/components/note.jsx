import React from "react";
import "../styles/note.css";
function Note({ note, onDelete }) {


    const formatDate = new Date(note.date).toLocaleDateString("en-US")
  return (
    <div className="note-container">
      <p>{note.title}</p>
      <p>{note.content}</p>
      <p className="note-date">{formatDate}</p>
      <button className="delete-button" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
}

export default Note;
