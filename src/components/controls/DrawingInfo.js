import React from "react";

const DrawingInfo = ({ title, instructions, year, titleOnly }) => (
  <div className="sketch">
    <h2 className="sketch-title">{title}</h2>
    {!titleOnly && (
      <p className="sketch-instructions">
        {instructions}
        <span className="sketch-year">({year})</span>
      </p>
    )}
  </div>
);

export default DrawingInfo;
