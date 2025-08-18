import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import config from "../Constants/config";

export default function OtpComponent() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);

    const sendOtp = async () => {
        if (!email) return alert("Please enter your email");
        try {
            await axios.post(`${config.baseUrl}/credential/send`, { email });
            alert("OTP sent to your email");
            setStep(2);
        } catch (err) {
            alert(err.response?.data?.message || "Error sending OTP");
        }
    };

    const verifyOtp = async () => {
        if (!otp) return alert("Please enter the OTP");
        try {
            // Step 1: Verify OTP
            await axios.post(`${config.baseUrl}/credential/verify`, { email, otp });

            // Step 2: Generate new password and send via email
            await axios.post(`${config.baseUrl}/credential/password/generate`, { email });

            alert("OTP verified! A new password has been sent to your email.");
            setStep(1); // Reset form
            setEmail("");
            setOtp("");
            
        } catch (err) {
            alert(err.response?.data?.message || "Error verifying OTP or sending password");
        }
    };

    return (
        <div style={{
            maxWidth: "400px",
            margin: "40px auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontFamily: "Arial, sans-serif"
        }}>
            {step === 1 && (
                <>
                    <h3>Enter your email</h3>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc"
                        }}
                    />
                    <button
                        onClick={sendOtp}
                        style={{
                            width: "100%",
                            padding: "10px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }}
                    >
                        Send OTP
                    </button>
                </>
            )}

            {step === 2 && (
                <>
                    <h3>Enter the OTP sent to your email</h3>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc"
                        }}
                    />
                    <button
                        onClick={verifyOtp}
                        style={{
                            width: "100%",
                            padding: "10px",
                            backgroundColor: "#28a745",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }}
                    >
                        Verify OTP
                    </button>
                </>
            )}
        </div>
    );
}
