import React from 'react';

function Slider(props) {
  return (
    <div className="slider-container">
      <label htmlFor={props.sliderId}>{props.label}</label>
      <input type="range" min={props.min}  max={props.max} step="1"
        value={props.value} id={props.sliderId}
        onChange={props.changeHandler}/>
      <div>{props.value}</div>
    </div>
  );
}

export default Slider;
