import { useEffect, useState } from 'react';
import { fetchBusinesses, submitReview } from '../api';

export default function Home() {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: '', location: '' });
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  // 1. Fetch businesses on load
  useEffect(() => {
    fetchBusinesses().then(({ data }) => {
      setBusinesses(data);
      setFilteredBusinesses(data);
    });
  }, []);

  // 2. Logic for Search and Filter
  useEffect(() => {
    let result = businesses;

    if (search) {
      result = result.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (filters.category) {
      result = result.filter(b => b.category === filters.category);
    }
    if (filters.location) {
      result = result.filter(b => b.location.toLowerCase().includes(filters.location.toLowerCase()));
    }

    setFilteredBusinesses(result);
  }, [search, filters, businesses]);

  const handleReviewSubmit = async (businessId) => {
    try {
      await submitReview({ ...newReview, businessId });
      alert("Review submitted! It will appear once approved by an admin.");
    } catch (err) {
      alert("Login required to submit reviews.");
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1>Find and Review Businesses</h1>
        
        {/* Search and Filter UI */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <input 
            type="text" 
            placeholder="Search by name..." 
            style={{ flex: 2 }}
            onChange={(e) => setSearch(e.target.value)} 
          />
          <select 
            style={{ flex: 1 }}
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
            style={{ flex: 1 }}
            onChange={(e) => setFilters({...filters, location: e.target.value})} 
          />
        </div>
      </header>

      {/* Business Listing */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredBusinesses.map((biz) => (
          <div key={biz._id} className="business-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3>{biz.name}</h3>
              <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                {biz.category}
              </span>
            </div>
            <p style={{ color: '#64748b' }}>📍 {biz.location}</p>
            <div style={{ margin: '1rem 0', fontWeight: 'bold', color: '#f59e0b' }}>
              ⭐ {biz.avgRating > 0 ? biz.avgRating.toFixed(1) : 'No ratings'}
            </div>
            
            <hr />
            
            {/* Review Submission UI */}
            <div style={{ marginTop: '1rem' }}>
              <label>Rate this business:</label>
              <input 
                type="number" min="1" max="5" 
                defaultValue="5"
                onChange={(e) => setNewReview({...newReview, rating: e.target.value})} 
              />
              <textarea 
                placeholder="Write your experience..." 
                style={{ height: '60px', marginTop: '0.5rem' }}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})} 
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
        ))}
      </div>
    </div>
  );
}