import React, { Component } from 'react';
import Sketch from '../Sketch';
import SquareDrawings from './SquareDrawings';
import { Slider, Checkbox, RowGroup,
  withRandomizer, withDrawingContainer } from '../CommonComponents';
import { getRandomInt, getRandomBool, centerSquare, calcDiagLineMax,
  risingDiagMidLine, fallingDiagMidLine } from '../util';

class Drawing160 extends Component {

  static drawingId = "drawing-160";

  constructor(props) {
		super(props);

    let lineMax = calcDiagLineMax(SquareDrawings.canvasWidth,
      SquareDrawings.canvasHeight, SquareDrawings.initSquareSize, false);
		this.state = {
			stateSketch: this.sketch,
      squareSize: SquareDrawings.initSquareSize,
      lineExtendsBeyondSquare: false,
      scaleProportionally: false,
      lineMax: lineMax,
      fallLineLen: getRandomInt(SquareDrawings.minLineLen, lineMax),
      riseLineLen: getRandomInt(SquareDrawings.minLineLen, lineMax),
		};
	}

  componentDidMount() {
    this.props.randomizer(this.randomize);
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
    let squareSize = getRandomInt(SquareDrawings.minSquareSize,
      SquareDrawings.maxSquareSize);

    this.setState(this.getRandomState(squareSize, canExtend));
  }

  recalcMaxFromSquareSize(squareSize) {
    return (previousState, currentProps) => {
      let fallLineLen = previousState.fallLineLen;
      let riseLineLen = previousState.riseLineLen;

      if (previousState.scaleProportionally) {
        // Maintain previous scale of lineLens to squareSize
        let prevRiseRatio = previousState.riseLineLen / previousState.squareSize;
        riseLineLen = Math.max(Math.round(prevRiseRatio * squareSize), SquareDrawings.minLineLen);
        let prevFallRatio = previousState.fallLineLen / previousState.squareSize;
        fallLineLen = Math.max(Math.round(prevFallRatio * squareSize), SquareDrawings.minLineLen);
      }

      return this.getState(squareSize,
        previousState.lineExtendsBeyondSquare,
        previousState.scaleProportionally,
        fallLineLen,
        riseLineLen);
    };
  }

  recalcMaxFromCanExtend(canExtend) {
    return (previousState, currentProps) => {
      return this.getState(previousState.squareSize,
        canExtend,
        previousState.scaleProportionally,
        previousState.fallLineLen,
        previousState.riseLineLen);
    }
  }

  getRandomState = (squareSize, canExtend) => {
    return (previousState, currentProps) => {
      let lineMax = calcDiagLineMax(SquareDrawings.canvasWidth,
        SquareDrawings.canvasHeight, squareSize, canExtend);
      let fallLineLen = getRandomInt(SquareDrawings.minLineLen, lineMax);
      let riseLineLen = getRandomInt(SquareDrawings.minLineLen, lineMax);
      let scaled = getRandomBool();

      return this.getState(squareSize, canExtend, scaled, fallLineLen, riseLineLen);
    };
  }

  getState = (squareSize, canExtend, scaled, fallLineLen, riseLineLen) => {
    let lineMax = calcDiagLineMax(SquareDrawings.canvasWidth,
      SquareDrawings.canvasHeight, squareSize, canExtend);

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
      lineExtendsBeyondSquare: canExtend,
      scaleProportionally: scaled
    };
  }

  render() {
    return (
      <>
        <Sketch drawingId={Drawing160.drawingId}
          title="Wall Drawing 160"
          instructions="A black outlined square
          with a red diagonal line
          centered on the axis
          between the upper left and lower right corners
          and another red diagonal line
          centered on the axis
          between the lower left and upper right corners."
          year="1973"
          sketch={this.state.stateSketch}
          squareSize={this.state.squareSize}
          fallLineLen={this.state.fallLineLen}
          riseLineLen={this.state.riseLineLen}/>

        <RowGroup>
          <Slider sliderId="fallLineLen"
            label="Line Length (Falling Line):"
            value={this.state.fallLineLen}
            changeHandler={this.fallLineLenChange.bind(this)}
            min={SquareDrawings.minLineLen} max={this.state.lineMax}/>
          <Slider sliderId="riseLineLen"
            label="Line Length (Rising Line):"
            value={this.state.riseLineLen}
            changeHandler={this.riseLineLenChange.bind(this)}
            min={SquareDrawings.minLineLen} max={this.state.lineMax}/>
          <Slider sliderId="squareSize"
            label="Square Size:"
            value={this.state.squareSize}
            changeHandler={this.squareSizeChange.bind(this)}
            min={SquareDrawings.minSquareSize} max={SquareDrawings.maxSquareSize}/>
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
    let fallLineLen;
    let riseLineLen;

    p.setup = function () {
      var canvas = p.createCanvas(SquareDrawings.canvasWidth, SquareDrawings.canvasHeight);
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

export default withDrawingContainer(withRandomizer(Drawing160));
