import React from "react";

const Button = ({ onClick, text }) => (
  <button onClick={onClick} className="btn btn-primary">
    {text || "Randomize"}
  </button>
);

export default Button;
