import React from "react";

function Login({ onLogin }) {
  function handleSubmit(event) {
    event.preventDefault()
    const loginForm = Object.fromEntries(new FormData(event.target).entries());
    fetch('https://phase-5-api-o5ni.onrender.com/login', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm)
    }).then((r) =>{
        if (r.ok){
            r.json().then((data) => onLogin(data))
        }
        else{
            r.json().then((err) => console.log(err))
        }
    })
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
