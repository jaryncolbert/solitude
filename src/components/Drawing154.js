import React, { Component } from 'react';
import P5Wrapper from './P5Wrapper';
import Sketch from './Sketch';
import Slider from './Slider';
import Checkbox from './Checkbox';
import { getRandomInt, getRandomBool,
  centerSquare, horizMidLine } from '../util';

class Drawing154 extends Component {

  static drawingId = "drawing-154";
  static initSquareSize = 300;
  static minSquareSize = 10;
  static maxSquareSize = 380;
  static minLineLen = 10;
  static canvasWidth = 600;
  static canvasHeight = 400;

  constructor(props) {
		super(props);

		this.state = {
			stateSketch: this.sketch,
      squareSize: Drawing154.initSquareSize,
      lineExtendsBeyondSquare: false,
      lineMax: Drawing154.initSquareSize,
      lineLen: getRandomInt(Drawing154.minLineLen, Drawing154.initSquareSize),
		};
	}

	lineLenChange(e) {
    let lineLen = Number(e.target.value);
		this.setState({lineLen: lineLen});
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
    let squareSize = getRandomInt(Drawing154.minSquareSize,
      Drawing154.maxSquareSize);

    this.setState(this.randomizeAndGetLineLen(squareSize, canExtend));
  }

  recalcMaxFromSquareSize(squareSize) {
    return (previousState, currentProps) => {
      return this.getState(squareSize,
        previousState.lineExtendsBeyondSquare, previousState.lineLen);
    };
  }

  recalcMaxFromCanExtend(canExtend) {
    return (previousState, currentProps) => {
      return this.getState(previousState.squareSize,
        canExtend, previousState.lineLen);
    }
  }

  calcLineMax(squareSize, canExtend) {
    const canvasMax = Drawing154.canvasWidth -
      ((Drawing154.canvasWidth - squareSize) / 2)
    return canExtend ? canvasMax : squareSize;
  }

  randomizeAndGetLineLen(squareSize, canExtend) {
    return (previousState, currentProps) => {

      // If line can extend beyond square, set its max to the full canvas width.
      // Otherwise, limit it to the size of the square
      let lineMax = this.calcLineMax(squareSize, canExtend);

      // Regenerate random line length using new maximum length
      let lineLen = getRandomInt(Drawing154.minLineLen, lineMax);

      return this.getState(squareSize, canExtend, lineLen);
    };
  }

  getState(squareSize, canExtend, lineLen) {
    // If line can extend beyond square, set its max to the full canvas width.
    // Otherwise, limit it to the size of the square
    let lineMax = this.calcLineMax(squareSize, canExtend);

    // If line extends beyond max, crop it to new max value
    if (lineLen > lineMax) {
      lineLen = lineMax;
    }

    return {
      lineMax: lineMax,
      lineLen: lineLen,
      squareSize: squareSize,
      lineExtendsBeyondSquare: canExtend
    };
  }

  render() {
    return (
      <div className="drawing-container">
        <P5Wrapper sketch={this.state.stateSketch}
          squareSize={this.state.squareSize}
          lineLen={this.state.lineLen}/>

        <Sketch drawingId={Drawing154.drawingId}
          instructions="A black outlined square with a red
          horizontal line from the midpoint of the left side toward the
          middle of the right side." year="1973"/>

        <Slider sliderId="lineLength"
          label="Line Length:"
          value={this.state.lineLen}
          changeHandler={this.lineLenChange.bind(this)}
          min={Drawing154.minLineLen} max={this.state.lineMax}/>

        <Slider sliderId="squareSize"
          label="Square Size:"
          value={this.state.squareSize}
          changeHandler={this.squareSizeChange.bind(this)}
          min={Drawing154.minSquareSize} max={Drawing154.maxSquareSize}/>

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
    let lineLen;

    p.setup = function () {
      var canvas = p.createCanvas(Drawing154.canvasWidth, Drawing154.canvasHeight);
      canvas.parent(Drawing154.drawingId);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        lineLen = props.lineLen;
        squareSize = props.squareSize;
    };

    p.draw = function () {

      p.clear();

      // Black square
      p.stroke(0,0,0);
      p.rect(...centerSquare(p.width, p.height, squareSize));

      // Red line of random length bisecting left side of square
      // and extending toward right side
      let canvasMidX = p.width / 2;
      let canvasMidY = p.height / 2;
      let squareX = canvasMidX - squareSize / 2;
      p.stroke(255,0,0);
      p.line(...horizMidLine(squareX, canvasMidY, lineLen));
    };
  }
}

export default Drawing154;
