import React from 'react';
import { Canvas, Square, Line, Point } from '../Shapes';
import { Button, Slider, Checkbox, RowGroup } from '../CommonComponents';
import { getMidpoint, getRandomInt } from '../util';


export class Drawing154 extends React.Component {
  canvasWidth = 600;
  canvasHeight = 400;
  midpoint = getMidpoint(0, 0, this.canvasWidth, this.canvasHeight);
  minLen = 5;

  constructor(props) {
    super(props);

    const initialSquare = 300;

    this.state = {
      lineMax: initialSquare,
      lineStart: new Point(0, 0),
      // Initial state of sliders
      lineLen: getRandomInt(this.minLen, initialSquare),
      sideLen: initialSquare,
      // Initial state of checkboxes
      canExtend: false,
      scaled: true,
    };
  }

  setSquareExtent = (point) => {
    // Signifies the max x value of the square (its right side)
    this.setState({
      squareExtent: point.x
    }, () => this.updateStateDependencies());
  }

  setLineStart = (point) => {
    this.setState({
      lineStart: point
    }, () => this.updateStateDependencies());
  }

  setTargetValue = (e, propName) => {
    this.setState({
      [propName]: Number(e.target.value)
    }, () => this.updateStateDependencies());
  }

  toggleValue = (e, propName) => {
    this.setState({
      [propName]: !!(e.target.checked)
    }, () => this.updateStateDependencies());
  }

  randomize = () => {
    const lineMax = this.getLineMax();

    this.setState({
      lineLen: getRandomInt(this.minLen, lineMax),
      sideLen: getRandomInt(this.minLen, this.canvasHeight)
    }, () => this.updateStateDependencies());
  }

  updateStateDependencies = () => {
    const lineMax = this.getLineMax();
    let trimLine = !this.state.canExtend && this.state.lineLen > lineMax;

    this.setState({
      lineMax: lineMax,
      lineLen: trimLine ? lineMax : this.state.lineLen,
    });
  }

  getLineMax = () => {
    const extent = this.state.canExtend ?
      this.canvasWidth : this.state.squareExtent;
    return extent - this.state.lineStart.x;
  };

  // Save coordinates for mid left and mid right of square
  getTargetPoints = () => {
    return [{
      target: Square.Points.MID_LEFT,
      callback: this.setLineStart
    },
    {
      target: Square.Points.MID_RIGHT,
      callback: this.setSquareExtent
    }];
  }

  render() {
    const lineEndX = Number(this.state.lineStart.x + this.state.lineLen);
    const lineEnd = new Point(lineEndX, this.state.lineStart.y);

    return (<>
      <Canvas canvasWidth={this.canvasWidth} canvasHeight={this.canvasHeight}>
        <Square start={this.midpoint} centered sideLen={this.state.sideLen}
          targetPoints={this.getTargetPoints()}/>
        <Line start={this.state.lineStart} end={lineEnd} color={"#FF0000"}/>
      </Canvas>

      <RowGroup>
        <Slider label="Square Size:"
          value={this.state.sideLen}
          changeHandler={(e) => this.setTargetValue(e, "sideLen")}
          min={this.minLen} max={this.canvasHeight}/>
        <Slider label="Line Length:"
          value={this.state.lineLen}
          changeHandler={(e) => this.setTargetValue(e, "lineLen")}
          min={this.minLen} max={this.state.lineMax}/>
      </RowGroup>

      <RowGroup>
        <Checkbox label="Can line extend beyond square?"
          isSelected={this.state.canExtend}
          changeHandler={(e) => this.toggleValue(e, "canExtend")}/>
        <Checkbox label="Scale square proportionally?"
          isSelected={this.state.scaled}
          changeHandler={(e) => this.toggleValue(e, "scaled")}/>
      </RowGroup>

      <Button onClick={this.randomize}/>
    </>)
  }
}
