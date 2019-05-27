import React from 'react';
import { Canvas, Square, Line, Point } from '../Shapes';
import { Button, Slider, Checkbox, RowGroup } from '../CommonComponents';
import { getMidpoint, getRandomInt, getRandomBool } from '../util';


export class Drawing154 extends React.Component {
  canvasWidth = 600;
  canvasHeight = 400;
  midpoint = getMidpoint(0, 0, this.canvasWidth, this.canvasHeight);
  minLen = 5;

  constructor(props) {
    super(props);

    const initialSquare = 300;

    this.state = {
      randomized: false,
      lineMax: initialSquare,
      lineStart: new Point(0, 0),
      // Initial state of sliders
      lineLen: getRandomInt(this.minLen, initialSquare),
      sideLen: initialSquare,
      // Initial state of checkboxes
      canExtend: false,
      scaled: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const prevLineLen = prevState.lineLen;
    const prevSideLen = prevState.sideLen;
    const prevLineMax = prevState.lineMax;
    const prevLineStart = prevState.lineStart;
    const prevSquareExtent = prevState.squareExtent;
    const prevRandomized = prevState.randomized;
    let { lineMax, lineStart, lineLen, sideLen, squareExtent,
      canExtend, scaled, randomized } = this.state;

    lineMax = this.getLineMax();
    if (randomized &&
      (prevLineStart !== lineStart || prevSquareExtent !== squareExtent)) {
      // If trigger is set to randomize, generate new value for lineLen
      lineLen = getRandomInt(this.minLen, lineMax);
      randomized = false;
    } else {
      if (scaled && (lineLen !== prevLineLen || sideLen !== prevSideLen)) {
        // Maintain previous scale of lineLen to squareSize
        const prevRatio = prevLineLen / prevSideLen;
        lineLen = Math.max(Math.round(prevRatio * sideLen), this.minLen);
      }
      if (lineLen > lineMax) {
        lineLen = lineMax;
      }
    }

    if (lineMax !== prevLineMax || lineLen !== prevLineLen ||
        randomized !== prevRandomized) {
      this.setState({
        lineMax: lineMax,
        lineLen: lineLen,
        randomized: randomized,
      });
    }
  }

  setSquareExtent = (point) => {
    // Signifies the max x value of the square (its right side)
    this.setState({
      squareExtent: point.x
    });
  }

  setLineStart = (point) => {
    this.setState({
      lineStart: point
    });
  }

  setTargetValue = (e, propName) => {
    this.setState({
      [propName]: Number(e.target.value)
    });
  }

  toggleValue = (e, propName) => {
    this.setState({
      [propName]: !!(e.target.checked)
    });
  }

  randomize = () => {
    this.setState({
      randomized: true,
      sideLen: getRandomInt(this.minLen, this.canvasHeight),
      scaled: getRandomBool(),
      canExtend: getRandomBool(),
    });
  }

  getLineMax = () => {
    let { lineStart, squareExtent, canExtend } = this.state;

    const extent = canExtend ? this.canvasWidth : squareExtent;
    return extent - lineStart.x;
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
    const { lineMax, lineStart, lineLen, sideLen,
      canExtend, scaled } = this.state;

    const lineEndX = Number(lineStart.x + lineLen);
    const lineEnd = new Point(lineEndX, lineStart.y);

    return (<>
      <Canvas canvasWidth={this.canvasWidth} canvasHeight={this.canvasHeight}>
        <Square start={this.midpoint} centered sideLen={sideLen}
          targetPoints={this.getTargetPoints()}/>
        <Line start={lineStart} end={lineEnd} color={"#FF0000"}/>
      </Canvas>

      <RowGroup>
        <Slider label="Square Size:"
          value={sideLen}
          changeHandler={(e) => this.setTargetValue(e, "sideLen")}
          min={this.minLen} max={this.canvasHeight}/>
        <Slider label="Line Length:"
          value={lineLen}
          changeHandler={(e) => this.setTargetValue(e, "lineLen")}
          min={this.minLen} max={lineMax}/>
      </RowGroup>

      <RowGroup>
        <Checkbox label="Can line extend beyond square?"
          isSelected={canExtend}
          changeHandler={(e) => this.toggleValue(e, "canExtend")}/>
        <Checkbox label="Scale square proportionally?"
          isSelected={scaled}
          changeHandler={(e) => this.toggleValue(e, "scaled")}/>
      </RowGroup>

      <Button onClick={this.randomize}/>
    </>)
  }
}
