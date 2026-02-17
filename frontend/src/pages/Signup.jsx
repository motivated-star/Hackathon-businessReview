import { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert("Registration successful! Please login.");
      navigate('/login');
    } catch (err) {
      alert("Signup failed. Email might already exist.");
    }
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>
      <p>Join our community of reviewers</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" required 
          onChange={(e) => setForm({...form, name: e.target.value})} />
        <input type="email" placeholder="Email Address" required 
          onChange={(e) => setForm({...form, email: e.target.value})} />
        <input type="password" placeholder="Password" required 
          onChange={(e) => setForm({...form, password: e.target.value})} />
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          Create Account
        </button>
      </form>
    </div>
  );
}