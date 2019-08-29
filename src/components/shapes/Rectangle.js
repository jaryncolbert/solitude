import React from "react";

import Point from "./Point";
import Drawable from "./Drawable";

export const RectPoints = Object.freeze({
  TOP_LEFT: "top_left",
  TOP_MID: "top_mid",
  TOP_RIGHT: "top_right",
  BTM_LEFT: "btm_left",
  BTM_MID: "btm_mid",
  BTM_RIGHT: "btm_right",
  MID_LEFT: "mid_left",
  MIDPOINT: "midpoint",
  MID_RIGHT: "mid_right",
  DIAGONAL: "diagonal"
});

export class SimpleRectangle extends Drawable {
  static defaultProps = {
    ...Drawable.defaultProps,
    color: "#000000"
  };

  draw = p => {
    let {
      start,
      width,
      height,
      color,
      noFill,
      noOutline,
      fillColor,
      strokeWeight
    } = this.props;

    if (noOutline) {
      p.noStroke();
    } else {
      p.stroke(color);
      p.strokeWeight(strokeWeight);
    }
    noFill && p.noFill();
    fillColor && p.fill(fillColor);

    p.rect(start.x, start.y, width, height);
  };
}

function withRectPoints(RectangleComponent) {
  return class RectangleWithPoints extends React.Component {
    static defaultProps = {
      ...RectangleComponent.defaultProps
    };

    state = {
      points: {}
    };

    componentDidMount() {
      this.registerPoints();
    }

    componentDidUpdate(prevProps) {
      if (
        this.props.width !== prevProps.width ||
        this.props.height !== prevProps.height ||
        !prevProps.start.equals(this.props.start)
      ) {
        // Re-register the target points based on the new start location
        // or rectangle dimensions
        this.registerPoints();
      }
    }

    registerPoints = () => {
      let { start, height, width, pointsCallback } = this.props;

      let points = {};
      let point;
      Object.values(RectPoints).forEach(v => {
        if (v === RectPoints.DIAGONAL) {
          point = this.getDiagonal(width, height);
        } else {
          point = this.getPoint(v, start, height, width);
        }
        points[v] = point;
      });

      this.setState({ points });

      if (pointsCallback) {
        pointsCallback(points);
      }
    };

    getDiagonal = (width, height) => {
      return Math.round(Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)));
    };

    getPoint = (targetPoint, start, height, width) => {
      const rightX = start.x + width;
      const midX = start.x + Math.round(width / 2);
      const midY = start.y + Math.round(height / 2);
      const btmY = start.y + height;

      switch (targetPoint) {
        case RectPoints.TOP_LEFT:
          return new Point(start.x, start.y);
        case RectPoints.TOP_MID:
          return new Point(midX, start.y);
        case RectPoints.TOP_RIGHT:
          return new Point(rightX, start.y);
        case RectPoints.BTM_LEFT:
          return new Point(start.x, btmY);
        case RectPoints.BTM_MID:
          return new Point(midX, btmY);
        case RectPoints.BTM_RIGHT:
          return new Point(rightX, btmY);
        case RectPoints.MID_LEFT:
          return new Point(start.x, midY);
        case RectPoints.MIDPOINT:
          return new Point(midX, midY);
        case RectPoints.MID_RIGHT:
          return new Point(rightX, midY);
        case RectPoints.DIAGONAL:
          return this.getDiagonal(width, height);
        default:
          throw new Error("Unknown Rectangle point " + targetPoint);
      }
    };

    render() {
      let { pointsCallback, ...otherProps } = this.props;
      return <RectangleComponent {...otherProps} {...this.state} />;
    }
  };
}

function withEqualSides(RectangleComponent) {
  return function EqualSidedRectangle({ sideLen, ...otherProps }) {
    return (
      <RectangleComponent width={sideLen} height={sideLen} {...otherProps} />
    );
  };
}

function centered(RectangleComponent) {
  return class CenteredRectangle extends React.Component {
    static defaultProps = RectangleComponent.defaultProps;

    getOriginFromMidpoint = (midpoint, width, height) => {
      const originX = midpoint.x - Math.round(width / 2);
      const originY = midpoint.y - Math.round(height / 2);
      return new Point(originX, originY);
    };

    render() {
      const { midpoint, width, height, ...otherProps } = this.props;
      const newStart = this.getOriginFromMidpoint(midpoint, width, height);

      return (
        <RectangleComponent
          {...otherProps}
          start={newStart}
          width={width}
          height={height}
        />
      );
    }
  };
}

function withRectAnchors(ChildComponent) {
  return class RectangleAnchor extends React.Component {
    render() {
      const { anchoredTo, anchoredAs, points, ...otherProps } = this.props;
      let injectedProps = {};

      if (points && anchoredTo) {
        const anchorName = anchoredAs ? anchoredAs : "start";
        injectedProps[anchorName] = points[anchoredTo];
      }
      return <ChildComponent {...otherProps} {...injectedProps} />;
    }
  };
}

export const Rectangle = withRectPoints(SimpleRectangle);
export const Square = withEqualSides(Rectangle);

export const CenteredRectangle = centered(Rectangle);
/* CenteredSquare is withEqualSides(CenteredRectangle) instead of centered(Square)
 * because sideLen expansion must happen before midpoint calculation, which
 * uses width, height
 */
export const CenteredSquare = withEqualSides(CenteredRectangle);

export default Rectangle;
