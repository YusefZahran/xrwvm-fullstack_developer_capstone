import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dealers.css";

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchDealers = async (state = "All") => {
    setLoading(true);
    try {
      const url =
        state === "All"
          ? "/djangoapp/get_dealers"
          : `/djangoapp/get_dealers/${state}`;
      const res = await fetch(url);
      const data = await res.json();
      const dealers = data.dealers || [];
      setDealersList(dealers);

      if (state === "All") {
        const uniqueStates = [...new Set(dealers.map((d) => d.state))].sort();
        setStates(uniqueStates);
      }
    } catch (err) {
      console.error("Error fetching dealers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDealers();
  }, []);

  const handleStateChange = (e) => {
    const val = e.target.value;
    setSelectedState(val);
    fetchDealers(val);
  };

  // Initials from dealer name for the icon
  const getInitials = (name = "") => {
    const words = name.trim().split(" ");
    return words.length >= 2
      ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };

  return (
    <>
      {/* Hero */}
      <div className="dealers-hero">
        <div className="dealers-hero-inner">
          <div className="dealers-hero-tag">Browse Network</div>
          <h1>Find a Dealership</h1>
          <p>
            Browse our nationwide network of certified dealerships and read real
            customer reviews.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="dealers-filter-bar">
        <span className="filter-label">Filter by state</span>
        <select
          className="filter-select"
          value={selectedState}
          onChange={handleStateChange}
        >
          <option value="All">All States</option>
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {!loading && (
          <span className="dealers-count">
            Showing <strong>{dealersList.length}</strong> dealership
            {dealersList.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Grid */}
      <div className="dealers-grid">
        {loading ? (
          <div className="loading-state" style={{ gridColumn: "1/-1" }}>
            <div className="spinner" />
            Loading dealerships…
          </div>
        ) : dealersList.length === 0 ? (
          <div className="empty-state" style={{ gridColumn: "1/-1" }}>
            <h3>No Dealerships Found</h3>
            <p>Try selecting a different state filter.</p>
          </div>
        ) : (
          dealersList.map((dealer) => (
            <Link
              key={dealer.id}
              to={`/dealer/${dealer.id}`}
              className="dealer-card"
            >
              <div className="dealer-card-accent" />
              <div className="dealer-card-body">
                <div className="dealer-card-header">
                  <div>
                    <div className="dealer-card-name">{dealer.full_name}</div>
                  </div>
                  <div className="dealer-icon">{getInitials(dealer.full_name)}</div>
                </div>
                <div className="dealer-card-meta">
                  <div className="dealer-meta-item">
                    <span className="dealer-meta-icon">📍</span>
                    {dealer.city}, {dealer.state} {dealer.zip}
                  </div>
                  <div className="dealer-meta-item">
                    <span className="dealer-meta-icon">📞</span>
                    {dealer.address}
                  </div>
                </div>
              </div>
              <div className="dealer-card-footer">
                <span className="dealer-reviews-link">View Reviews</span>
                <span className="dealer-arrow">→</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default Dealers;
