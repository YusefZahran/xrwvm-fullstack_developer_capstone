import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./PostReview.css";

const PostReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userName = localStorage.getItem("username");

  const [dealer, setDealer] = useState(null);
  const [cars, setCars] = useState([]);

  const [review, setReview] = useState("");
  const [purchase, setPurchase] = useState(false);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // Derive unique makes and models from cars array
  const makes = [...new Set(cars.map((c) => c.make))].sort();
  const models = carMake
    ? [...new Set(cars.filter((c) => c.make === carMake).map((c) => c.model))].sort()
    : [];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  useEffect(() => {
    if (!userName) navigate("/login");

    const fetchDealer = async () => {
      try {
        const res = await fetch(`/djangoapp/get_dealer/${id}`);
        const data = await res.json();
        setDealer(data.dealer?.[0] || data.dealer || null);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCars = async () => {
      try {
        const res = await fetch("/djangoapp/get_cars");
        const data = await res.json();
        setCars(data.CarModels || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDealer();
    fetchCars();
  }, [id, userName, navigate]);

  const handleSubmit = async () => {
    if (!review.trim()) {
      setMessageType("error");
      setMessage("Please write your review before submitting.");
      return;
    }
    setSubmitting(true);
    setMessage("");
    try {
      const payload = {
        name: userName,
        dealership: parseInt(id),
        review: review.trim(),
        purchase,
        purchase_date: purchaseDate,
        car_make: carMake,
        car_model: carModel,
        car_year: carYear,
      };
      const res = await fetch("/djangoapp/add_review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setMessageType("success");
        setMessage("Review submitted! Redirecting…");
        setTimeout(() => navigate(`/dealer/${id}`), 1200);
      } else {
        throw new Error("Server error");
      }
    } catch {
      setMessageType("error");
      setMessage("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="postreview-page">
      <div className="postreview-layout">
        <Link to={`/dealer/${id}`} className="postreview-back">
          ← Back to dealership
        </Link>

        {/* Header */}
        <div className="postreview-header">
          <div className="postreview-header-tag">Share Your Experience</div>
          <h1 className="postreview-title">
            Write a<br />Review
          </h1>
          {dealer && (
            <p className="postreview-subtitle">
              For <strong>{dealer.full_name}</strong> · {dealer.city}, {dealer.state}
            </p>
          )}
        </div>

        {/* Form card */}
        <div className="postreview-card">

          {/* Review text section */}
          <div className="postreview-card-section">
            <div className="section-title">Your Review</div>
            <div className="form-field">
              <label className="form-label" htmlFor="review-text">
                Tell us about your experience
              </label>
              <textarea
                id="review-text"
                className="form-textarea"
                placeholder="What did you think of this dealership? How was the sales process, customer service, and overall experience?"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={5}
              />
            </div>
          </div>

          {/* Purchase info section */}
          <div className="postreview-card-section">
            <div className="section-title">Purchase Details</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <label className="checkbox-field">
                <input
                  type="checkbox"
                  checked={purchase}
                  onChange={(e) => setPurchase(e.target.checked)}
                />
                <span className="checkbox-label">
                  I purchased a vehicle from this dealership
                </span>
              </label>

              {purchase && (
                <div className="form-field" style={{ maxWidth: "280px" }}>
                  <label className="form-label" htmlFor="purchase-date">
                    Purchase Date
                  </label>
                  <input
                    id="purchase-date"
                    className="form-input"
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Vehicle section */}
          <div className="postreview-card-section">
            <div className="section-title">Vehicle Information</div>
            <div className="form-row">
              <div className="form-field">
                <label className="form-label" htmlFor="car-make">Make</label>
                <select
                  id="car-make"
                  className="form-select"
                  value={carMake}
                  onChange={(e) => { setCarMake(e.target.value); setCarModel(""); }}
                >
                  <option value="">Select make</option>
                  {makes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="car-model">Model</label>
                <select
                  id="car-model"
                  className="form-select"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  disabled={!carMake}
                >
                  <option value="">Select model</option>
                  {models.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="car-year">Year</label>
                <select
                  id="car-year"
                  className="form-select"
                  value={carYear}
                  onChange={(e) => setCarYear(e.target.value)}
                >
                  <option value="">Select year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Status message */}
          {message && (
            <div className={`postreview-message ${messageType}`}>{message}</div>
          )}

          {/* Submit bar */}
          <div className="postreview-submit-section">
            <p className="postreview-notice">
              Your review will be analyzed for sentiment and posted publicly.
            </p>
            <button
              className="postreview-submit-btn"
              onClick={handleSubmit}
              disabled={submitting || !review.trim()}
            >
              {submitting ? "Submitting…" : "Submit Review →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostReview;
