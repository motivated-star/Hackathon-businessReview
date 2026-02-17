import { useState } from 'react';
import { login } from '../api'; 
import { useNavigate } from 'react-router-dom'; 

export default function Login() {
  
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      const { data } = await login(form);
      
     
      localStorage.setItem('token', data.token); 
      localStorage.setItem('profile', JSON.stringify(data.user)); 
      
      alert("Login Successful!");
      
    
      navigate('/');
    } catch (err) {
     
      console.error("Login Error:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Login failed. Check your credentials.");
    }
  };

  return (
    <div className="auth-card">
      <h2>Login Account</h2>
      <p>Welcome back to our community of reviewers</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email Address" 
          required 
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          required 
          value={form.password}
          onChange={(e) => setForm({...form, password: e.target.value})} 
        />
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          Login
        </button>
      </form>
    </div>
  );
}