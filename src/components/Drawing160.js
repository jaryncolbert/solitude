import React, { Component } from 'react';
import P5Wrapper from './P5Wrapper';
import Sketch from './Sketch';
import Slider from './Slider';
import Checkbox from './Checkbox';
import { getRandomInt, getRandomBool, centerSquare, calcDiagLineMax,
  risingDiagMidLine, fallingDiagMidLine } from '../util';

class Drawing160 extends Component {

  static drawingId = "drawing-160";
  static initSquareSize = 300;
  static minSquareSize = 10;
  static maxSquareSize = 380;
  static minLineLen = 5;
  static canvasWidth = 600;
  static canvasHeight = 400;

  constructor(props) {
		super(props);

    let lineMax = calcDiagLineMax(Drawing160.canvasWidth,
      Drawing160.canvasHeight, Drawing160.initSquareSize, false);
		this.state = {
			stateSketch: this.sketch,
      squareSize: Drawing160.initSquareSize,
      lineExtendsBeyondSquare: false,
      lineMax: lineMax,
      fallLineLen: getRandomInt(Drawing160.minLineLen, lineMax),
      riseLineLen: getRandomInt(Drawing160.minLineLen, lineMax),
		};
	}

  riseLineLenChange(e) {
    let riseLineLen = Number(e.target.value);
		this.setState({riseLineLen: riseLineLen});
	}

	fallLineLenChange(e) {
    let fallLineLen = Number(e.target.value);
		this.setState({fallLineLen: fallLineLen});
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
    let squareSize = getRandomInt(Drawing160.minSquareSize,
      Drawing160.maxSquareSize);

    this.setState(this.getRandomState(squareSize, canExtend));
  }

  recalcMaxFromSquareSize(squareSize) {
    return (previousState, currentProps) => {
      return this.getState(squareSize,
        previousState.lineExtendsBeyondSquare,
        previousState.fallLineLen,
        previousState.riseLineLen);
    };
  }

  recalcMaxFromCanExtend(canExtend) {
    return (previousState, currentProps) => {
      return this.getState(previousState.squareSize,
        canExtend,
        previousState.fallLineLen,
        previousState.riseLineLen);
    }
  }

  getRandomState(squareSize, canExtend) {
    return (previousState, currentProps) => {
      let lineMax = calcDiagLineMax(Drawing160.canvasWidth,
        Drawing160.canvasHeight, squareSize, canExtend);
      let fallLineLen = getRandomInt(Drawing160.minLineLen, lineMax);
      let riseLineLen = getRandomInt(Drawing160.minLineLen, lineMax);

      return this.getState(squareSize, canExtend, fallLineLen, riseLineLen);
    };
  }

  getState(squareSize, canExtend, fallLineLen, riseLineLen) {
    let lineMax = calcDiagLineMax(Drawing160.canvasWidth,
      Drawing160.canvasHeight, squareSize, canExtend);

    if (fallLineLen > lineMax) {
      fallLineLen = lineMax;
    }
    if (riseLineLen > lineMax) {
      riseLineLen = lineMax;
    }

    return {
      lineMax: lineMax,
      fallLineLen: fallLineLen,
      riseLineLen: riseLineLen,
      squareSize: squareSize,
      lineExtendsBeyondSquare: canExtend
    };
  }

  render() {
    return (
      <div className="drawing-container col">
        <P5Wrapper sketch={this.state.stateSketch}
          squareSize={this.state.squareSize}
          fallLineLen={this.state.fallLineLen}
          riseLineLen={this.state.riseLineLen}/>

        <Sketch drawingId={Drawing160.drawingId}
          title="Wall Drawing 160"
          instructions="A black outlined square
          with a red diagonal line
          centered on the axis
          between the upper left and lower right corners
          and another red diagonal line
          centered on the axis
          between the lower left and upper right corners." year="1973"/>

        <div className="row">
          <div className="col">
            <Slider sliderId="fallLineLen"
              label="Line Length (Falling Line):"
              value={this.state.fallLineLen}
              changeHandler={this.fallLineLenChange.bind(this)}
              min={Drawing160.minLineLen} max={this.state.lineMax}/>
          </div>
          <div className="col">
            <Slider sliderId="riseLineLen"
              label="Line Length (Rising Line):"
              value={this.state.riseLineLen}
              changeHandler={this.riseLineLenChange.bind(this)}
              min={Drawing160.minLineLen} max={this.state.lineMax}/>
          </div>
          <div className="col">
            <Slider sliderId="squareSize"
              label="Square Size:"
              value={this.state.squareSize}
              changeHandler={this.squareSizeChange.bind(this)}
              min={Drawing160.minSquareSize} max={Drawing160.maxSquareSize}/>
          </div>
        </div>

        <Checkbox
          label="Can lines extend beyond square?"
          isSelected={this.state.lineExtendsBeyondSquare}
          changeHandler={this.toggleLineExtension.bind(this)}
          id="extension"/>

        <button onClick={() => this.randomize()}
          className="btn btn-primary">Randomize</button>
      </div>
    );
  }

  sketch (p) {
    // User-variable properties
    let squareSize;
    let fallLineLen;
    let riseLineLen;

    p.setup = function () {
      var canvas = p.createCanvas(Drawing160.canvasWidth, Drawing160.canvasHeight);
      canvas.parent(Drawing160.drawingId);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        fallLineLen = props.fallLineLen;
        riseLineLen = props.riseLineLen;
        squareSize = props.squareSize;
    };

    p.draw = function () {

      p.clear();

      // Black square
      p.stroke(0,0,0);
      p.rect(...centerSquare(p.width, p.height, squareSize));

      // Two red diagonal lines of random length centered along midpoint line
      let canvasMidX = p.width / 2;
      let canvasMidY = p.height / 2;
      p.stroke(255,0,0);
      p.line(...fallingDiagMidLine(canvasMidX, canvasMidY, fallLineLen));
      p.line(...risingDiagMidLine(canvasMidX, canvasMidY, riseLineLen));
    };
  }
}

export default Drawing160;
