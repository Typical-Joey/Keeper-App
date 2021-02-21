import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

function Note(props) {
  // Sends id to App.jsx
  function removeNote() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={removeNote}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
