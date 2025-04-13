import { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!email) {
      alert('Please enter your email');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/admin/forgot-password', { email });
      alert('Check your email for the reset link');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Error sending email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f4f4f4] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#0e2f4e]">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8bd0f]"
          onChange={e => setEmail(e.target.value)}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="w-full bg-[#0e2f4e] hover:bg-[#163c64] text-white py-2 rounded-lg transition-all duration-300"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
