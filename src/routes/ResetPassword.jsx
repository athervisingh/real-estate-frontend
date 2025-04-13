import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!password) {
      alert('Please enter a new password');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`http://localhost:5000/api/admin/reset-password/${token}`, { password });
      alert('Password reset successful!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f4f4f4] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#0e2f4e]">Reset Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8bd0f]"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-[#0e2f4e] hover:bg-[#163c64] text-white py-2 rounded-lg transition-all duration-300"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
