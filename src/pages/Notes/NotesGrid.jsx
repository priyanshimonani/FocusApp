import React from "react";
import NoteCard from "./NoteCard";

function NotesGrid({ notes, onCardClick }) {
  if (notes.length === 0) {
    return <p style={{ textAlign: "center", color: "#444" }}>No notes found.</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "20px",
      }}
    >
      {notes.map((note) => (
        <NoteCard
         key={note.id} 
         note={note}
         onClick={() => onCardClick(note)}
          />
      ))}
    </div>
  );
}

export default NotesGrid;