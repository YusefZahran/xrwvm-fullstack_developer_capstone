import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/djangoapp/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });
      const data = await res.json();
      if (data.status === "Authenticated") {
        localStorage.setItem("username", data.userName);
        setMessageType("success");
        setMessage("Logged in successfully! Redirecting…");
        setTimeout(() => navigate("/"), 800);
      } else {
        setMessageType("error");
        setMessage("Invalid username or password.");
      }
    } catch {
      setMessageType("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">BC</div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        <form className="auth-form" onSubmit={login}>
          <div className="form-field">
            <label className="form-label" htmlFor="username">Username</label>
            <input
              id="username"
              className="form-input"
              type="text"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              className="form-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {message && (
            <div className={`auth-message ${messageType}`}>{message}</div>
          )}

          <button type="submit" className="auth-submit">Sign In</button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
