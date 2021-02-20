import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes"; // Temp file with list of objects that mock notes

function App() {
  return (
    <div>
      <Header />

      {/* Dynamically add notes */}
      {notes.map((note) => (
        <Note key={note.key} title={note.title} content={note.content} />
      ))}

      <Footer />
    </div>
  );
}

export default App;
