
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
 )
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
        setError('Registration failed. Try again');
        console.error(err);
    }
  };



  return (
    <div>
    <div>
        <form onSubmit={handleSubmit}>
            <input name="username" placeholder="username" value={form.username} onChange={handleChange}  />
            <input name="email" placeholder="email" value={form.email} onChange={handleChange}  />
            <input name="password" placeholder="password" value={form.password} onChange={handleChange}  />
            <input name="is_admin" placeholder="is_admin" value={form.is_admin} onChange={handleChange}  />

            <button type="submit">Register</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}


    </div>
                <p style={{ textAlign: 'center', marginTop: '1rem' }}>
  Already have an account?{' '}
  <Link to="/" style={{ color: '#3498db', textDecoration: 'underline' }}>
    Login here
  </Link>
</p>

 </div>
  );
}
