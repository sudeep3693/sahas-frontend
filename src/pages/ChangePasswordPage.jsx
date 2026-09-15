import React, { useState, useContext } from 'react';
import '../Css/LoginPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Authentication/AuthContext';
import config from '../Constants/config';

export default function ChangePasswordPage() {
  const { adminEmail, isAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState(adminEmail || '');
  const [previousPassword, setPreviousPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email.trim() || !previousPassword || !newPassword || !confirmPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }

    if (previousPassword === newPassword) {
      setErrorMessage('New password must be different from current password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match.');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${config.baseUrl}/credential/password/change`, {
        email: email.trim().toLowerCase(),
        previousPassword,
        newPassword
      });

      setSuccessMessage(res.data?.message || 'Password changed successfully!');
      setPreviousPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to update password. Please check your credentials.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="overlay">
        <div className="login-box">
          <h2 className="login-title">Change Admin Password</h2>
          <p className="auth-subtitle">Update your password using your current password</p>

          {errorMessage && (
            <div className="auth-alert-error" role="alert">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="auth-alert-success" role="alert">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label>Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Enter admin email"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Current Password</label>
              <div className="password-wrapper">
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  value={previousPassword}
                  onChange={(e) => {
                    setPreviousPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Enter current password"
                  required
                  disabled={loading}
                  className="password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="toggle-password"
                  aria-label="Toggle current password visibility"
                >
                  {showOldPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>New Password</label>
              <div className="password-wrapper">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Minimum 6 characters"
                  required
                  disabled={loading}
                  className="password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="toggle-password"
                  aria-label="Toggle new password visibility"
                >
                  {showNewPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Re-enter new password"
                  required
                  disabled={loading}
                  className="password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="toggle-password"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Updating Password...' : 'Update Password'}
            </button>

            <div className="auth-links-row" style={{ marginTop: '14px' }}>
              <Link to="/login" className="auth-link-btn">
                &larr; Back to Login
              </Link>
              {isAuthenticated && (
                <Link to="/admin" className="auth-link-btn">
                  Admin Dashboard &rarr;
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
