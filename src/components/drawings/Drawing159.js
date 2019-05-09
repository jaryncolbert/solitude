import React, { Component } from 'react';
import Sketch from '../Sketch';
import { Slider, Checkbox, RowGroup,
  withRandomizer, withDrawingContainer } from '../CommonComponents';
import { getRandomInt, getRandomBool, centerSquare, calcDiagLineMax,
  risingDiagMidLineFrom, fallingDiagMidLineFrom } from '../util';

class Drawing159 extends Component {

  static drawingId = "drawing-159";
  static initSquareSize = 300;
  static minSquareSize = 10;
  static maxSquareSize = 380;
  static minLineLen = 5;
  static canvasWidth = 600;
  static canvasHeight = 400;

  constructor(props) {
		super(props);

    let lineMax = calcDiagLineMax(Drawing159.canvasWidth,
      Drawing159.canvasHeight, Drawing159.initSquareSize, false);
		this.state = {
			stateSketch: this.sketch,
      squareSize: Drawing159.initSquareSize,
      lineExtendsBeyondSquare: false,
      scaleProportionally: false,
      lineMax: lineMax,
      fallLineLen: getRandomInt(Drawing159.minLineLen, lineMax),
      riseLineLen: getRandomInt(Drawing159.minLineLen, lineMax),
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
    let squareSize = getRandomInt(Drawing159.minSquareSize,
      Drawing159.maxSquareSize);

    this.setState(this.getRandomState(squareSize, canExtend));
  }

  recalcMaxFromSquareSize(squareSize) {
    return (previousState, currentProps) => {
      let fallLineLen = previousState.fallLineLen;
      let riseLineLen = previousState.riseLineLen;

      if (previousState.scaleProportionally) {
        // Maintain previous scale of lineLens to squareSize
        let prevRiseRatio = previousState.riseLineLen / previousState.squareSize;
        riseLineLen = Math.max(Math.round(prevRiseRatio * squareSize), Drawing159.minLineLen);
        let prevFallRatio = previousState.fallLineLen / previousState.squareSize;
        fallLineLen = Math.max(Math.round(prevFallRatio * squareSize), Drawing159.minLineLen);
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
      let lineMax = calcDiagLineMax(Drawing159.canvasWidth,
        Drawing159.canvasHeight, squareSize, canExtend);
      let fallLineLen = getRandomInt(Drawing159.minLineLen, lineMax);
      let riseLineLen = getRandomInt(Drawing159.minLineLen, lineMax);
      let scaled = getRandomBool();

      return this.getState(squareSize, canExtend, scaled, fallLineLen, riseLineLen);
    };
  }

  getState = (squareSize, canExtend, scaled, fallLineLen, riseLineLen) => {
    let lineMax = calcDiagLineMax(Drawing159.canvasWidth,
      Drawing159.canvasHeight, squareSize, canExtend);

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
        <Sketch drawingId={Drawing159.drawingId}
          title="Wall Drawing 159"
          instructions="A black outlined square
          with a red diagonal line
          from the lower left corner
          toward the upper right corner;
          and another red line
          from the lower right corner
          to the upper left."
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
            min={Drawing159.minLineLen} max={this.state.lineMax}/>
          <Slider sliderId="riseLineLen"
            label="Line Length (Rising Line):"
            value={this.state.riseLineLen}
            changeHandler={this.riseLineLenChange.bind(this)}
            min={Drawing159.minLineLen} max={this.state.lineMax}/>
          <Slider sliderId="squareSize"
            label="Square Size:"
            value={this.state.squareSize}
            changeHandler={this.squareSizeChange.bind(this)}
            min={Drawing159.minSquareSize} max={Drawing159.maxSquareSize}/>
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
      var canvas = p.createCanvas(Drawing159.canvasWidth, Drawing159.canvasHeight);
      canvas.parent(Drawing159.drawingId);
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
      let squareDims = centerSquare(p.width, p.height, squareSize);
      p.rect(...squareDims);

      // Two red diagonal lines of random length starting from lower corners
      // and extending along midpoint line
      p.stroke(255,0,0);
      let squareX = squareDims[0];
      let squareY = squareDims[1];
      p.line(...fallingDiagMidLineFrom(squareX + squareSize,
        squareY + squareSize, fallLineLen));
      p.line(...risingDiagMidLineFrom(squareX, squareY + squareSize, riseLineLen));
    };
  }
}

export default withDrawingContainer(withRandomizer(Drawing159));
