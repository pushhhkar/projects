import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";


import WeddingDetails from "../components/WeddingDetails";


export default function EventDetailsPage() {
  const { id } = useParams(); 
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async (uid) => {
      try {
        
        const docRef = doc(db, "users", uid, "events", id);
        
       
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

    
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchEvent(user.uid);
      } else {
        alert("Please log in to view this page.");
        setLoading(false);
      }
    });
    
    return () => unsubscribe(); 

  }, [id]); 

  if (loading) {
    return <div style={{textAlign: 'center', marginTop: '50px'}}>Loading event details...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <Link to="/">&larr; Back to Dashboard</Link>
      
      
      {eventData && eventData.type === "Wedding" && (
        <WeddingDetails formData={eventData} />
      )}
      

      
      {!eventData && !loading && (
        <h2>Event could not be loaded.</h2>
      )}
    </div>
  );
}