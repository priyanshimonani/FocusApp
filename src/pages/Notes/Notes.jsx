import React, { useState, useEffect } from "react";
//useeffect-localstorage

import SearchBar from "./SearchBar";
import NotesGrid from "./NotesGrid";
import FloatingButton from "./FloatingButton";
import NoteModal from "./NoteModal";

import "./Notes.css";

function Notes() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);//only runs when notes is changed

  const [searchTerm, setSearchTerm] = useState("");//whatever user types searchterm becomes that
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const handleSaveNote = (note) => {
    if (note.id) {
      // Edit existing note
      const updated = notes.map((n) => (n.id === note.id ? note : n));
      setNotes(updated);
    } else {
      // Add new note
      const newNote = { ...note, id: Date.now() };//reatian all old properties
      setNotes([newNote, ...notes]);
    }
    setIsModalOpen(false);
    setEditingNote(null);
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    setIsModalOpen(false);
    setEditingNote(null);
  };

  const handleCardClick = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const filteredNotes = notes.filter((note) => {
    const term = searchTerm.toLowerCase();
    return (
      note.title.toLowerCase().includes(term) ||
      note.sub.toLowerCase().includes(term)
    );
  });

  return (
    <div className="notes">
      
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <NotesGrid notes={filteredNotes} onCardClick={handleCardClick} />
      <FloatingButton onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <NoteModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingNote(null);
          }}
          onSave={handleSaveNote}
          onDelete={handleDeleteNote} 
          existingNote={editingNote}
        />
      )}
    </div>
  );
}

export default Notes;