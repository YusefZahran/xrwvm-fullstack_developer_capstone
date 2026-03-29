import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setUserName(stored);
  }, []);

  const logout = async () => {
    const sessionId = localStorage.getItem("sessionid");
    try {
      await fetch("/djangoapp/logout", {
        headers: { "X-CSRFToken": getCookie("csrftoken") },
        method: "GET",
      });
    } catch (e) { /* best-effort */ }
    localStorage.removeItem("username");
    localStorage.removeItem("sessionid");
    setUserName(null);
    navigate("/");
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo-icon">BC</div>
          <div className="navbar-brand-text">
            <span className="navbar-brand-main">Best Cars</span>
            <span className="navbar-brand-sub">Dealership Network</span>
          </div>
        </Link>

        {/* Actions */}
        <div className="navbar-actions">
          <Link to="/dealers" className="navbar-link">Dealerships</Link>

          {userName ? (
            <>
              <span className="navbar-user">
                Welcome, <span className="navbar-username">{userName}</span>
              </span>
              <button className="navbar-btn navbar-btn-logout" onClick={logout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-btn navbar-btn-login">Log In</Link>
              <Link to="/register" className="navbar-btn navbar-btn-register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
