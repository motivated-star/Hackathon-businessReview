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
      localStorage.setItem('role', data.role);
      navigate('/');
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required onChange={(e) => setForm({...form, email: e.target.value})} />
        <input type="password" placeholder="Password" required onChange={(e) => setForm({...form, password: e.target.value})} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}