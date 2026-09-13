import React, { useState, useEffect } from 'react';
import '../Css/LoginPage.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import config from '../Constants/config';

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1 = Enter Email, 2 = Enter OTP & New Password, 3 = Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [countdown, setCountdown] = useState(0);

  const navigate = useNavigate();

  // Handle resend countdown timer
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Step 1: Send OTP to email
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your registered admin email.');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${config.baseUrl}/credential/send`, {
        email: email.trim().toLowerCase()
      });
      setSuccessMessage(res.data?.message || 'Verification code sent to your email.');
      setStep(2);
      setCountdown(60); // 60s cooldown for resend
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to send verification code. Please verify your email.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset Password with OTP + New Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!otp.trim()) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }

    if (!newPassword) {
      setErrorMessage('Please enter your new password.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New passwords do not match. Please recheck.');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${config.baseUrl}/credential/password/reset`, {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
        newPassword
      });

      setSuccessMessage(res.data?.message || 'Password has been successfully reset!');
      setStep(3);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to reset password. Please check the OTP.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="overlay">
        <div className="login-box">
          <h2 className="login-title">Reset Admin Password</h2>

          {step === 1 && (
            <>
              <p className="auth-subtitle">
                Enter your admin email and we will send you a 6-digit OTP code to reset your password.
              </p>

              {errorMessage && <div className="auth-alert-error">{errorMessage}</div>}
              {successMessage && <div className="auth-alert-success">{successMessage}</div>}

              <form onSubmit={handleSendOtp}>
                <div className="form-group">
                  <label>Admin Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Enter registered email"
                    required
                    disabled={loading}
                  />
                </div>

                <button type="submit" className="login-button" disabled={loading}>
                  {loading ? 'Sending Verification Code...' : 'Send OTP Code'}
                </button>

                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                  <Link to="/login" className="auth-link-btn">
                    &larr; Back to Login
                  </Link>
                </div>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ textAlign: 'center' }}>
                <span className="auth-step-badge">Step 2: Enter OTP & New Password</span>
              </div>
              <p className="auth-subtitle">
                We sent a 6-digit code to <strong>{email}</strong>
              </p>

              {errorMessage && <div className="auth-alert-error">{errorMessage}</div>}
              {successMessage && <div className="auth-alert-success">{successMessage}</div>}

              <form onSubmit={handleResetPassword}>
                <div className="form-group">
                  <label>Verification Code (OTP)</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    required
                    disabled={loading}
                    style={{ letterSpacing: '4px', fontSize: '1.2rem', textAlign: 'center' }}
                  />
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
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
                      onClick={() => setShowPassword(!showPassword)}
                      className="toggle-password"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? '🙈' : '👁️'}
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
                  {loading ? 'Resetting Password...' : 'Save New Password'}
                </button>

                <div className="auth-links-row" style={{ marginTop: '14px' }}>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading || countdown > 0}
                    className="auth-link-btn"
                    style={{ opacity: countdown > 0 ? 0.6 : 1 }}
                  >
                    {countdown > 0 ? `Resend Code (${countdown}s)` : 'Resend OTP Code'}
                  </button>

                  <Link to="/login" className="auth-link-btn">
                    Back to Login
                  </Link>
                </div>
              </form>
            </>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div style={{ fontSize: '3rem', color: '#28a745', marginBottom: '12px' }}>
                ✓
              </div>
              <h3 style={{ color: '#002B5B', marginBottom: '8px' }}>Password Reset Complete!</h3>
              <p style={{ color: '#555', fontSize: '0.95rem', marginBottom: '24px' }}>
                Your admin password has been successfully updated. You can now log in using your new credentials.
              </p>

              <button
                type="button"
                onClick={() => navigate('/login')}
                className="login-button"
              >
                Go to Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
