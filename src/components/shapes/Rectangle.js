import React from "react";

import Point from "./Point";
import Drawable from "./Drawable";

export const RectPoints = Object.freeze({
  TOP_LEFT: "top_left",
  TOP_RIGHT: "top_right",
  BTM_LEFT: "btm_left",
  BTM_RIGHT: "btm_right",
  MIDPOINT: "midpoint",
  MID_LEFT: "mid_left",
  MID_RIGHT: "mid_right"
});

export class SimpleRectangle extends Drawable {
  static defaultProps = {
    ...Drawable.defaultProps,
    color: "#000000"
  };

  draw = p => {
    let { start, width, height, color, strokeWeight } = this.props;
    p.stroke(color);
    p.strokeWeight(strokeWeight);
    p.rect(start.x, start.y, width, height);
  };
}

function withRectPoints(RectangleComponent) {
  return class extends React.Component {
    static defaultProps = {
      ...RectangleComponent.defaultProps,
      /* targetPoints is an array of objects:
       * {
           target: A point of interest from SimpleRectangle.Points,
           callback: A function that should be called to return target value
         }
       */
      targetPoints: []
    };

    constructor(props) {
      super(props);
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
      let { start, height, width, targetPoints, getDiagonal } = this.props;

      // Register each target point and its callback function to pass to parent
      targetPoints.forEach(({ target, callback }) => {
        const point = this.getPoint(target, start, height, width);
        callback(point);
      });

      if (getDiagonal) {
        getDiagonal(this.getDiagonal(width, height));
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
        case RectPoints.TOP_RIGHT:
          return new Point(rightX, start.y);
        case RectPoints.BTM_LEFT:
          return new Point(start.x, btmY);
        case RectPoints.BTM_RIGHT:
          return new Point(rightX, btmY);
        case RectPoints.MIDPOINT:
          return new Point(midX, midY);
        case RectPoints.MID_LEFT:
          return new Point(start.x, midY);
        case RectPoints.MID_RIGHT:
          return new Point(rightX, midY);
        default:
          throw new Error("Unknown Rectangle point " + targetPoint);
      }
    };

    render() {
      let { targetPoints, start, width, height, ...otherProps } = this.props;

      return (
        <RectangleComponent
          start={start}
          width={width}
          height={height}
          {...otherProps}
        />
      );
    }
  };
}

function withEqualSides(RectangleComponent) {
  return function({ sideLen, ...otherProps }) {
    return (
      <RectangleComponent width={sideLen} height={sideLen} {...otherProps} />
    );
  };
}

function centered(RectangleComponent) {
  return class extends React.Component {
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

export const Rectangle = withRectPoints(SimpleRectangle);
export const Square = withEqualSides(Rectangle);

export const CenteredRectangle = centered(Rectangle);
/* CenteredSquare is withEqualSides(CenteredRectangle) instead of centered(Square)
 * because sideLen expansion must happen before midpoint calculation, which
 * uses width, height
 */
export const CenteredSquare = withEqualSides(CenteredRectangle);

export default Rectangle;
