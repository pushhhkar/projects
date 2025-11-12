import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

import EventForm from "../components/EventForm";
import WeddingDetails from "../components/WeddingDetails";

export default function HomePage() {
  const [formData, setFormData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        const docRef = doc(db, "events", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          setFormData(null);
        }
      } else {
        setFormData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleProceed = async (data) => {
    if (currentUser) {
      try {
        const docRef = doc(db, "events", currentUser.uid);
        await setDoc(docRef, data);
        setFormData(data);
      } catch (e) {
        console.error("Error adding document: ", e);
        alert("Error saving your event. Please try again.");
      }
    } else {
      alert("Please sign up or log in to continue.");
      navigate("/signup");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", fontSize: "1.2rem" }}>
        Loading your events...
      </div>
    );
  }

  return (
    <>
      {!formData && <EventForm onProceed={handleProceed} />}

      {formData && formData.type === "Wedding" && (
        <WeddingDetails formData={formData} />
      )}
    </>
  );
}