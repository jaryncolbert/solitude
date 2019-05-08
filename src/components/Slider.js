import React from 'react';

function Slider(props) {
  return (
    <div className="slider-container form-group">
      <label htmlFor={props.sliderId}>{props.label}</label>
      <output className="slider-output">{props.value}</output>
      <input className="form-control-range"
        type="range"
        min={props.min}  max={props.max} step="1"
        value={props.value}
        id={props.sliderId}
        onChange={props.changeHandler}/>
    </div>
  );
}

export default Slider;
