import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const userName = localStorage.getItem("username");

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-text" aria-hidden="true">BESTCARS</div>
        <div className="hero-inner container">
          <div className="hero-content">
            <div className="hero-tag">Nationwide Dealership Network</div>
            <h1 className="hero-heading">
              Find Your<br />
              Perfect<br />
              <span className="hero-heading-accent">Dealership.</span>
            </h1>
            <p className="hero-body">
              Read real reviews from verified customers across hundreds of
              dealerships. Make informed decisions before you buy.
            </p>
            <div className="hero-actions">
              <Link to="/dealers" className="btn btn-primary hero-cta">
                Browse Dealerships →
              </Link>
              {!userName && (
                <Link to="/register" className="btn btn-outline hero-cta-secondary">
                  Create Account
                </Link>
              )}
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Dealerships</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">12K+</div>
              <div className="stat-label">Reviews</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50</div>
              <div className="stat-label">States</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="features-strip">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🔍</div>
              <div className="feature-text">
                <div className="feature-title">Find Nearby Dealers</div>
                <div className="feature-body">Filter by state to find dealerships in your area.</div>
              </div>
            </div>
            <div className="feature-divider" />
            <div className="feature-item">
              <div className="feature-icon">⭐</div>
              <div className="feature-text">
                <div className="feature-title">Real Customer Reviews</div>
                <div className="feature-body">Honest reviews with AI-powered sentiment analysis.</div>
              </div>
            </div>
            <div className="feature-divider" />
            <div className="feature-item">
              <div className="feature-icon">✅</div>
              <div className="feature-text">
                <div className="feature-title">Verified Purchases</div>
                <div className="feature-body">Reviews from customers who actually bought there.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner-inner">
            <div>
              <h2 className="cta-title">Have a dealership experience to share?</h2>
              <p className="cta-body">
                {userName
                  ? "Find a dealership and write your review."
                  : "Create an account and write your first review today."}
              </p>
            </div>
            <Link
              to={userName ? "/dealers" : "/register"}
              className="btn btn-primary"
            >
              {userName ? "Find a Dealership" : "Get Started →"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
