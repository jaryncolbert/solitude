import React from 'react';

function Checkbox({ isSelected, changeHandler, checkboxId, label }) {
  return (
    <div className="checkbox-container">
      <label htmlFor={checkboxId}>{label}</label>
      <input
        type="checkbox"
        name={checkboxId}
        checked={isSelected}
        onChange={changeHandler}>
      </input>
    </div>
  );
}

export default Checkbox;
