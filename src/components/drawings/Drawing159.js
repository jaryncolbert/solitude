import React from "react";
import { Canvas, Square, RectPoints, DiagLine, Point } from "../Shapes";
import {
  Button,
  Slider,
  Checkbox,
  RowGroup,
  DrawingInfo,
  DrawingContainer
} from "../CommonComponents";
import { getRandomInt, getRandomBool } from "../util";

export default class Drawing159 extends React.Component {
  minLen = 5;

  constructor(props) {
    super(props);

    const initialSquare = 300;

    this.state = {
      randomized: false,
      lineMax: initialSquare,
      riseLineStart: new Point(0, 0),
      fallLineStart: new Point(0, 0),
      midpoint: new Point(0, 0),
      // Initial state of sliders
      riseLineLen: getRandomInt(this.minLen, initialSquare),
      fallLineLen: getRandomInt(this.minLen, initialSquare),
      sideLen: initialSquare,
      // Initial state of checkboxes
      canExtend: false,
      scaled: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const prevRiseLineLen = prevState.riseLineLen;
    const prevFallLineLen = prevState.fallLineLen;
    const prevSideLen = prevState.sideLen;
    const prevLineMax = prevState.lineMax;
    const prevRiseLineStart = prevState.riseLineStart;
    const prevFallLineStart = prevState.fallLineStart;
    const prevSquareExtent = prevState.squareExtent;
    const prevRandomized = prevState.randomized;
    let {
      lineMax,
      riseLineStart,
      riseLineLen,
      fallLineStart,
      fallLineLen,
      sideLen,
      squareExtent,
      scaled,
      randomized
    } = this.state;

    lineMax = this.getLineMax();
    if (
      randomized &&
      (!riseLineStart.equals(prevRiseLineStart) ||
        !fallLineStart.equals(prevFallLineStart) ||
        prevSquareExtent !== squareExtent)
    ) {
      // If trigger is set to randomize, generate new value for riseLineLen
      riseLineLen = getRandomInt(this.minLen, lineMax);
      fallLineLen = getRandomInt(this.minLen, lineMax);
      randomized = false;
    } else {
      if (
        scaled &&
        (riseLineLen !== prevRiseLineLen ||
          fallLineLen !== prevFallLineLen ||
          sideLen !== prevSideLen)
      ) {
        // Maintain previous scale of riseLineLen to squareSize
        const prevRiseRatio = prevRiseLineLen / prevSideLen;
        const prevFallRatio = prevFallLineLen / prevSideLen;
        riseLineLen = Math.max(
          Math.round(prevRiseRatio * sideLen),
          this.minLen
        );
        fallLineLen = Math.max(
          Math.round(prevFallRatio * sideLen),
          this.minLen
        );
      }
      if (riseLineLen > lineMax) {
        riseLineLen = lineMax;
      }
      if (fallLineLen > lineMax) {
        fallLineLen = lineMax;
      }
    }

    if (
      lineMax !== prevLineMax ||
      riseLineLen !== prevRiseLineLen ||
      fallLineLen !== prevFallLineLen ||
      randomized !== prevRandomized
    ) {
      this.setState({
        lineMax: lineMax,
        riseLineLen: riseLineLen,
        fallLineLen: fallLineLen,
        randomized: randomized
      });
    }
  }

  setPointX = (point, propName) => {
    this.setState({
      [propName]: point.x
    });
  };

  setPointY = (point, propName) => {
    this.setState({
      [propName]: point.y
    });
  };

  setPoint = (point, propName) => {
    this.setState({
      [propName]: point
    });
  };

  setValue = (value, propName) => {
    this.setState({
      [propName]: value
    });
  };

  setTargetValue = (e, propName) => {
    this.setState({
      [propName]: Number(e.target.value)
    });
  };

  toggleValue = (e, propName) => {
    this.setState({
      [propName]: !!e.target.checked
    });
  };

  randomize = () => {
    this.setState({
      randomized: true,
      sideLen: getRandomInt(this.minLen, this.state.canvasHeight),
      scaled: getRandomBool(),
      canExtend: getRandomBool()
    });
  };

  getLineMax = () => {
    let { canExtend, squareDiag, canvasDiag } = this.state;
    return canExtend ? canvasDiag : squareDiag;
  };

  // Save coordinates for mid left and mid right of square
  getSquarePoints = () => {
    return [
      {
        target: RectPoints.BTM_LEFT,
        callback: point => this.setPoint(point, "riseLineStart")
      },
      {
        target: RectPoints.BTM_RIGHT,
        callback: point => this.setPoint(point, "fallLineStart")
      }
    ];
  };

  // Save coordinates for midpoint and mid right of canvas
  getCanvasPoints = () => {
    return [
      {
        target: RectPoints.MIDPOINT,
        callback: point => this.setPoint(point, "midpoint")
      },
      {
        target: RectPoints.BTM_RIGHT,
        callback: point => this.setPointY(point, "canvasHeight")
      }
    ];
  };

  render() {
    const {
      lineMax,
      riseLineStart,
      riseLineLen,
      fallLineStart,
      fallLineLen,
      sideLen,
      canExtend,
      scaled
    } = this.state;

    return (
      <DrawingContainer {...this.props}>
        <Canvas
          targetPoints={this.getCanvasPoints()}
          getDiagonal={v => this.setValue(v, "canvasDiag")}
        >
          <DrawingInfo
            title="Wall Drawing 159"
            instructions="A black outlined square
        with a red diagonal line
        from the lower left corner
        toward the upper right corner;
        and another red line
        from the lower right corner
        to the upper left."
            year="1973"
          />
          <Square
            start={this.state.midpoint}
            centered
            sideLen={sideLen}
            targetPoints={this.getSquarePoints()}
            getDiagonal={v => this.setValue(v, "squareDiag")}
          />
          <DiagLine
            start={riseLineStart}
            lineLen={riseLineLen}
            rising
            color={"#FF0000"}
          />
          <DiagLine
            start={fallLineStart}
            lineLen={fallLineLen}
            falling
            rightToLeft
            color={"#FF0000"}
          />
        </Canvas>

        <RowGroup>
          <Slider
            label="Square Size:"
            value={sideLen}
            changeHandler={e => this.setTargetValue(e, "sideLen")}
            min={this.minLen}
            max={this.state.canvasHeight}
          />
          <Slider
            label="Rising Line Length:"
            value={riseLineLen}
            changeHandler={e => this.setTargetValue(e, "riseLineLen")}
            min={this.minLen}
            max={lineMax}
          />
          <Slider
            label="Falling Line Length:"
            value={fallLineLen}
            changeHandler={e => this.setTargetValue(e, "fallLineLen")}
            min={this.minLen}
            max={lineMax}
          />
        </RowGroup>

        <RowGroup>
          <Checkbox
            label="Can line extend beyond square?"
            isSelected={canExtend}
            changeHandler={e => this.toggleValue(e, "canExtend")}
          />
          <Checkbox
            label="Scale square proportionally?"
            isSelected={scaled}
            changeHandler={e => this.toggleValue(e, "scaled")}
          />
        </RowGroup>

        <Button onClick={this.randomize} />
      </DrawingContainer>
    );
  }
}
