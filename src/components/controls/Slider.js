import React from "react";
import { toCamelCase } from "../util";

const Slider = props => {
  const sliderId = toCamelCase(props.label);

  return (
    <div className={"slider-container form-group " + props.className}>
      <label htmlFor={sliderId}>{props.label}</label>
      <input
        className="form-control-range"
        type="range"
        min={props.min}
        max={props.max}
        step="1"
        value={props.value}
        id={sliderId}
        onChange={props.changeHandler}
      />
      <output className="slider-output">{props.value}</output>
    </div>
  );
};

export default Slider;
