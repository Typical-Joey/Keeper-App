import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  // All notes
  const [notes, updateNotes] = useState([]);

  // Add note to notes array
  function addNote(note) {
    updateNotes((prevValues) => {
      return [...prevValues, note];
    });
  }

  // Delete note from notes array
  function deleteNote(id) {
    updateNotes(() => {
      return notes.filter((note, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />

      {/* Create Note */}
      <CreateArea onAdd={addNote} />

      {/* Dynamically add notes */}
      {notes.map((note, index) => {
        return (
          <Note
            key={index}
            id={index}
            onDelete={deleteNote}
            title={note.title}
            content={note.content}
          />
        );
      })}

      <Footer />
    </div>
  );
}

export default App;
