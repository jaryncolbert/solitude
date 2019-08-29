import React from "react";
import { RectPoints } from "../shapes/Rectangle";
import Line from "../shapes/Line";
import Point from "../shapes/Point";
import ResponsiveCanvas from "../canvas/ResponsiveCanvas";
import DrawingInfo from "../controls/DrawingInfo";
import DrawingContainer from "../controls/DrawingContainer";
import { getRandomInt } from "../util";

export default class Drawing118 extends React.Component {
  state = { lines: [], canvasMin: 0, canvasMax: 0 };

  randomize = () => {
    const points = this.generatePoints(50);
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

  setCanvasPoints = points => {
    this.setState({
      canvasMin: points[RectPoints.TOP_LEFT],
      canvasMax: points[RectPoints.BTM_RIGHT]
    });
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
    if (
      (prevState["lines"].length === 0 && !!this.state.lines) ||
      this.state.canvasMin !== prevState.canvasMin ||
      this.state.canvasMax !== prevState.canvasMax
    ) {
      this.randomize();
    }
  }

  render() {
    const asThumbnail = this.props.asThumbnail;

    return (
      <DrawingContainer {...this.props} onRandomize={this.randomize}>
        <ResponsiveCanvas {...this.props} pointsCallback={this.setCanvasPoints}>
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
        </ResponsiveCanvas>
      </DrawingContainer>
    );
  }
}
