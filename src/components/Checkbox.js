import React from 'react';

function Checkbox({ isSelected, changeHandler, checkboxId, label }) {
  return (
    <div className="checkbox-container form-check">
      <input className="form-check-input"
        type="checkbox"
        id={checkboxId}
        checked={isSelected}
        onChange={changeHandler}/>
      <label className="form-check-label" htmlFor={checkboxId}>{label}</label>
    </div>
  );
}

export default Checkbox;
