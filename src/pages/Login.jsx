import React, { useState, useContext } from 'react';
import '../Css/LoginPage.css';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
     
      const encryptedUsername = encrypt(username);
      const encryptedPassword = encrypt(password);

      const response = await axios.post(`${config.baseUrl}/admin/login`, {
        username: encryptedUsername,
        password: encryptedPassword
      });

      if (response.status === 200) {
        login();
        navigate('/admin');
      }
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="overlay">
        <div className="login-box">
          <h2 className="login-title">Login to Your Account</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="password-input"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="toggle-password"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              <small className="forgot-password">
                <a href="/forgot-password">Forgot Password?</a>
              </small>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
