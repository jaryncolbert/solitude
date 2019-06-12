import React from "react";
import { RectPoints } from "../shapes/Rectangle";
import Line from "../shapes/Line";
import Point from "../shapes/Point";
import Canvas from "../P5Canvas";
import { Button, DrawingInfo, DrawingContainer } from "../CommonComponents";
import { getRandomInt } from "../util";

export default class Drawing118 extends React.Component {
  state = { lines: [] };

  randomize = () => {
    const points = this.generatePoints();
    let lines = [];

    points.forEach((start, i) => {
      for (let j = i + 1; j < points.length; j++) {
        const end = points[j];

        lines.push(
          <Line key={i + "-" + j} start={start} end={end} strokeWeight={1} />
        );
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
    return [
      {
        target: RectPoints.TOP_LEFT,
        callback: point => this.setPoint(point, "canvasMin")
      },
      {
        target: RectPoints.BTM_RIGHT,
        callback: point => this.setPoint(point, "canvasMax")
      }
    ];
  };

  generatePoints = () => {
    let points = [];
    let min = this.state.canvasMin;
    let max = this.state.canvasMax;

    for (let i = 0; i < 50; i++) {
      const pointX = getRandomInt(min.x, max.x);
      const pointY = getRandomInt(min.y, max.y);
      points.push(new Point(pointX, pointY));
    }

    return points;
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState["lines"].length === 0 && !!this.state.lines) {
      this.randomize();
    }
  }

  render() {
    return (
      <DrawingContainer {...this.props}>
        <Canvas targetPoints={this.getCanvasPoints()} width={1400} height={500}>
          <DrawingInfo
            title="Wall Drawing 118"
            instructions="On a wall surface, any continuous stretch of wall,
            using a hard pencil, place fifty points at random. The points
            should be evenly distributed over the area of the wall. All of the
            points should be connected by straight lines."
            year="1971"
          />
          {this.state.lines}
        </Canvas>
        <Button onClick={this.randomize} />
      </DrawingContainer>
    );
  }
}
