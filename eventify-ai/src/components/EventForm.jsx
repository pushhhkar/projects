import React, { useState } from "react";
import "../styles/App.css";

export default function EventForm(props) {
  const [eventName, setEventName] = useState("");
  const [budget, setBudget] = useState("");
  const [guests, setGuests] = useState("");
  const [eventType, setEventType] = useState("Wedding");
  const [error, setError] = useState(""); 

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload

    // --- Improved Validation ---
    if (!eventName || !budget || !guests) {
      setError("Please fill out all the fields.");
      return;
    }
    if (Number(budget) < 50000) {
      setError("The budget must be at least ₹50,000.");
      return;
    }
    if (Number(guests) < 1) {
        setError("Guest count must be at least 1.");
        return;
    }

    // If validation passes, clear any previous errors
    setError("");

    // Create the data object to send to the parent component
    const formData = {
      name: eventName,
      budget: Number(budget),
      guests: Number(guests),
      type: eventType,
    };

    props.onProceed(formData); // Send data to the parent
  };

  return (
    <div className="event-page">
      {/* Left side collage */}
      <div className="left-side">
        <div className="collage">
          <img src="/themes/img1.jpg" alt="Theme1" />
          <img src="/themes/img2.jpg" alt="Theme2" />
          <img src="/themes/img3.jpg" alt="Theme3" />
          <img src="/themes/img4.jpg" alt="Theme4" />
          <img src="/themes/img5.jpg" alt="Theme5" />
          <img src="/themes/img6.jpg" alt="Theme6" />
        </div>
      </div>

      {/* Right side form */}
      <div className="right-side">
        <h1 className="heading"> Eventify 🥂</h1>
        <p className="subheading">
          Smarter Planning. Happier Celebrating.
        </p>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="input"
          />

          <input
            type="number"
            placeholder="Total Budget (₹)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="input"
            min="50000"
          />

          <input
            type="number"
            placeholder="Guest Count"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="input"
            min="1"
          />

          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="input"
          >
            <option>Wedding</option>
            <option>Birthday</option>
            <option>Corporate</option>
            <option>Concert</option>
            <option>College Fests</option>
            <option>Festival</option>
          </select>
          
          {/* Display error message if it exists */}
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="Proceed">
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
}
