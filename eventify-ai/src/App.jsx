import React, { useState } from "react";
import EventForm from "./components/EventForm";
import WeddingDetails from "./components/WeddingDetails";

export default function App() {
  const [formData, setFormData] = useState(null);

  const handleProceed = (data) => {
    setFormData(data);
  };

  return (
    <>
      {!formData && <EventForm onProceed={handleProceed} />}

      {formData && formData.type === "Wedding" && (
        <WeddingDetails formData={formData} />
      )}
    </>
  );
}