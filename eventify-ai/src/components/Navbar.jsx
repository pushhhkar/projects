import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom"; 

const Navbar = () => {
  const [user, setUser] = useState(null);

  // This hook listens for changes to the user's login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  // This function handles logging the user out
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#1f2937",
        color: "white",
        padding: "1rem 2rem",
      }}
    >
      
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <h2 style={{ fontWeight: "bold", margin: 0 }}>Eventify</h2>
      </Link>
      
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        
        
        <Link 
          to="/about" 
          style={{ 
            color: "white", 
            textDecoration: "none", 
            marginRight: "1.5rem" 
          }}
        >
          About Us
        </Link>
        {/* --------------------- */}

        {/* Container for the Auth buttons */}
        <div>
          {user ? (
            // If user IS logged in, show Logout button
            <button
              onClick={handleLogout}
              style={{
                background: "#ef4444",
                border: "none",
                padding: "8px 14px",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          ) : (
            // If user is NOT logged in, show Sign In/Sign Up
            <>
              <Link to="/login">
                <button
                  style={{
                    background: "#3b82f6",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    color: "white",
                    marginRight: "8px",
                    cursor: "pointer",
                  }}
                >
                  Login In
                </button>
              </Link>
              <Link to="/signup">
                <button
                  style={{
                    background: "#22c55e",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;