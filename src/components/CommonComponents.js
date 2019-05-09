import React from 'react';

export function withDrawingContainer(Component) {
  return class WithDrawingContainer extends React.Component {
    render() {
      return (
        <div className="drawing-container col">
          <Component {...this.props}/>
        </div>
      );
    }
  }
}

export function withRandomizer(Component) {
  return class WithRandomizer extends React.Component {
    render() {
      return (
        <>
          <Component randomizer={click => this.randomizer = click}
            {...this.props}/>
          <button onClick={() => this.randomizer()}
            className="btn btn-primary">Randomize</button>
        </>
      );
    }
  }
}

export class RowGroup extends React.Component {
  render() {
    return (
      <div className="row">
        {this.props.children.map((c, i) =>
          <div className="col" key={"col-" + i}>
            {c}
          </div>
        )}

      </div>
    );
  }
}

export function Slider(props) {
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

export function Checkbox({ isSelected, changeHandler, checkboxId, label }) {
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
