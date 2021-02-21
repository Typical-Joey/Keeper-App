import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  // Make note object
  function makeNote(event) {
    const { name, value } = event.target;

    setNote((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  }

  // Pass note object to App.jsx
  function submitNote(event) {
    props.onAdd(note);
    setNote({ title: "", content: "" });

    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          onChange={makeNote}
          name="title"
          placeholder="Title"
          value={note.title}
        />
        <textarea
          onChange={makeNote}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={note.content}
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
