import React from 'react';

function Sketch({ drawingId, title, instructions, year }) {
  return (
    <>
      <div className="sketch-container" id={drawingId}></div>
      <div className="sketch-title">{title}</div>
      <p className="sketch-instructions">{instructions}
        <span className="year">({year})</span></p>
    </>
  );
}

export default Sketch;
