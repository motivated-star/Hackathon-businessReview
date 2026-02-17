import { useEffect, useState, useMemo } from 'react';
import { fetchBusinesses, submitReview } from '../api';

export default function Home() {
  const [businesses, setBusinesses] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: '', location: '' });

  // 1. Fixed State: Store review inputs per business to prevent cross-card typing
  const [reviewInputs, setReviewInputs] = useState({});

  useEffect(() => {
    fetchBusinesses().then(({ data }) => {
      setBusinesses(data);
    }).catch(err => console.error("Fetch error:", err));
  }, []);

  // 2. Fixed Filtering: Replaces 'setFilteredBusinesses' state and useEffect
  // This automatically updates whenever search, filters, or businesses change
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(b => {
      const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = filters.category ? b.category === filters.category : true;
      const matchesLocation = b.location.toLowerCase().includes(filters.location.toLowerCase());
      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [search, filters, businesses]);

  const handleReviewSubmit = async (businessId) => {
    const input = reviewInputs[businessId] || { rating: 5, comment: '' };
    
    try {
      await submitReview({ ...input, businessId });
      alert("Review submitted! It will appear once approved by an admin.");
      // Clear input for this specific card after success
      setReviewInputs(prev => ({ ...prev, [businessId]: { rating: 5, comment: '' } }));
    } catch (err) {
      console.error(err);
      alert("Login required to submit reviews.");
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1>Find and Review Businesses</h1>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <input 
            type="text" 
            placeholder="Search by name..." 
            style={{ flex: 2, padding: '8px' }}
            onChange={(e) => setSearch(e.target.value)} 
          />
          <select 
            style={{ flex: 1, padding: '8px' }}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
          >
            <option value="">All Categories</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Retail">Retail</option>
            <option value="Services">Services</option>
          </select>
          <input 
            type="text" 
            placeholder="Location..." 
            style={{ flex: 1, padding: '8px' }}
            onChange={(e) => setFilters({...filters, location: e.target.value})} 
          />
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredBusinesses.map((biz) => {
          const currentInput = reviewInputs[biz._id] || { rating: 5, comment: '' };
          return (
            <div key={biz._id} className="business-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <h3>{biz.name}</h3>
              <p style={{ color: '#64748b' }}>📍 {biz.location} ({biz.category})</p>
              <div style={{ margin: '1rem 0', fontWeight: 'bold', color: '#f59e0b' }}>
                ⭐ {biz.avgRating > 0 ? biz.avgRating.toFixed(1) : 'No ratings'}
              </div>
              
              <hr />

              {/* Display approved reviews for this business */}
              <div style={{ marginTop: '1rem', maxHeight: '150px', overflowY: 'auto' }}>
                {biz.reviews && biz.reviews.length > 0 ? (
                  biz.reviews.map((r, i) => (
                    <div key={i} style={{ fontSize: '0.85rem', marginBottom: '8px', borderLeft: '3px solid #0369a1', paddingLeft: '8px' }}>
                      <strong>⭐ {r.rating}</strong>: {r.comment}
                    </div>
                  ))
                ) : <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>No reviews yet.</p>}
              </div>

              <hr />
              
              <div style={{ marginTop: '1rem' }}>
                <label style={{ fontSize: '0.9rem' }}>Rate (1-5): </label>
                <input 
                  type="number" min="1" max="5" 
                  value={currentInput.rating}
                  onChange={(e) => setReviewInputs({
                    ...reviewInputs, 
                    [biz._id]: { ...currentInput, rating: e.target.value }
                  })} 
                />
                <textarea 
                  placeholder="Your experience..." 
                  style={{ height: '60px', width: '100%', marginTop: '0.5rem', padding: '5px' }}
                  value={currentInput.comment}
                  onChange={(e) => setReviewInputs({
                    ...reviewInputs, 
                    [biz._id]: { ...currentInput, comment: e.target.value }
                  })} 
                />
                <button 
                  onClick={() => handleReviewSubmit(biz._id)}
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  Submit Review
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}