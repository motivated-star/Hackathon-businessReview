import { useEffect, useState } from "react";
import { fetchBusinesses, submitReview } from "../api";

export default function Home() {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: "", location: "" });
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

 
  useEffect(() => {
    fetchBusinesses().then(({ data }) => {
      setBusinesses(data);
      setFilteredBusinesses(data);
    });
  }, []);


  useEffect(() => {
    let result = businesses;

    if (search) {
      result = result.filter((b) =>
        b.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (filters.category) {
      result = result.filter((b) => b.category === filters.category);
    }

    if (filters.location) {
      result = result.filter((b) =>
        b.location.toLowerCase().includes(filters.location.toLowerCase()),
      );
    }

    setFilteredBusinesses(result);
  }, [search, filters, businesses]);

 
  const handleReviewSubmit = async (businessId) => {
    try {
      await submitReview({
        ...newReview,
        businessId,
      });

      alert("Review submitted successfully!");

      setNewReview({
        rating: 5,
        comment: "",
      });
    } catch {
      alert("Login required to submit review.");
    }
  };

  return (
    <div style={styles.page}>
      
      <div style={styles.header}>
        <h1 style={styles.title}>Discover & Review Businesses</h1>

        <p style={styles.subtitle}>
          Find trusted places and share your experience
        </p>
      </div>

    

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
          <option value="Cafe">Cafe</option>
          
          <option value="Hotel">Hotel</option>
        </select>

        <input
          style={styles.input}
          placeholder="📍 Location"
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
      </div>

     

      <div style={styles.grid}>
        {filteredBusinesses.map((biz) => (
          <div key={biz._id} style={styles.card}>
        

            <div style={styles.cardHeader}>
              <h3 style={styles.businessName}>{biz.name}</h3>

              <span style={styles.category}>{biz.category}</span>
            </div>

         

            <div style={styles.location}>📍 {biz.location}</div>

        

            <div style={styles.rating}>
              ⭐ {biz.avgRating > 0 ? biz.avgRating.toFixed(1) : "No ratings"}
            </div>

            <div style={styles.divider}></div>

           

            <div>
              <label style={styles.label}>Your Rating</label>

              <select
                style={styles.select}
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    rating: e.target.value,
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
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
  },

  businessName: {
    fontSize: "20px",
    fontWeight: "600",
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
