import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Login() {
  return (
    <div>
      {/* Right side of the screen */}
      <div className="login right-login">
        <h1>Login</h1>
        <form method="post">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              placeholder="Email"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>

          <button type="submit" class="btn btn-lg btn-outline-primary">
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
