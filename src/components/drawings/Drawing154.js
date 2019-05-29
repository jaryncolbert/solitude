import React from "react";
import {
  Canvas,
  Rectangle,
  RectangleDrawer,
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

export default class Drawing154 extends React.Component {
  minLen = 5;

  constructor(props) {
    super(props);

    const initialSquare = 300;

    this.state = {
      randomized: false,
      lineMax: initialSquare,
      lineStart: new Point(0, 0),
      midpoint: new Point(0, 0),
      // Initial state of sliders
      lineLen: getRandomInt(this.minLen, initialSquare),
      sideLen: initialSquare,
      // Initial state of checkboxes
      canExtend: false,
      scaled: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const prevLineLen = prevState.lineLen;
    const prevSideLen = prevState.sideLen;
    const prevLineMax = prevState.lineMax;
    const prevLineStart = prevState.lineStart;
    const prevSquareExtent = prevState.squareExtent;
    const prevRandomized = prevState.randomized;
    let {
      lineMax,
      lineStart,
      lineLen,
      sideLen,
      squareExtent,
      scaled,
      randomized
    } = this.state;

    lineMax = this.getLineMax();
    if (
      randomized &&
      (!lineStart.equals(prevLineStart) || prevSquareExtent !== squareExtent)
    ) {
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

    if (
      lineMax !== prevLineMax ||
      lineLen !== prevLineLen ||
      randomized !== prevRandomized
    ) {
      this.setState({
        lineMax: lineMax,
        lineLen: lineLen,
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
    let { lineStart, squareExtent, canvasWidth, canExtend } = this.state;

    const extent = canExtend ? canvasWidth : squareExtent;
    return extent - lineStart.x;
  };

  // Save coordinates for mid left and mid right of square
  getRectPoints = () => {
    return [
      {
        target: Rectangle.Points.MID_LEFT,
        callback: point => this.setPoint(point, "lineStart")
      },
      {
        target: Rectangle.Points.MID_RIGHT,
        callback: point => this.setPointX(point, "squareExtent")
      }
    ];
  };

  // Save coordinates for midpoint and mid right of canvas
  getCanvasPoints = () => {
    return [
      {
        target: Rectangle.Points.MIDPOINT,
        callback: point => this.setPoint(point, "midpoint")
      },
      {
        target: Rectangle.Points.MID_RIGHT,
        callback: point => this.setPointX(point, "canvasWidth")
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
      lineStart,
      lineLen,
      sideLen,
      canExtend,
      scaled
    } = this.state;

    return (
      <>
        <Canvas targetPoints={this.getCanvasPoints()}>
          <DrawingInfo
            title="Wall Drawing 154"
            instructions="A black outlined square with a red
        horizontal line from the midpoint of the left side toward the
        middle of the right side."
            year="1973"
          />
          <RectangleDrawer
            start={this.state.midpoint}
            centered
            width={sideLen}
            height={sideLen}
            targetPoints={this.getRectPoints()}
          />
          <LineDrawer
            type="horizontal"
            color={"#FF0000"}
            start={lineStart}
            lineLen={lineLen}
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
            label="Line Length:"
            value={lineLen}
            changeHandler={e => this.setTargetValue(e, "lineLen")}
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
