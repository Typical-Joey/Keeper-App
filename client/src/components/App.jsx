import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  // All notes
  const [notes, updateNotes] = useState([]);

  // Recieving notes from server
  function renderNotes() {
    axios
      .get("/user/notes")
      .catch((err) => console.log(err))
      .then((res) => {
        const data = res.data;
        return addNote(data);
      });
  }

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

  // Test, calls on first page render, and adds 1 note from server
  useEffect(() => {
    renderNotes();
  }, []);

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
