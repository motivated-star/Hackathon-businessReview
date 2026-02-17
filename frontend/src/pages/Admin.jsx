import { useEffect, useState } from 'react';
import { getPendingReviews, approveReview } from '../api';

export default function Admin() {
  const [pendingReviews, setPendingReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to load or refresh the list of pending reviews
  const loadReviews = async () => {
    try {
      const { data } = await getPendingReviews();
      setPendingReviews(data);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleApprove = async (reviewId) => {
    try {
      // Calls the POST /api/review/approve/:id route
      await approveReview(reviewId);
      alert("Review approved! Business rating updated.");
      // Refresh the list after approval
      loadReviews();
    } catch (err) {
      console.log(err)
      alert("Error approving review");
    }
  };

  if (loading) return <p>Loading pending reviews...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard - Pending Approvals</h1>
      {pendingReviews.length === 0 ? (
        <p>No reviews awaiting approval.</p>
      ) : (
        pendingReviews.map((review) => (
          <div 
            key={review._id} 
            style={{ border: '1px solid #ddd', margin: '10px 0', padding: '15px', borderRadius: '8px' }}
          >
            <h4>Business ID: {review.businessId}</h4>
            <p><strong>Rating:</strong> {review.rating} / 5</p>
            <p><strong>Comment:</strong> {review.comment}</p>
            <button 
              onClick={() => handleApprove(review._id)}
              style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: '4px' }}
            >
              Approve Review
            </button>
          </div>
        ))
      )}
    </div>
  );
}