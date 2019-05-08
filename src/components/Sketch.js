import React from 'react';

function Sketch({ drawingId, title, instructions, year }) {
  return (
    <div className="sketch">
      <h2 className="sketch-title">{title}</h2>
      <div className="sketch-container" id={drawingId}></div>
      <p className="sketch-instructions">{instructions}
        <span className="sketch-year">({year})</span></p>
    </div>
  );
}

export default Sketch;
