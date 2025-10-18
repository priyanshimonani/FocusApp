import React from "react";
import "./NoteCard.css";

function NoteCard({ note, onClick }) {
  return (
    <div className="note-wrapper" onClick={onClick}>


      {/*colored notes*/}
      <div
        className="note-card"
        style={{ backgroundColor: note.color }}
      >
        <h4>{note.title}</h4>
        
        <p>{note.content}</p>
      </div>
    </div>
  );
}

export default NoteCard;