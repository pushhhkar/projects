import React from "react";
import "../styles/Wedding.css"; // Reuse the same styles

export default function Summary({ data }) {
  const { theme, venue, catering, decor, budgetSplit, suggestion, name, budget, guests } = data;

  // Theme images
  const themeImages = {
    Royal: ["/themes/royal.jpg", "/themes/royal2.jpg"],
    Traditional: ["/themes/traditional.jpg", "/themes/traditional2.jpg"],
    Modern: ["/themes/modern.jpg", "/themes/modern2.jpg"],
    Beach: ["/themes/beach.jpg", "/themes/beach2.jpg"],
  };

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
    "Indian Traditional": 1000 * guests,
    "Continental": 1200 * guests,
    "Fusion": 1500 * guests,
  };

  const decorCosts = {
    "Floral Royal": 50000,
    "Minimal Elegant": 30000,
    "Luxury Modern": 60000,
  };

  const totalCost =
    (venueCosts[venue] || 0) +
    (cateringCosts[catering] || 0) +
    (decorCosts[decor] || 0);

  // Function to suggest alternative based on budget
  const getSmartSuggestion = (selected, costs) => {
    const selectedCost = costs[selected] || 0;

    if (selectedCost > budget) {
      // Suggest lower-cost option
      for (let option of Object.keys(costs)) {
        if (costs[option] <= budget) return option;
      }
      return "Not Available";
    } else {
      // Suggest higher-cost option if possible
      let betterOption = selected;
      for (let option of Object.keys(costs)) {
        if (costs[option] > selectedCost && costs[option] <= budget) {
          betterOption = option;
        }
      }
      return betterOption;
    }
  };

  const alternative = {
    venue: getSmartSuggestion(venue, venueCosts),
    catering: getSmartSuggestion(catering, cateringCosts),
    decor: getSmartSuggestion(decor, decorCosts),
  };

  return (
    <div className="wedding-page">
      {/* Left Image */}
      <div className="image-container left">
        <img src={themeImages[theme][0]} alt={`${theme} Theme Left`} />
      </div>

      {/* Summary Section */}
      <div className="wedding-form center-box">
        <h1 className="wedding-heading">Wedding Summary 💍</h1>
        <p className="wedding-subheading">
          Hi <strong>{name}</strong>! Budget: ₹{budget.toLocaleString()}, Guests: {guests}.
        </p>

        <div className="summary-section">
          <h3>Selected Theme: {theme}</h3>
          <p>Venue: {venue}</p>
          <p>Catering: {catering}</p>
          <p>Decor: {decor}</p>
        </div>

        {/* Budget Split */}
        <div className="budget-breakdown">
          <h3>💰 Suggested Budget Split:</h3>
          <ul>
            <li>Venue: ₹{Math.round(budgetSplit.venue).toLocaleString()}</li>
            <li>Catering: ₹{Math.round(budgetSplit.catering).toLocaleString()}</li>
            <li>Decor: ₹{Math.round(budgetSplit.decor).toLocaleString()}</li>
            <li>Entertainment: ₹{Math.round(budgetSplit.entertainment).toLocaleString()}</li>
          </ul>
        </div>

        {/* AI Suggestion */}
        <div className="ai-suggestion">
          <h3>💡 AI Suggestion</h3>
          <p>
            {totalCost > budget
              ? `⚠️ Your selection exceeds the budget. Consider these alternatives:`
              : `🎉 Your selection is within budget! You could even upgrade to:`}
          </p>

          <div className="alternative-suggestions">
            <p>Venue: {alternative.venue}</p>
            <p>Catering: {alternative.catering}</p>
            <p>Decor: {alternative.decor}</p>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="image-container right">
        <img src={themeImages[theme][1]} alt={`${theme} Theme Right`} />
      </div>
    </div>
  );
}


