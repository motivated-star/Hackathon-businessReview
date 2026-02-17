import { useState } from 'react';
import { register } from '../api'; // Use register for the signup page
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  // 1. Initialize state to match the fields your backend expects (e.g., name, email, password)
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 2. Call the register API with the correct state variable 'form'
      const { data } = await register(form);
      
      // 3. Store the token and user data in localStorage
      localStorage.setItem('token', data.token); 
      localStorage.setItem('profile', JSON.stringify(data.user)); 
      
      alert("Registration Successful!");
      navigate('/'); // Redirect to home page
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
        {/* Added Name field which is typically required for user registration */}
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
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          Sign Up
        </button>
      </form>
    </div>
  );
}