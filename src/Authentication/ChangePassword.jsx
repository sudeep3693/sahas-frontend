import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import config from "../Constants/config";

export default function ChangePassword() {
  const { adminEmail } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (adminEmail) {
      setEmail(adminEmail);
    }
  }, [adminEmail]);

  const handleChangePassword = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim() || !previousPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("New password must be at least 6 characters long.");
      return;
    }

    if (previousPassword === newPassword) {
      setErrorMessage("New password must be different from your current password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${config.baseUrl}/credential/password/change`, {
        email: email.trim().toLowerCase(),
        previousPassword,
        newPassword,
      });

      setSuccessMessage(response.data?.message || "Password updated successfully!");
      setPreviousPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error updating password.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "6px",
    border: "1px solid #ced4da",
    fontSize: "0.95rem",
    outline: "none",
    backgroundColor: "#fff",
    color: "#333",
  };

  const wrapperStyle = {
    position: "relative",
    marginBottom: "16px",
  };

  const toggleBtnStyle = {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1.1rem",
    padding: 0,
    zIndex: 2,
  };

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontWeight: "500",
    color: "#002B5B",
    fontSize: "0.9rem",
  };

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "10px 0" }}>
      {errorMessage && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            border: "1px solid #f5c6cb",
            borderRadius: "6px",
            padding: "10px 14px",
            marginBottom: "16px",
            fontSize: "0.9rem",
          }}
        >
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            border: "1px solid #c3e6cb",
            borderRadius: "6px",
            padding: "10px 14px",
            marginBottom: "16px",
            fontSize: "0.9rem",
          }}
        >
          {successMessage}
        </div>
      )}

      <form onSubmit={handleChangePassword}>
        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Admin Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errorMessage) setErrorMessage("");
            }}
            placeholder="admin@example.com"
            required
            disabled={loading}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Current Password</label>
          <div style={wrapperStyle}>
            <input
              type={showOldPassword ? "text" : "password"}
              value={previousPassword}
              onChange={(e) => {
                setPreviousPassword(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              placeholder="Enter current password"
              required
              disabled={loading}
              style={{ ...inputStyle, paddingRight: "44px", marginBottom: 0 }}
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              style={toggleBtnStyle}
              aria-label="Toggle current password"
            >
              {showOldPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>New Password</label>
          <div style={wrapperStyle}>
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              placeholder="Minimum 6 characters"
              required
              disabled={loading}
              style={{ ...inputStyle, paddingRight: "44px", marginBottom: 0 }}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              style={toggleBtnStyle}
              aria-label="Toggle new password"
            >
              {showNewPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Confirm New Password</label>
          <div style={wrapperStyle}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              placeholder="Confirm your new password"
              required
              disabled={loading}
              style={{ ...inputStyle, paddingRight: "44px", marginBottom: 0 }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={toggleBtnStyle}
              aria-label="Toggle confirm password"
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: loading ? "#6c757d" : "#28A745",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "500",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.2s ease",
          }}
        >
          {loading ? "Updating Password..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
