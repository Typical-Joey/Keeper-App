import React from "react";

function HandleErrors(props) {
  let error = "";

  if (props.statusCode === 409) {
    error = "User Already Exists";
  } else if (props.statusCode === 400) {
    error = "Oops, something went wrong";
  } else if (props.statusCode === 404) {
    error = "User Not Found";
  } else if (props.statusCode === 403) {
    error = "Incorrect Password";
  }

  return <h4 className="error">{error}</h4>;
}

export default HandleErrors;
