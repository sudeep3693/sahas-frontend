import React, { useState, useContext } from 'react';
import '../Css/LoginPage.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Authentication/AuthContext';
import config from '../Constants/config';
import { encrypt } from '../Security/AESUtil';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      const cleanEmail = username.trim();
      const encryptedUsername = encrypt(cleanEmail);
      const encryptedPassword = encrypt(password);

      const response = await axios.post(`${config.baseUrl}/admin/login`, {
        username: encryptedUsername,
        password: encryptedPassword
      });

      if (response.status === 200) {
        login(cleanEmail);
        navigate('/admin');
      }
    } catch (error) {
      const msg = error.response?.data || error.response?.data?.message || error.message || 'Login failed. Please check your credentials.';
      setErrorMessage(typeof msg === 'string' ? msg : 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="overlay">
        <div className="login-box">
          <h2 className="login-title">Admin Portal Login</h2>
          <p className="auth-subtitle">Sign in to manage Sahas Cooperative</p>

          {errorMessage && (
            <div className="auth-alert-error" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Admin Email</label>
              <input
                type="email"
                name="email"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Enter registered admin email"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  required
                  disabled={loading}
                  className="password-input"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="toggle-password"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>

              <div className="auth-links-row">
                <Link to="/forgot-password" className="auth-link-btn">
                  Forgot Password?
                </Link>
                <Link to="/change-password" className="auth-link-btn">
                  Change Password
                </Link>
              </div>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
