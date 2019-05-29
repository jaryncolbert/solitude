import React from "react";
import { toCamelCase } from "./util";

export const DrawingContainer = ({ children, className }) => (
  <div
    className={
      className ? "drawing-container " + className : "drawing-container"
    }
  >
    {children}
  </div>
);

export const Button = ({ onClick, text }) => (
  <button onClick={onClick} className="btn btn-primary">
    {text || "Randomize"}
  </button>
);

export const DrawingInfo = ({ title, instructions, year }) => (
  <div className="sketch">
    <h2 className="sketch-title">{title}</h2>
    <p className="sketch-instructions">
      {instructions}
      <span className="sketch-year">({year})</span>
    </p>
  </div>
);

export class RowGroup extends React.Component {
  render() {
    return (
      // Surround element with 'row' div and add 'col' class to existing elem
      <div className="row">
        {this.props.children.map((c, i) =>
          React.cloneElement(c, {
            className: c.props.className ? c.props.className + " col" : "col",
            key: "col-" + i
          })
        )}
      </div>
    );
  }
}

export function Slider(props) {
  const sliderId = toCamelCase(props.label);
  return (
    <div className={"slider-container form-group " + props.className}>
      <label htmlFor={sliderId}>{props.label}</label>
      <output className="slider-output">{props.value}</output>
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
    </div>
  );
}

export function Checkbox({ isSelected, changeHandler, label, className }) {
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
}
