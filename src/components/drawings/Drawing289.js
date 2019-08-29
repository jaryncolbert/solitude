import React from "react";
import { RectPoints } from "../shapes/Rectangle";
import LineOriginator from "../utilities/LineOriginator";
import ResponsiveCanvas from "../canvas/ResponsiveCanvas";
import DrawingInfo from "../controls/DrawingInfo";
import DrawingContainer from "../controls/DrawingContainer";
import _ from "underscore";

export default class Drawing289 extends React.Component {
  state = { lines: [], canvasPoints: {} };

  randomize = () => {
    const lines = Object.values(RectPoints).map(point => {
      if (point === RectPoints.DIAGONAL) {
        return null;
      } else if (point === RectPoints.MIDPOINT) {
        return this.originateLinesFrom(point, 24);
      } else {
        return this.originateLinesFrom(point, 12);
      }
    });

    this.setState({ lines });
  };

  setPoint = (point, propName) => {
    this.setState({
      canvasPoints: {
        ...this.state.canvasPoints,
        [propName]: point
      }
    });
  };

  getPoint = point => {
    return this.state.canvasPoints[point];
  };

  setCanvasPoints = points => {
    this.setState({
      canvasPoints: points
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
        color="#FFFFFF"
        min={min}
        max={max}
        origin={this.getPoint(origin)}
      />
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevState["lines"].length === 0 && !!this.state.lines) ||
      !_.isEqual(prevState.canvasPoints, this.state.canvasPoints)
    ) {
      this.randomize();
    }
  }

  render() {
    return (
      <DrawingContainer {...this.props} onRandomize={this.randomize}>
        <ResponsiveCanvas
          pointsCallback={this.setCanvasPoints}
          background="#000000">
          <DrawingInfo
            titleOnly={this.props.asThumbnail}
            title="Wall Drawing 289"
            instructions="A 6-inch (15 cm) grid covering each of the four black
          walls. White lines to points on the grids. Fourth wall: twenty-four
          lines from the center, twelve lines from the midpoint of each of the
          sides, twelve lines from each corner. (The length of the lines and
          their placement are determined by the drafter.)"
            year="1976"
          />
          {this.state.lines}
        </ResponsiveCanvas>
      </DrawingContainer>
    );
  }
}
