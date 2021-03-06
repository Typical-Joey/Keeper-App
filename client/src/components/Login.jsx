import React, { useState } from "react";
import Footer from "./Footer";
import ReactDOM from "react-dom";
import App from "./App";
import Register from "./Register";
import LoginErrors from "./LoginErrors";

function Login() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errorCode, setErrorCode] = useState(null);

  function userInfo(event) {
    const { name, value } = event.target;
    setUser((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  }

  function registerRedirect() {
    ReactDOM.render(<Register />, document.getElementById("root"));
  }

  async function login(e) {
    e.preventDefault();
    const url = "/user/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (data.status === 200) {
      ReactDOM.render(<App />, document.getElementById("root"));
    } else {
      setErrorCode(data.status);
      ReactDOM.render(<Login />, document.getElementById("root"));
    }
  }

  return (
    <div>
      {/* Right side of the screen */}
      <div className="login right-login">
        <h1>Login</h1>
        <LoginErrors statusCode={errorCode} />
        <form onSubmit={login}>
          <div className="form-group">
            <label htmlFor="emailInput">Email:</label>
            <input
              onChange={userInfo}
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
              onChange={userInfo}
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Password"
              name="password"
            />
          </div>

          <button type="submit" className="btn btn-lg btn-outline-primary">
            Login
          </button>

          <button
            onClick={registerRedirect}
            className="btn btn-lg btn-outline-primary right-button"
          >
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

export default Login;
