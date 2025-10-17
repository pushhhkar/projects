import React from "react";

export default function OptimizeButton() {
  const handleClick = () => {
    alert("AI Optimization coming soon 🤖");
  };

  return (
    <button className="button" onClick={handleClick}>
      Optimize Budget 💡
    </button>
  );
}