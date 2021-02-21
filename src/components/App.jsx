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
