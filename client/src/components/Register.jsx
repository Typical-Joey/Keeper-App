import React, { useState } from "react";
import Footer from "./Footer";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });


  function createUser(event) {
    const { name, value } = event.target;
    setUser((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  }


  function register() {
    axios
      .post("/user/register", user)
      .then((res) => console.log("Sent User"))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      {/* Right side of the screen */}
      <div className="login right-login">
        <h1>Register</h1>
        <form onSubmit={register}>
          <div className="form-group">
            <label htmlFor="usernameInput">Username:</label>
            <input
              onChange={createUser}
              type="text"
              className="form-control"
              id="usernameInput"
              placeholder="Username"
              name="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="emailInput">Email:</label>
            <input
              onChange={createUser}
              type="email"
              className="form-control"
              id="emailInput"
              placeholder="Email"
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput">Password:</label>
            <input
              onChange={createUser}
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Password"
              name="password"
            />
          </div>

          <button type="submit" className="btn btn-lg btn-outline-primary">
            Register
          </button>
        </form>
      </div>

      {/* Left Side of the screen */}
      <div className="login left-login">
        <h1>K</h1>
        <h1>E</h1>
        <h1>E</h1>
        <h1>P</h1>
        <h1>E</h1>
        <h1>R</h1>
      </div>

      <Footer />
    </div>
  );
}

export default Register;
