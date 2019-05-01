import React, { Component } from 'react';
import P5Wrapper from './P5Wrapper';
import Sketch from './Sketch';
import Slider from './Slider';
import Checkbox from './Checkbox';
import { getRandomInt, getRandomBool } from '../util';

class Drawing164 extends Component {

  static drawingId = "drawing-164";
  static initSquareSize = 300;
  static minSquareSize = 10;
  static maxSquareSize = 380;
  static minLineLen = 5;
  static canvasWidth = 600;
  static canvasHeight = 400;

  constructor(props) {
		super(props);

		this.state = {
			stateSketch: this.sketch,
      squareSize: Drawing164.initSquareSize,
      lineExtendsBeyondSquare: false,
      lineMax: Drawing164.initSquareSize,
      horizLineLen: getRandomInt(Drawing164.minLineLen, Drawing164.initSquareSize),
		};
	}

	horizLineLenChange(e) {
    let horizLineLen = Number(e.target.value);
		this.setState({horizLineLen: horizLineLen});
	}

  squareSizeChange(e) {
    let squareSize = Number(e.target.value);

    // Recalculate maximum line length based on updates to square size
    this.setState(this.recalcMaxFromSquareSize(squareSize));
	}

  toggleLineExtension(e) {
    this.setLineExtension(!!e.target.checked);
  }

  setLineExtension(canExtend) {
    // Recalculate maximum line length based on update to line extension
    this.setState(this.recalcMaxFromCanExtend(canExtend));
  }

  randomize() {
    let canExtend = getRandomBool();
    let squareSize = getRandomInt(Drawing164.minSquareSize,
      Drawing164.maxSquareSize);

    this.setState(this.randomizeAndGethorizLineLen(squareSize, canExtend));
  }

  recalcMaxFromSquareSize(squareSize) {
    return (previousState, currentProps) => {
      return this.getState(squareSize,
        previousState.lineExtendsBeyondSquare, previousState.horizLineLen);
    };
  }

  recalcMaxFromCanExtend(canExtend) {
    return (previousState, currentProps) => {
      return this.getState(previousState.squareSize,
        canExtend, previousState.horizLineLen);
    }
  }

  calcLineMax(squareSize, canExtend) {
    const canvasMax = Drawing164.canvasWidth -
      ((Drawing164.canvasWidth - squareSize) / 2)
    return canExtend ? canvasMax : squareSize;
  }

  randomizeAndGethorizLineLen(squareSize, canExtend) {
    return (previousState, currentProps) => {

      // If line can extend beyond square, set its max to the full canvas width.
      // Otherwise, limit it to the size of the square
      let lineMax = this.calcLineMax(squareSize, canExtend);

      // Regenerate random line length using new maximum length
      let horizLineLen = getRandomInt(Drawing164.minLineLen, lineMax);

      return this.getState(squareSize, canExtend, horizLineLen);
    };
  }

  getState(squareSize, canExtend, horizLineLen) {
    // If line can extend beyond square, set its max to the full canvas width.
    // Otherwise, limit it to the size of the square
    let lineMax = this.calcLineMax(squareSize, canExtend);

    // If line extends beyond max, crop it to new max value
    if (horizLineLen > lineMax) {
      horizLineLen = lineMax;
    }

    return {
      lineMax: lineMax,
      horizLineLen: horizLineLen,
      squareSize: squareSize,
      lineExtendsBeyondSquare: canExtend
    };
  }

  render() {
    return (
      <div className="drawing-container">
        <P5Wrapper sketch={this.state.stateSketch}
          squareSize={this.state.squareSize}
          horizLineLen={this.state.horizLineLen}/>

        <Sketch drawingId={Drawing164.drawingId}
          instructions="A black outlined square
          with a red horizontal line centered on the axis
          between the midpoint of the left side
          and the midpoint of the right side
          and a red diagonal line centered on the axis
          between the lower left and upper right corners." year="1973"/>

        <Slider sliderId="horizLineLen"
          label="Line Length:"
          value={this.state.horizLineLen}
          changeHandler={this.horizLineLenChange.bind(this)}
          min="0" max={this.state.lineMax}/>

        <Slider sliderId="squareSize"
          label="Square Size:"
          value={this.state.squareSize}
          changeHandler={this.squareSizeChange.bind(this)}
          min="10" max={Drawing164.maxSquareSize}/>

        <Checkbox
          label="Can line extend beyond square?"
          isSelected={this.state.lineExtendsBeyondSquare}
          changeHandler={this.toggleLineExtension.bind(this)}
          id="extension"/>

          <button onClick={() => this.randomize()}>Randomize</button>
      </div>
    );
  }

  sketch (p) {
    // User-variable properties
    let squareSize;
    let horizLineLen;

    p.setup = function () {
      var canvas = p.createCanvas(Drawing164.canvasWidth, Drawing164.canvasHeight);
      canvas.parent(Drawing164.drawingId);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        horizLineLen = props.horizLineLen;
        squareSize = props.squareSize;
    };

    p.draw = function () {
      let midpoint = squareSize / 2;
      let squareX = (p.width - squareSize) / 2;
      let squareY = (p.height - squareSize) / 2;

      let horizLineStartX = squareX + ((squareSize - horizLineLen) / 2);

      p.clear();

      // Black square
      p.stroke(0,0,0);
      p.rect(squareX, squareY, squareSize, squareSize);

      // Red line of random length along midpoint line
      p.stroke(255,0,0);
      p.line(horizLineStartX, squareY + midpoint,
        horizLineStartX + horizLineLen, squareY + midpoint);
    };
  }
}

export default Drawing164;
