import React, { useState } from "react";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending reset link
    alert(`Reset link sent to ${email}`);
  };

  return (
    <div className="forgot-wrapper">
      <div className="forgot-container">
        <h2>Forgot Password</h2>
        <p>Enter your email and we'll send you a reset link.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
        <a href="/login">Back to Login</a>
      </div>
    </div>
  );
};

export default ForgotPassword;
