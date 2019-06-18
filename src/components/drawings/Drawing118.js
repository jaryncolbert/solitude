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
    const points = this.generatePoints(50);
    let lines = [];

    points.forEach((start, i) => {
      for (let j = i + 1; j < points.length; j++) {
        const end = points[j];

        lines.push(
          <Line
            key={i + "-" + j}
            start={start}
            end={end}
            strokeWeight={1}
          />
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

  generatePoints = numPoints => {
    let points = [];
    let min = this.state.canvasMin;
    let max = this.state.canvasMax;

    let numSegments = 10;
    let pointsPerSeg = numPoints / numSegments;
    let segWidth = Math.round((max.x - min.x) / numSegments);

    for (let seg = 0; seg < numSegments; seg++) {
      const segShift = seg * segWidth;

      for (let i = 0; i < pointsPerSeg; i++) {
        const pointX = getRandomInt(min.x + segShift, segWidth + segShift);
        const pointY = getRandomInt(min.y, max.y);
        points.push(new Point(pointX, pointY));
      }
    }

    return points;
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState["lines"].length === 0 && !!this.state.lines) {
      this.randomize();
    }
  }

  render() {
    let asThumbnail = this.props.asThumbnail;
    const width = asThumbnail ? this.props.width : 1400;
    const height = asThumbnail ? this.props.height : 500;

    return (
      <DrawingContainer {...this.props}>
        <Canvas targetPoints={this.getCanvasPoints()} width={width} height={height}>
          <DrawingInfo
            titleOnly={asThumbnail}
            title="Wall Drawing 118"
            instructions="On a wall surface, any continuous stretch of wall,
            using a hard pencil, place fifty points at random. The points
            should be evenly distributed over the area of the wall. All of the
            points should be connected by straight lines."
            year="1971"
          />
          {this.state.lines}
        </Canvas>
        { !asThumbnail && <Button onClick={this.randomize} /> }
      </DrawingContainer>
    );
  }
}
