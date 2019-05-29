import React from "react";
import {
  Canvas,
  RectangleDrawer,
  Rectangle,
  LineDrawer,
  Point
} from "../Shapes";
import {
  Button,
  Slider,
  Checkbox,
  RowGroup,
  DrawingInfo
} from "../CommonComponents";
import { getRandomInt, getRandomBool } from "../util";

export default class Drawing164 extends React.Component {
  minLen = 5;

  constructor(props) {
    super(props);

    const initialSquare = 300;

    this.state = {
      randomized: false,
      lineMax: initialSquare,
      midpoint: new Point(0, 0),
      // Initial state of sliders
      riseLineLen: getRandomInt(this.minLen, initialSquare),
      horizLineLen: getRandomInt(this.minLen, initialSquare),
      sideLen: initialSquare,
      // Initial state of checkboxes
      canExtend: false,
      scaled: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const prevRiseLineLen = prevState.riseLineLen;
    const prevhorizLineLen = prevState.horizLineLen;
    const prevSideLen = prevState.sideLen;
    const prevLineMax = prevState.lineMax;
    const prevSquareDiag = prevState.squareDiag;
    const prevCanvasDiag = prevState.canvasDiag;
    const prevRandomized = prevState.randomized;
    let {
      lineMax,
      riseLineLen,
      horizLineLen,
      sideLen,
      squareDiag,
      canvasDiag,
      scaled,
      randomized
    } = this.state;

    lineMax = this.getLineMax();
    if (
      randomized && ((prevSquareDiag !== squareDiag) || (prevCanvasDiag !== canvasDiag))
    ) {
      // If trigger is set to randomize, generate new value for riseLineLen
      riseLineLen = getRandomInt(this.minLen, lineMax);
      horizLineLen = getRandomInt(this.minLen, lineMax);
      randomized = false;
    } else {
      if (
        scaled &&
        (riseLineLen !== prevRiseLineLen ||
          horizLineLen !== prevhorizLineLen ||
          sideLen !== prevSideLen)
      ) {
        // Maintain previous scale of riseLineLen to squareSize
        const prevRiseRatio = prevRiseLineLen / prevSideLen;
        const prevhorizRatio = prevhorizLineLen / prevSideLen;
        riseLineLen = Math.max(
          Math.round(prevRiseRatio * sideLen),
          this.minLen
        );
        horizLineLen = Math.max(
          Math.round(prevhorizRatio * sideLen),
          this.minLen
        );
      }
      if (riseLineLen > lineMax) {
        riseLineLen = lineMax;
      }
      if (horizLineLen > lineMax) {
        horizLineLen = lineMax;
      }
    }

    if (
      lineMax !== prevLineMax ||
      riseLineLen !== prevRiseLineLen ||
      horizLineLen !== prevhorizLineLen ||
      randomized !== prevRandomized
    ) {
      this.setState({
        lineMax: lineMax,
        riseLineLen: riseLineLen,
        horizLineLen: horizLineLen,
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

  // Save coordinates for midpoint and mid right of canvas
  getCanvasPoints = () => {
    return [
      {
        target: Rectangle.Points.MIDPOINT,
        callback: point => this.setPoint(point, "midpoint")
      },
      {
        target: Rectangle.Points.BTM_RIGHT,
        callback: point => this.setPointY(point, "canvasHeight")
      }
    ];
  };

  render() {
    const {
      lineMax,
      riseLineLen,
      horizLineLen,
      sideLen,
      canExtend,
      scaled
    } = this.state;

    return (
      <>
        <Canvas
          targetPoints={this.getCanvasPoints()}
          getDiagonal={v => this.setValue(v, "canvasDiag")}
        >
          <DrawingInfo
            title="Wall Drawing 164"
            instructions="A black outlined square
            with a red horizontal line centered on the axis
            between the midpoint of the left side
            and the midpoint of the right side
            and a red diagonal line centered on the axis
            between the lower left and upper right corners."
            year="1973"
          />
          <RectangleDrawer
            start={this.state.midpoint}
            centered
            width={sideLen}
            height={sideLen}
            getDiagonal={v => this.setValue(v, "squareDiag")}
          />
          <LineDrawer
            start={this.state.midpoint}
            lineLen={riseLineLen}
            type="diagonal"
            rising centered
            color={"#FF0000"}
          />
          <LineDrawer
            start={this.state.midpoint}
            lineLen={horizLineLen}
            type="horizontal"
            centered
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
            label="Horizontal Line Length:"
            value={horizLineLen}
            changeHandler={e => this.setTargetValue(e, "horizLineLen")}
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
      </>
    );
  }
}
