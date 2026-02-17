import { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({  email: '', password: '' });
  const navigate = useNavigate();

 // frontend/src/pages/Signup.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await register(form); // Call API function
    alert("Login successful!");
    navigate('/login'); // Redirect to login
  } catch (err) {
    console.error(err);
    alert("Login failed.");
  }
};

  return (
    <div className="auth-card">
      <h2>Login Account</h2>
      <p>Welcome back to our community of reviewers</p>
      <form onSubmit={handleSubmit}>
       
        <input type="email" placeholder="Email Address" required 
          onChange={(e) => setForm({...form, email: e.target.value})} />
        <input type="password" placeholder="Password" required 
          onChange={(e) => setForm({...form, password: e.target.value})} />
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          Login
        </button>
      </form>
    </div>
  );
}