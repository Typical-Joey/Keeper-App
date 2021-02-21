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

    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input onChange={makeNote} name="title" placeholder="Title" />
        <textarea
          onChange={makeNote}
          name="content"
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
