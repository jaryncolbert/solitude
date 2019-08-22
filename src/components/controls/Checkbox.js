import React from "react";
import { toCamelCase } from "../util";

const Checkbox = ({ isSelected, changeHandler, label, className }) => {
  const checkboxId = toCamelCase(label);

  return (
    <div className={"checkbox-container form-check " + className}>
      <input
        className="form-check-input"
        type="checkbox"
        id={checkboxId}
        checked={isSelected}
        onChange={changeHandler}
      />
      <label className="form-check-label" htmlFor={checkboxId}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
