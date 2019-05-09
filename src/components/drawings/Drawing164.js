import React, { Component } from 'react';
import Sketch from '../Sketch';
import { Slider, Checkbox, RowGroup,
  withRandomizer, withDrawingContainer } from '../CommonComponents';
import { getRandomInt, getRandomBool, centerSquare, calcDiagLineMax,
  horizMidLineFrom, risingDiagMidLine } from '../util';

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

    let diagLineMax = calcDiagLineMax(Drawing164.canvasWidth,
      Drawing164.canvasHeight, Drawing164.initSquareSize, false);
		this.state = {
			stateSketch: this.sketch,
      squareSize: Drawing164.initSquareSize,
      lineExtendsBeyondSquare: false,
      scaleProportionally: false,
      horizLineMax: Drawing164.initSquareSize,
      horizLineLen: getRandomInt(Drawing164.minLineLen, Drawing164.initSquareSize),
      diagLineMax: diagLineMax,
      diagLineLen: getRandomInt(Drawing164.minLineLen, diagLineMax),
		};
	}

  componentDidMount() {
    this.props.randomizer(this.randomize);
  }

  diagLineLenChange(e) {
    let diagLineLen = Number(e.target.value);
		this.setState({diagLineLen: diagLineLen});
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

  toggleScaleProportionally(e) {
    this.setState({scaleProportionally: !!e.target.checked});
  }

  toggleLineExtension(e) {
    this.setLineExtension(!!e.target.checked);
  }

  setLineExtension(canExtend) {
    // Recalculate maximum line length based on update to line extension
    this.setState(this.recalcMaxFromCanExtend(canExtend));
  }

  randomize = () => {
    let canExtend = getRandomBool();
    let squareSize = getRandomInt(Drawing164.minSquareSize,
      Drawing164.maxSquareSize);

    this.setState(this.getRandomState(squareSize, canExtend));
  }

  recalcMaxFromSquareSize(squareSize) {
    return (previousState, currentProps) => {
      let horizLineLen = previousState.horizLineLen;
      let diagLineLen = previousState.diagLineLen;

      if (previousState.scaleProportionally) {
        // Maintain previous scale of lineLens to squareSize
        let prevDiagRatio = previousState.diagLineLen / previousState.squareSize;
        diagLineLen = Math.max(Math.round(prevDiagRatio * squareSize), Drawing164.minLineLen);
        let prevHorizRatio = previousState.horizLineLen / previousState.squareSize;
        horizLineLen = Math.max(Math.round(prevHorizRatio * squareSize), Drawing164.minLineLen);
      }

      return this.getState(squareSize,
        previousState.lineExtendsBeyondSquare,
        previousState.scaleProportionally,
        horizLineLen,
        diagLineLen);
    };
  }

  recalcMaxFromCanExtend(canExtend) {
    return (previousState, currentProps) => {
      return this.getState(previousState.squareSize,
        canExtend,
        previousState.scaleProportionally,
        previousState.horizLineLen,
        previousState.diagLineLen);
    }
  }

  calcHorizLineMax = (squareSize, canExtend) => {
    // If line can extend beyond square, set its max to the full canvas width.
    // Otherwise, limit it to the size of the square
    return canExtend ? Drawing164.canvasWidth : squareSize;
  }

  getRandomState = (squareSize, canExtend) => {
    return (previousState, currentProps) => {
      let horizLineMax = this.calcHorizLineMax(squareSize, canExtend);
      let horizLineLen = getRandomInt(Drawing164.minLineLen, horizLineMax);

      let diagLineMax = calcDiagLineMax(Drawing164.canvasWidth,
        Drawing164.canvasHeight, squareSize, canExtend);
      let diagLineLen = getRandomInt(Drawing164.minLineLen, diagLineMax);

      let scaled = getRandomBool();

      return this.getState(squareSize, canExtend, scaled, horizLineLen, diagLineLen);
    };
  }

  getState = (squareSize, canExtend, scaled, horizLineLen, diagLineLen) => {
    let horizLineMax = this.calcHorizLineMax(squareSize, canExtend);
    let diagLineMax = calcDiagLineMax(Drawing164.canvasWidth,
      Drawing164.canvasHeight,squareSize, canExtend);

    if (horizLineLen > horizLineMax) {
      horizLineLen = horizLineMax;
    }
    if (diagLineLen > diagLineMax) {
      diagLineLen = diagLineMax;
    }

    return {
      horizLineMax: horizLineMax,
      horizLineLen: horizLineLen,
      diagLineMax: diagLineMax,
      diagLineLen: diagLineLen,
      squareSize: squareSize,
      lineExtendsBeyondSquare: canExtend,
      scaleProportionally: scaled
    };
  }

  render() {
    return (
      <>
        <Sketch drawingId={Drawing164.drawingId}
          title="Wall Drawing 164"
          instructions="A black outlined square
          with a red horizontal line centered on the axis
          between the midpoint of the left side
          and the midpoint of the right side
          and a red diagonal line centered on the axis
          between the lower left and upper right corners."
          year="1973"
          sketch={this.state.stateSketch}
          squareSize={this.state.squareSize}
          horizLineLen={this.state.horizLineLen}
          diagLineLen={this.state.diagLineLen}/>

        <RowGroup>
          <Slider sliderId="horizLineLen"
            label="Line Length (Horiz):"
            value={this.state.horizLineLen}
            changeHandler={this.horizLineLenChange.bind(this)}
            min={Drawing164.minLineLen} max={this.state.horizLineMax}/>
          <Slider sliderId="diagLineLen"
            label="Line Length (Diag):"
            value={this.state.diagLineLen}
            changeHandler={this.diagLineLenChange.bind(this)}
            min={Drawing164.minLineLen} max={this.state.diagLineMax}/>
          <Slider sliderId="squareSize"
            label="Square Size:"
            value={this.state.squareSize}
            changeHandler={this.squareSizeChange.bind(this)}
            min={Drawing164.minSquareSize} max={Drawing164.maxSquareSize}/>
        </RowGroup>

        <RowGroup>
          <Checkbox
            label="Can lines extend beyond square?"
            isSelected={this.state.lineExtendsBeyondSquare}
            changeHandler={this.toggleLineExtension.bind(this)}
            id="extension"/>
          <Checkbox
            label="Scale square proportionally?"
            isSelected={this.state.scaleProportionally}
            changeHandler={this.toggleScaleProportionally.bind(this)}
            id="scale"/>
        </RowGroup>
      </>
    );
  }

  sketch (p) {
    // User-variable properties
    let squareSize;
    let horizLineLen;
    let diagLineLen;

    p.setup = function () {
      var canvas = p.createCanvas(Drawing164.canvasWidth, Drawing164.canvasHeight);
      canvas.parent(Drawing164.drawingId);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        horizLineLen = props.horizLineLen;
        diagLineLen = props.diagLineLen;
        squareSize = props.squareSize;
    };

    p.draw = function () {

      p.clear();

      // Black square
      p.stroke(0,0,0);
      p.rect(...centerSquare(p.width, p.height, squareSize));

      // Two red lines of random length; one centered along diagonal midpoint
      // and the other centered along horizontal midpoint
      let canvasMidX = p.width / 2;
      let canvasMidY = p.height / 2;
      let horizLineStartX = canvasMidX - horizLineLen / 2;
      p.stroke(255,0,0);
      p.line(...horizMidLineFrom(horizLineStartX, canvasMidY, horizLineLen));
      p.line(...risingDiagMidLine(canvasMidX, canvasMidY, diagLineLen));
    };
  }
}

export default withDrawingContainer(withRandomizer(Drawing164));
