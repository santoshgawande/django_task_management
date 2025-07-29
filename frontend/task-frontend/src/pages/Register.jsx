
import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState(
    {
        username: '',
        email : '',
        password: '',
        is_admin : false
    }
 );
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;
    setForm({
     ...form,
     [name]: type == 'checkbox' ? checked : value
        
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        await API.post('accounts/register/', form);
        alert('Registratiom successful. Please login in.');
        navigate('/');
    }catch(err){
        console.error(err);
        setError('Registration failed. Try again');
        console.error(err);
    }
  };



  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input 
              name="username" 
              placeholder="username" 
              value={form.username} 
              onChange={handleChange}  
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label> 
            <input 
              name="email" 
              placeholder="email" 
              value={form.email} 
              onChange={handleChange}  
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              name="password" 
              type="password"
              placeholder="password" 
              value={form.password} 
              onChange={handleChange}  
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_admin"
              checked={form.is_admin}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm">Admin?</label>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-2xl shadow-md hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>

      {error && <p className="mt-2 text-red-500">{error}</p>}
      <p className="mt-4 text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-green-600 hover:underline">
          Login here
        </Link>
      </p>
    </div>

 
  );
}
