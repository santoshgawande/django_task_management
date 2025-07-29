
import { useState } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
     try {
      const res = await API.post('accounts/login/', { username, password });
      localStorage.setItem('token', res.data.token);
    navigate('/tasks');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    }

  };

  return (
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <label className="block text-sm font-medium mb-1">User Name</label>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"             className="w-full border rounded-lg p-2"
            required/>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"             className="w-full border rounded-lg p-2"
/>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-2xl shadow-md hover:bg-blue-700"
>Login</button>
        </form>
        {error && <p className="mt-2 text-red-500">{error}</p>}
        <p className="mt-4 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
  
  );
  
}
