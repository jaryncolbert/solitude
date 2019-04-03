import React from 'react';

function Sketch({ drawingId, instructions, year }) {
  return (
    <>
      <div className="sketch-container" id={drawingId}></div>
      <p className="sketch-instructions">{instructions}
        <span className="year">({year})</span></p>
    </>
  );
}

export default Sketch;
