import React from 'react';

export function withDrawingContainer(Component) {
  return class WithDrawingContainer extends React.Component {
    render() {
      const { className, ...otherProps } = this.props;
      return (
        <div className={"drawing-container " + className}>
          <Component {...otherProps}/>
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
  return (
    <div className={"slider-container form-group " + props.className}>
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

export function Checkbox({ isSelected, changeHandler, checkboxId, label, className }) {
  return (
    <div className={"checkbox-container form-check " + className}>
      <input className="form-check-input"
        type="checkbox"
        id={checkboxId}
        checked={isSelected}
        onChange={changeHandler}/>
      <label className="form-check-label" htmlFor={checkboxId}>{label}</label>
    </div>
  );
}
