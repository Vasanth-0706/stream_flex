import React, { useState } from "react";
import "./style/Login.css";
import logo from "./assets/logo.png";

function Login({ onClose, onShowSignUp, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const msg = await res.text();
    alert(msg);
    if (msg === "Login successful") {
      setUser({ username });
      onClose();
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src={logo} alt="Logo" />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <input
          type="text"
          placeholder="Username or Email"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <div className="login-footer">
          <span>Don't have an account?</span>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onShowSignUp();
            }}
          >
            Sign up
          </a>
        </div>
        <button type="button" className="login-close" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
}

export default Login;
