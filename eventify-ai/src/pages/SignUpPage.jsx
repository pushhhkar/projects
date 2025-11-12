

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
};



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from reloading
    setError(""); // Clear any old errors
    setLoading(true);

    try {
      // This is the Firebase function that creates a new user
      await createUserWithEmailAndPassword(auth, email, password);
      // If successful, redirect to the home page
      navigate("/");
    } catch (e) {
      setError("Failed to create an account: " + e.message);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={{ textAlign: "center" }}>Sign Up</h2>

        {/* Show an error message if one exists */}
        {error && <div style={styles.error}>{error}</div>}

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        {/* Button is disabled while loading to prevent multiple clicks */}
        <button disabled={loading} type="submit" style={styles.button}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </form>
    </div>
  );
}