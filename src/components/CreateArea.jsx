import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [isExpanded, setExpanded] = useState(false);

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

  // Expand display
  function showDisplay() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note" autoComplete="off">
        <input
          onChange={makeNote}
          onClick={showDisplay}
          name="title"
          placeholder="Title"
          value={note.title}
        />
        <textarea
          style={{ display: isExpanded ? "block" : "none" }}
          onChange={makeNote}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={note.content}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
