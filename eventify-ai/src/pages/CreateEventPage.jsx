import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

import EventForm from "../components/EventForm"; 

export default function CreateEventPage() {
  const navigate = useNavigate();

  const handleProceed = async (data) => {
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to create an event.");
      return;
    }

    try {
      
      const eventsRef = collection(db, "users", user.uid, "events");

      
      const docRef = await addDoc(eventsRef, data);
      
      navigate(`/event/${docRef.id}`);

    } catch (e) {
      console.error("Error creating event: ", e);
      alert("Failed to save event. Please try again.");
    }
  };

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Create a New Event</h1>
      <EventForm onProceed={handleProceed} />
    </div>
  );
}