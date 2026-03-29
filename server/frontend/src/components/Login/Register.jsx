import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // reuses the same auth styles

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/djangoapp/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password, firstName, lastName }),
      });
      const data = await res.json();
      if (data.status === "Authenticated") {
        localStorage.setItem("username", data.userName);
        setMessageType("success");
        setMessage("Account created! Redirecting…");
        setTimeout(() => navigate("/"), 800);
      } else if (data.status === "Already Registered") {
        setMessageType("error");
        setMessage("That username is already taken. Try another.");
      } else {
        setMessageType("error");
        setMessage("Registration failed. Please try again.");
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
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join the Best Cars network</p>
        </div>

        <form className="auth-form" onSubmit={register}>
          <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div className="form-field">
              <label className="form-label" htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                className="form-input"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                className="form-input"
                type="text"
                placeholder="Smith"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="username">Username</label>
            <input
              id="username"
              className="form-input"
              type="text"
              placeholder="Choose a username"
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {message && (
            <div className={`auth-message ${messageType}`}>{message}</div>
          )}

          <button type="submit" className="auth-submit">Create Account</button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
