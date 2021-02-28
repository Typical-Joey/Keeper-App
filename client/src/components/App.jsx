import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  // All notes
  const [notes, updateNotes] = useState([]);

  // Adds all initial notes in database
  function renderNotes() {
    axios
      .get("/user/notes")
      .then((res) => {
        const data = res.data;
        console.log(data);
        return data.forEach((note) => addNote(note));
      })
      .catch((err) => console.log(err));
  }

  // Sending notes to server
  function sendNote(note) {
    axios
      .post("/user/notes", note)
      .then((res) => console.log("Sent Note"))
      .catch((err) => console.log(err));
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

  // useEffect(() => {
  //   sendNote();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // Test, calls on first page render, and adds 1 note from server
  useEffect(() => {
    renderNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
