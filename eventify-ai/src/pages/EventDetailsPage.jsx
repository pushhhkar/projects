import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

// Import your details components
import WeddingDetails from "../components/WeddingDetails";
// Import other details components here, e.g., BirthdayDetails

export default function EventDetailsPage() {
  const { id } = useParams(); // Gets the "id" from the URL
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async (uid) => {
      try {
        // 1. Create a reference to the specific event document
        const docRef = doc(db, "users", uid, "events", id);
        
        // 2. Fetch the document
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setEventData(docSnap.data());
        } else {
          alert("Event not found!");
        }
      } catch (e) {
        console.error("Error fetching document: ", e);
      }
      setLoading(false);
    };

    // Wait for auth to be ready before fetching
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchEvent(user.uid);
      } else {
        alert("Please log in to view this page.");
        setLoading(false);
      }
    });
    
    return () => unsubscribe(); // Cleanup listener

  }, [id]); // Re-run if the event ID in the URL changes

  if (loading) {
    return <div style={{textAlign: 'center', marginTop: '50px'}}>Loading event details...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <Link to="/">&larr; Back to Dashboard</Link>
      
      {/* 3. Conditionally render the correct details component */}
      {eventData && eventData.type === "Wedding" && (
        <WeddingDetails formData={eventData} />
      )}
      
      {/* Example for other types */}
      {/* {eventData && eventData.type === "Birthday" && (
        <p>This is a Birthday Event</p>
      )} */}
      
      {!eventData && !loading && (
        <h2>Event could not be loaded.</h2>
      )}
    </div>
  );
}