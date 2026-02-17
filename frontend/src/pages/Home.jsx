import { useEffect, useState } from "react";
import { fetchBusinesses, submitReview } from "../api";

export default function Home() {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: "", location: "" });
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  /* Fetch businesses (Backend already returns businesses with approved reviews) */
  useEffect(() => {
    fetchBusinesses().then(({ data }) => {
      setBusinesses(data);
      setFilteredBusinesses(data);
    });
  }, []);

  /* Filter logic */
  useEffect(() => {
    let result = businesses;

    if (search) {
      result = result.filter((b) =>
        b.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filters.category) {
      result = result.filter((b) => b.category === filters.category);
    }

    if (filters.location) {
      result = result.filter((b) =>
        b.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredBusinesses(result);
  }, [search, filters, businesses]);

  /* Submit review with logged-in user data */
  const handleReviewSubmit = async (businessId) => {
    // 1. Get the user profile from localStorage
    const profile = JSON.parse(localStorage.getItem('profile')); 
    
    if (!profile) {
      alert("Login required to submit review.");
      return;
    }

    try {
      await submitReview({
        ...newReview,
        businessId,
        user: profile.name, 
      });

      alert("Review submitted! It will appear once approved by admin.");

      setNewReview({
        rating: 5,
        comment: "",
      });
      
      // Optional: Refresh list to update UI if admin auto-approves
      fetchBusinesses().then(({ data }) => setFilteredBusinesses(data));
    } catch (err) {
      alert("Error submitting review. Please try again.");
    }
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Discover & Review Businesses</h1>
        <p style={styles.subtitle}>Find trusted places and share your experience</p>
      </div>

      {/* FILTER BAR */}
      <div style={styles.filterBar}>
        <input
          style={styles.input}
          placeholder="🔍 Search business..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          style={styles.input}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          <option value="Restaurant">Restaurant</option>
          <option value="Retail">Retail</option>
          <option value="Services">Services</option>
          <option value="Hotel">Hotel</option>
        </select>

        <input
          style={styles.input}
          placeholder="📍 Location"
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
      </div>

      {/* BUSINESS GRID */}
      <div style={styles.grid}>
        {filteredBusinesses.map((biz) => (
          <div key={biz._id} style={styles.card}>
            {/* Card Header */}
            <div style={styles.cardHeader}>
              <h3 style={styles.businessName}>{biz.name}</h3>
              <span style={styles.category}>{biz.category}</span>
            </div>

            {/* Location & Rating */}
            <div style={styles.location}>📍 {biz.location}</div>
            <div style={styles.rating}>
              ⭐ {biz.avgRating > 0 ? biz.avgRating.toFixed(1) : "No ratings"}
            </div>

            <div style={styles.divider}></div>

            {/* DISPLAY REVIEWS LIST */}
            <div style={styles.reviewList}>
              <h4 style={{ marginTop: '0px', marginBottom: '10px', fontSize: '16px' }}>Reviews:</h4>
              {biz.reviews && biz.reviews.length > 0 ? (
                biz.reviews.map((r) => (
                  <div key={r._id} style={styles.reviewItem}>
                    <p style={{ margin: '0' }}>
                      <strong>{r.user || "Anonymous"}:</strong> {r.comment} 
                      <span style={{ color: '#f59e0b', marginLeft: '5px' }}>({r.rating}⭐)</span>
                    </p>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '14px', color: '#64748b' }}>No reviews yet.</p>
              )}
            </div>

            <div style={styles.divider}></div>

            {/* REVIEW SUBMISSION FORM */}
            <div>
              <label style={styles.label}>Your Rating</label>
              <select
                style={styles.select}
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    rating: Number(e.target.value),
                  })
                }
              >
                <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                <option value="4">⭐⭐⭐⭐ Very Good</option>
                <option value="3">⭐⭐⭐ Good</option>
                <option value="2">⭐⭐ Average</option>
                <option value="1">⭐ Poor</option>
              </select>

              <textarea
                style={styles.textarea}
                placeholder="Write your experience..."
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    comment: e.target.value,
                  })
                }
              />

              <button
                style={styles.button}
                onClick={() => handleReviewSubmit(biz._id)}
              >
                Submit Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* UPDATED PROFESSIONAL STYLES */
const styles = {
  page: {
    padding: "40px 60px",
    background: "linear-gradient(135deg,#f8fafc,#eef2ff)",
    minHeight: "100vh",
  },
  header: {
    marginBottom: "30px",
  },
  title: {
    fontSize: "34px",
    fontWeight: "700",
    color: "#0f172a",
  },
  subtitle: {
    color: "#64748b",
    marginTop: "6px",
  },
  filterBar: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },
  input: {
    flex: "1",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    fontSize: "15px",
    background: "white",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
    gap: "25px",
  },
  card: {
    background: "white",
    padding: "22px",
    borderRadius: "14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    transition: "0.3s",
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  businessName: {
    fontSize: "20px",
    fontWeight: "600",
    margin: 0,
  },
  category: {
    background: "#dbeafe",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    color: "#1e40af",
    fontWeight: "600",
  },
  location: {
    marginTop: "8px",
    color: "#64748b",
  },
  rating: {
    marginTop: "8px",
    fontWeight: "600",
    color: "#f59e0b",
  },
  divider: {
    height: "1px",
    background: "#e2e8f0",
    margin: "16px 0",
  },
  reviewList: {
    textAlign: 'left',
    maxHeight: '150px',
    overflowY: 'auto',
    padding: '12px',
    background: '#f8fafc',
    borderRadius: '10px',
    border: '1px solid #f1f5f9'
  },
  reviewItem: {
    fontSize: '13px',
    borderBottom: '1px solid #e2e8f0',
    padding: '8px 0',
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
  },
  select: {
    width: "100%",
    padding: "10px",
    marginTop: "6px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    height: "70px",
    boxSizing: 'border-box'
  },
  button: {
    width: "100%",
    marginTop: "12px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
  },
};