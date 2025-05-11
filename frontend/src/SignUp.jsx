import React, { useState } from "react";
import "./style/Login.css";
import logo from "./assets/logo.png";

function SignUp({ onClose, onShowLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const passwordsMatch = password && confirm && password === confirm;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordsMatch) return;
    const res = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const msg = await res.text();
    alert(msg);
    if (msg === "Signup successful") {
      onShowLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src={logo} alt="Logo" />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button
          type="submit"
          disabled={!passwordsMatch}
          style={{
            opacity: passwordsMatch ? 1 : 0.6,
            cursor: passwordsMatch ? "pointer" : "not-allowed",
          }}
        >
          Create Account
        </button>
        <div className="login-footer">
          <span>Already have an account?</span>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onShowLogin();
            }}
          >
            Sign in
          </a>
        </div>
        <button type="button" className="login-close" onClick={onShowLogin}>
          Close
        </button>
      </form>
    </div>
  );
}

export default SignUp;
