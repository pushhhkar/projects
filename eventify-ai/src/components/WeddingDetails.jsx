import React, { useState } from "react";
import Summary from "./Summary"; // Summary page
import "../styles/Wedding.css";

export default function WeddingDetails({ formData }) {
  const [theme, setTheme] = useState("Royal");
  const [venue, setVenue] = useState("");
  const [catering, setCatering] = useState("");
  const [decor, setDecor] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [summaryData, setSummaryData] = useState({});

  const [guestCount, setGuestCount] = useState(formData.guests);
  const [budget, setBudget] = useState(formData.budget);

  // Venues per theme
  const venueOptions = {
    Royal: ["Udaipur Palace", "Jaipur Fort", "Mysore Palace"],
    Traditional: ["Banaras Heritage Hall", "Rajasthan Haveli", "Temple Courtyard"],
    Modern: ["Taj Convention Center", "JW Marriott Hall", "The Leela Ballroom"],
    Beach: ["Goa Beach Resort", "Pondicherry Seaside Venue", "Kovalam Bay Resort"],
  };

  // Theme images
  const themeImages = {
    Royal: ["/themes/royal.jpg", "/themes/royal2.jpg"],
    Traditional: ["/themes/traditional.jpg", "/themes/traditional2.jpg"],
    Modern: ["/themes/modern.jpg", "/themes/modern2.jpg"],
    Beach: ["/themes/beach.jpg", "/themes/beach2.jpg"],
  };

  // Mock AI suggestion function
  const getMockAISuggestion = (theme, budget, guestCount, venue, catering, decor) => {
    // Approximate costs (in ₹)
    const venueCosts = {
      "Udaipur Palace": 200000,
      "Jaipur Fort": 180000,
      "Mysore Palace": 170000,
      "Banaras Heritage Hall": 120000,
      "Rajasthan Haveli": 110000,
      "Temple Courtyard": 100000,
      "Taj Convention Center": 150000,
      "JW Marriott Hall": 160000,
      "The Leela Ballroom": 170000,
      "Goa Beach Resort": 140000,
      "Pondicherry Seaside Venue": 130000,
      "Kovalam Bay Resort": 120000,
    };

    const cateringCosts = {
      "Indian Traditional": 1000 * guestCount,
      "Continental": 1200 * guestCount,
      "Fusion": 1500 * guestCount,
    };

    const decorCosts = {
      "Floral Royal": 50000,
      "Minimal Elegant": 30000,
      "Luxury Modern": 60000,
    };

    const totalEstimated =
      (venueCosts[venue] || 0) +
      (cateringCosts[catering] || 0) +
      (decorCosts[decor] || 0);

    if (totalEstimated <= budget) {
      return `🎉 Good news! Your selections can be done under ₹${budget.toLocaleString()}. Estimated total: ₹${totalEstimated.toLocaleString()}.`;
    } else {
      // Suggest cheaper alternatives
      let suggestedVenue = venue;
      let suggestedCatering = catering;
      let suggestedDecor = decor;

      // Find cheaper venue
      for (let v of Object.keys(venueCosts)) {
        if (venueCosts[v] + (cateringCosts[catering] || 0) + (decorCosts[decor] || 0) <= budget) {
          suggestedVenue = v;
          break;
        }
      }
      // Find cheaper catering
      for (let c of Object.keys(cateringCosts)) {
        if ((venueCosts[venue] || 0) + (cateringCosts[c] || 0) + (decorCosts[decor] || 0) <= budget) {
          suggestedCatering = c;
          break;
        }
      }
      // Find cheaper decor
      for (let d of Object.keys(decorCosts)) {
        if ((venueCosts[venue] || 0) + (cateringCosts[catering] || 0) + (decorCosts[d] || 0) <= budget) {
          suggestedDecor = d;
          break;
        }
      }

      return `⚠️ Your budget ₹${budget.toLocaleString()} is low for this selection (Estimated: ₹${totalEstimated.toLocaleString()}). Consider: Venue: ${suggestedVenue}, Catering: ${suggestedCatering}, Decor: ${suggestedDecor}.`;
    }
  };


  // Function to calculate budget split and proceed to summary
  const handleNext = () => {
  if (!venue || !catering || !decor) {
    alert("Please fill out all fields.");
    return;
  }

  let baseSplit = { venue: 40, catering: 35, decor: 15, entertainment: 10 };

  switch (theme) {
    case "Royal":
      baseSplit.decor += 5;
      baseSplit.catering -= 5;
      break;
    case "Beach":
      baseSplit.entertainment += 5;
      baseSplit.decor -= 5;
      break;
    case "Modern":
      baseSplit.venue += 5;
      baseSplit.catering -= 5;
      break;
    case "Traditional":
      baseSplit.catering += 5;
      baseSplit.venue -= 5;
      break;
    default:
      break;
  }

  const budgetSplit = {
    venue: (baseSplit.venue / 100) * budget,
    catering: (baseSplit.catering / 100) * budget,
    decor: (baseSplit.decor / 100) * budget,
    entertainment: (baseSplit.entertainment / 100) * budget,
  };

  const suggestion = getMockAISuggestion(theme, budget, guestCount, venue, catering, decor);

  setSummaryData({
    name: formData.name,
    budget,
    guests: guestCount,
    theme,
    venue,
    catering,
    decor,
    budgetSplit,
    suggestion,
  });

  setShowSummary(true);
};


return (
  <>
    {!showSummary ? (
      <div className="wedding-page">
        {/* Left Image */}
        <div className="image-container left">
          <img src={themeImages[theme][0]} alt={`${theme} Theme Left`} />
        </div>

        {/* Form Section */}
        <div className="wedding-form">
          <h1 className="wedding-heading">Wedding Details 💍</h1>
          <p className="wedding-subheading">
            Hi <strong>{formData.name}</strong>! Budget: ₹{budget.toLocaleString()}, Guests: {guestCount}.
          </p>

          <form>
            <label>Choose Wedding Theme:</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option>Royal</option>
              <option>Traditional</option>
              <option>Modern</option>
              <option>Beach</option>
            </select>

            <label>Select Venue:</label>
            <select value={venue} onChange={(e) => setVenue(e.target.value)}>
              <option value="">Select Venue</option>
              {venueOptions[theme].map((v, i) => (
                <option key={i}>{v}</option>
              ))}
            </select>

            <label>Catering Style:</label>
            <select value={catering} onChange={(e) => setCatering(e.target.value)}>
              <option value="">Select Catering</option>
              <option>Indian Traditional</option>
              <option>Continental</option>
              <option>Fusion</option>
            </select>

            <label>Decor Style:</label>
            <select value={decor} onChange={(e) => setDecor(e.target.value)}>
              <option value="">Select Decor</option>
              <option>Floral Royal</option>
              <option>Minimal Elegant</option>
              <option>Luxury Modern</option>
            </select>

            {/* Single Next Button */}
            <button type="button" className="wedding-submit" onClick={handleNext}>
              Next
            </button>
          </form>
        </div>

        {/* Right Image */}
        <div className="image-container right">
          <img src={themeImages[theme][1]} alt={`${theme} Theme Right`} />
        </div>
      </div>
    ) : (
      <Summary data={summaryData} />
    )}
  </>
);
}

