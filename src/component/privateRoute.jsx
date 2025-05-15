import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setChecking(false);
        return;
      }

      try {
        await axios.get('/api/admin/dashboard', {
          headers: {
            'x-auth-token': token,
          },
        });
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Token invalid or expired');
        localStorage.removeItem('token');
      } finally {
        setChecking(false);
      }
    };

    verifyToken();
  }, []);

  if (checking) return <div>Loading...</div>; // Optional loading UI
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
