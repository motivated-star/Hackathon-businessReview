import { useState } from 'react';
import { register } from '../api'; 
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'user'
  });
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register(form);
      
      localStorage.setItem('token', data.token); 
      localStorage.setItem('profile', JSON.stringify(data.user)); 
      
      alert("Registration Successful!");
      navigate('/'); 
    } catch (err) {
      console.error("Signup Error:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>
      <p>Join our community of reviewers</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Full Name" 
          required 
          onChange={(e) => setForm({...form, name: e.target.value})} 
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          required 
          onChange={(e) => setForm({...form, email: e.target.value})} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          required 
          onChange={(e) => setForm({...form, password: e.target.value})} 
        />

  
        <div style={{ margin: '1rem 0', textAlign: 'left' }}>
          <label htmlFor="role" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            Register as:


          </label>
          <select 
            id="role"
            className="form-control"
            value={form.role}
            onChange={(e) => setForm({...form, role: e.target.value})}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px' }}
          >
            <option value="user">Standard User</option>
            <option value="reviewer">Reviewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          Sign Up
        </button>

        
      </form>
    </div>
  );
}