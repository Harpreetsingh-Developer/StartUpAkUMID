import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import icons from '../../../constants/icons';
import './SuperLogin.scss';
import { API_BASE_URL } from '../../../config/api';
import GoogleLoginButton from '../../../components/common/GoogleLoginButton/GoogleLoginButton';

const SuperUserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already authenticated on component mount
  useEffect(() => {
    // Temporarily disabled verify-session check
    // checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-session`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data.user.role === 'super') {
          localStorage.setItem('role', 'super');
          localStorage.setItem('user', JSON.stringify(data.data.user));
          navigate('/home', { replace: true });
        }
      }
    } catch (error) {
      // User not authenticated, continue with login form
      console.log('User not authenticated');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/superlogin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Login successful! Redirecting...');
        
        // Store user data in localStorage
        localStorage.setItem('role', 'super');
        localStorage.setItem('user', JSON.stringify(data.data.user));
        localStorage.setItem('accessToken', data.data.accessToken);
        
        setTimeout(() => {
          navigate('/home', { replace: true });
        }, 1200);
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (data) => {
    setSuccess('Google login successful! Redirecting...');
    setTimeout(() => {
      navigate('/home', { replace: true });
    }, 1200);
  };

  const handleGoogleError = (errorMessage) => {
    setError(errorMessage);
  };
  
  const adminIcon = icons.Super;
  
  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        {/* Icon at the top and center */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', marginTop: '0.5rem' }}>
          <img
            src={adminIcon}
            alt="Admin Icon"
            style={{ width: 48, height: 48}}
          />
        </div>
                <h2 className="admin-login-title">
           Super Admin Login
        </h2>
        
        {/* Google Login Button */}
        <GoogleLoginButton
          role="super"
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          disabled={loading}
        />
        
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <input
            className="admin-login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input
            className="admin-login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <div className="forgot-password-wrapper">
            <span
              className="forgot-password"
              onClick={() => alert('Forgot password functionality not implemented.')}
              style={{ pointerEvents: loading ? 'none' : 'auto', opacity: loading ? 0.6 : 1 }}
            >
              Forgot password?
            </span>
          </div>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          {success && (
            <div className="success-message">
              {success}
            </div>
          )}
          <button className="admin-login-button" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuperUserLogin;
