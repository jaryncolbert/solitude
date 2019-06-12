import React from "react";
import { RectPoints } from "../shapes/Rectangle";
import LineOriginator from "../utilities/LineOriginator";
import Canvas from "../P5Canvas";
import { Button, DrawingInfo, DrawingContainer } from "../CommonComponents";

export default class Drawing289 extends React.Component {
  state = { lines: [] }

  randomize = () => {
    const lines = Object.values(RectPoints).map(point => {
      if (point === RectPoints.MIDPOINT) {
        return this.originateLinesFrom(point, 24);
      } else {
        return this.originateLinesFrom(point, 12);
      }
    });

    this.setState({ lines });
  };

  setPoint = (point, propName) => {
    this.setState({
      [propName]: point
    });
  };

  getPoint = point => {
    return this.state[point];
  };

  // Save coordinates for line origination points on canvas
  getCanvasPoints = () => {
    // For each point, create a fn that sets a state prop using its name
    return Object.values(RectPoints).map(point => {
      return {
        target: point,
        callback: p => this.setPoint(p, point)
      };
    });
  };

  originateLinesFrom = (origin, numLines) => {
    const min = this.getPoint(RectPoints.TOP_LEFT);
    const max = this.getPoint(RectPoints.BTM_RIGHT);

    return (
      <LineOriginator
        key={origin}
        originName={origin}
        numLines={numLines}
        min={min}
        max={max}
        origin={this.getPoint(origin)}
      />
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState["lines"].length === 0 && !!this.state.lines) {
      this.randomize();
    }
  }

  render() {
    return (
      <DrawingContainer {...this.props}>
        <Canvas
          targetPoints={this.getCanvasPoints()}
          width={1400}
          height={500}
          background="#000000"
        >
          <DrawingInfo
            title="Wall Drawing 289"
            instructions="A 6-inch (15 cm) grid covering each of the four black
          walls. White lines to points on the grids. Fourth wall: twenty-four
          lines from the center, twelve lines from the midpoint of each of the
          sides, twelve lines from each corner. (The length of the lines and
          their placement are determined by the drafter.)"
            year="1976"
          />
          {this.state.lines}
        </Canvas>
        <Button onClick={this.randomize} />
      </DrawingContainer>
    );
  }
}
