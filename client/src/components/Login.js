import React from "react";

function Login({ onLogin }) {
  function handleSubmit(event) {
    const loginForm = Object.fromEntries(new FormData(event.target).entries());
    onLogin(true)
  }
  return (
    <form className="login" onSubmit={handleSubmit}>
      <div className="username">
        <label>UserName:</label>
        <input type="text" name="username"></input>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password"></input>
      </div>
      <div className="submit">
        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default Login;
