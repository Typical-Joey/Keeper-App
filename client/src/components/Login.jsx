import React, { useState } from "react";
import Footer from "./Footer";
import axios from "axios";

function Login() {
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

  function login() {
    axios
      .post("/user/login", user)
      .then((res) => console.log("Sent User"))
      .catch((err) => console.log(err));
  }
  return (
    <div>
      {/* Right side of the screen */}
      <div className="login right-login">
        <h1>Login</h1>
        <form onSubmit={login}>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              onChange={createUser}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Email"
              name="email"
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              onChange={createUser}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
            />
          </div>

          <button type="submit" className="btn btn-lg btn-outline-primary">
            Login
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

export default Login;
