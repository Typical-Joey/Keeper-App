import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [user, setUser] = useState(null);
  const [notes, updateNotes] = useState([]);

  // Sending notes to server
  async function sendNote(note) {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note, id: user._id }),
    };
    await fetch("/user/notes", options);
    addNote(note);
  }

  // Add note to notes array
  async function addNote(note) {
    updateNotes((prevValues) => {
      return [...prevValues, note];
    });
  }

  async function deleteNoteDB(noteID) {
    const note = notes[noteID];
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note, id: user._id }),
    };
    await fetch("/user/notes/delete", options);
  }

  // Delete note from notes array
  async function deleteNote(id) {
    await deleteNoteDB(id);
    updateNotes(() => {
      return notes.filter((note, index) => {
        return index !== id;
      });
    });
  }

  // Get user info on startup
  useEffect(() => {
    async function getUser() {
      const response = await fetch("/user"); // Get Active User
      const data = await response.json();
      setUser(data);
    }

    getUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user !== null) {
    if (user.notes.length !== 0 && notes.length === 0) {
      updateNotes(user.notes);
    }
    return (
      <div>
        <Header />

        {/* Create Note */}
        <CreateArea onAdd={sendNote} />

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
  } else {
    return null;
  }
}

export default App;
