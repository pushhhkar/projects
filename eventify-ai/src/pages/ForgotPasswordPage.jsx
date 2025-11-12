// src/pages/ForgotPasswordPage.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase"; 
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      // This is the Firebase function to send the email
      await sendPasswordResetEmail(auth, email);
      setMessage("Success! Check your email inbox for a reset link.");
    } catch (e) {
      if (e.code === "auth/user-not-found") {
        setError("No account found with that email address.");
      } else {
        setError("Failed to send reset email: " + e.message);
      }
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={{ textAlign: "center" }}>Password Reset</h2>

        {/* Show error or success messages */}
        {error && <div style={styles.error}>{error}</div>}
        {message && <div style={styles.success}>{message}</div>}

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <button disabled={loading} type="submit" style={styles.button}>
          {loading ? "Sending..." : "Send Reset Email"}
        </button>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link to="/login">Back to Log In</Link>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "50px",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0 20px 0",
    boxSizing: "border-box",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    backgroundColor: "#fde8e8",
    color: "#b91c1c",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "1rem",
    textAlign: "center",
  },
  
  success: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "1rem",
    textAlign: "center",
  },
};