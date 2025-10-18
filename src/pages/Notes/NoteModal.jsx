
import React, { useState, useEffect } from "react";//usesate to store useeffect to edit

function NoteModal({ onClose, onSave, existingNote, onDelete }) {
  const [title, setTitle] = useState("");
  const [sub, setSub] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#FFFBB6");

  const allowedColors = ["#FFFBB6", "#B0EDFF", "#FFADAD", "#C6FFC0"];

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
      setColor(existingNote.color);
    }
  }, [existingNote]);//runs everytime something is changed

  const handleSave = () => {
    if (!title.trim()) {
      alert("Title is required!");
      return;
    }

    const note = {
      id: existingNote?.id || null,
      title,
      sub,
      content,
      color,
    };

    onSave(note);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (confirmDelete && existingNote) {
      onDelete(existingNote.id);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal(color)}>
        {/* Close Icon */}
        <div style={styles.closeIcon} onClick={onClose}>×</div>

        <h2>{existingNote ? "Edit Note" : "New Note"}</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}//keeps on chanhing
          style={styles.input}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
        />

        <h4>Choose a color:</h4>
        <div style={styles.colorList}>
          {allowedColors.map((c) => (
            <div
              key={c}
              onClick={() => setColor(c)}
              style={{
                backgroundColor: c,
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                marginRight: "10px",
                cursor: "pointer",
                border: color === c ? "2px solid black" : "1px solid gray",
              }}
            />
          ))}
        </div>

        <button onClick={handleSave} style={styles.saveBtn}>Save</button>

        {existingNote && (
          <button onClick={handleDelete} style={styles.deleteBtn}>Delete</button>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 10
  },
  modal: (color) => ({
    background: color,
    padding: "20px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "400px",
    position: "relative",
  }),
  closeIcon: {
    position: "absolute",
    top: "10px",
    right: "15px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    cursor: "pointer",
  },
  input: {
    width: "95%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "95%",
    height: "100px",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  colorList: {
    display: "flex",
    marginBottom: "15px"
  },
  saveBtn: {
    padding: "10px 20px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "6px",
    marginRight: "10px"
  },
  deleteBtn: {
    padding: "10px 20px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "6px"
  }
};

export default NoteModal;
