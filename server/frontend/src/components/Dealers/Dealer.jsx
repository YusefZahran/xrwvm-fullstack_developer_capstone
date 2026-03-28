import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Dealer.css";

const Dealer = () => {
  const { id } = useParams();
  const [dealer, setDealer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const userName = localStorage.getItem("username");

  const getInitials = (name = "") => {
    const words = name.trim().split(" ");
    return words.length >= 2
      ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [dealerRes, reviewsRes] = await Promise.all([
          fetch(`/djangoapp/get_dealer/${id}`),
          fetch(`/djangoapp/get_dealer_reviews/${id}`),
        ]);
        const dealerData = await dealerRes.json();
        const reviewsData = await reviewsRes.json();
        setDealer(dealerData.dealer?.[0] || dealerData.dealer || null);
        setReviews(reviewsData.reviews || []);
      } catch (err) {
        console.error("Error loading dealer data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const sentimentIcon = (sentiment) => {
    if (sentiment === "Positive") return "👍";
    if (sentiment === "Negative") return "👎";
    return "😐";
  };

  if (loading) {
    return (
      <div className="loading-state" style={{ paddingTop: "120px" }}>
        <div className="spinner" />
        Loading dealership…
      </div>
    );
  }

  if (!dealer) {
    return (
      <div className="empty-state" style={{ paddingTop: "120px" }}>
        <h3>Dealership Not Found</h3>
        <p>
          <Link to="/dealers">← Back to all dealerships</Link>
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Header banner */}
      <div className="dealer-header">
        <div className="dealer-header-inner">
          <Link to="/dealers" className="dealer-back-link">
            ← All Dealerships
          </Link>
          <div className="dealer-header-content">
            <div className="dealer-header-left">
              <div className="dealer-header-icon">
                {getInitials(dealer.full_name)}
              </div>
              <div className="dealer-header-info">
                <h1>{dealer.full_name}</h1>
                <div className="dealer-header-location">
                  <span>📍</span>
                  {dealer.city}, {dealer.state} · {dealer.address}
                </div>
              </div>
            </div>

            {userName ? (
              <Link
                to={`/postreview/${id}`}
                className="dealer-write-review-btn"
              >
                ✏️ Write a Review
              </Link>
            ) : (
              <span
                className="dealer-write-review-btn disabled"
                title="Log in to write a review"
              >
                ✏️ Write a Review
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="reviews-section">
        <div className="reviews-section-header">
          <h2 className="reviews-section-title">Customer Reviews</h2>
          <span className="reviews-count-badge">
            {reviews.length} review{reviews.length !== 1 ? "s" : ""}
          </span>
        </div>

        {reviews.length === 0 ? (
          <div className="empty-state">
            <h3>No Reviews Yet</h3>
            <p>
              {userName
                ? "Be the first to leave a review for this dealership."
                : "Log in to be the first to leave a review."}
            </p>
          </div>
        ) : (
          <div className="reviews-list">
            {reviews.map((review, idx) => (
              <div className="review-card" key={idx}>
                <div className="review-card-top">
                  <div className="review-author-info">
                    <div className="review-avatar">
                      {getInitials(review.name)}
                    </div>
                    <div>
                      <div className="review-author-name">{review.name}</div>
                      {review.purchase_date && (
                        <div className="review-purchase-date">
                          Purchased {review.purchase_date}
                        </div>
                      )}
                    </div>
                  </div>

                  {review.sentiment && (
                    <span
                      className={`sentiment-badge ${review.sentiment.toLowerCase()}`}
                    >
                      {sentimentIcon(review.sentiment)} {review.sentiment}
                    </span>
                  )}
                </div>

                <p className="review-text">{review.review}</p>

                <div className="review-card-footer">
                  {review.car_make && review.car_model && (
                    <span className="review-car-tag">
                      🚗 {review.car_year} {review.car_make} {review.car_model}
                    </span>
                  )}
                  {review.purchase && (
                    <span className="sentiment-badge positive" style={{ fontSize: "0.72rem" }}>
                      ✓ Verified Purchase
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dealer;
