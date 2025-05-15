import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 
  const handleLogin = async () => {
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', { username: username.trim(),
        password: password.trim()});
      localStorage.setItem('token', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f4f4f4] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#0e2f4e]">Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8bd0f]"
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8bd0f]"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#0e2f4e] hover:bg-[#163c64] text-white py-2 rounded-lg transition-all duration-300"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-sm text-[#0e2f4e] hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
