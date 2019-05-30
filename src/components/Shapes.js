import React from "react";
import p5 from "p5";
import PropTypes from "prop-types";

export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(point) {
    return (
      Number.isInteger(point.x) &&
      this.x === point.x &&
      Number.isInteger(point.y) &&
      this.y === point.y
    );
  }
}

class Drawable extends React.Component {
  static defaultProps = {
    strokeWeight: 4,
    color: "#000000",
    start: new Point(0, 0),
  };

  static contextTypes = {
    subscribe: PropTypes.func,
    unsubscribe: PropTypes.func
  };

  componentDidMount() {
    this.context.subscribe(this.draw);
  }

  componentWillUnmount() {
    this.context.unsubscribe(this.draw);
  }

  draw = p => {
    throw new Error("Unimplemented draw method!");
  };

  render() {
    return null;
  }
}

export class Line extends Drawable {
  draw = p => {
    const { start, end, color, strokeWeight } = this.props;
    p.stroke(color);
    p.strokeWeight(strokeWeight);
    p.line(start.x, start.y, end.x, end.y);
  };
}

export function horizontal(Line) {
  return class extends React.Component {
    getStartAndEnd = (centered, rightToLeft, start, lineLen) => {
      let lineStart = start;
      let lineEnd = new Point(0, 0);
      if (centered) {
        lineStart = new Point(
          lineStart.x - Math.round(lineLen / 2),
          lineStart.y
        );
      }

      lineEnd = rightToLeft
        ? new Point(lineStart.x - lineLen, lineStart.y)
        : new Point(lineStart.x + lineLen, lineStart.y);
      return { lineStart, lineEnd };
    };

    render() {
      let { centered, rightToLeft, start, lineLen, ...otherProps } = this.props;
      let { lineStart, lineEnd } = this.getStartAndEnd(
        centered,
        rightToLeft,
        start,
        lineLen
      );
      return <Line start={lineStart} end={lineEnd} {...otherProps} />;
    }
  };
}

function diagonal(Line) {
  return class extends React.Component {
    calcSquareSideFromHypotenuse = hypotenuse => {
      return Math.round(hypotenuse / Math.sqrt(2));
    };

    getStartAndEnd = (rising, centered, rightToLeft, start, lineLen) => {
      let lineStart = start;
      if (centered) {
        //Calculate new start point from midpoint
        /* Half of lineLen is hypotenuse, line extends equally to/from midpoint
         * to the start and end of the line
         */
        let hypotenuse = lineLen / 2;
        let squareSizeFromDiag = this.calcSquareSideFromHypotenuse(hypotenuse);
        let newStartX = lineStart.x - squareSizeFromDiag;
        let newStartY = rising
          ? lineStart.y + squareSizeFromDiag
          : lineStart.y - squareSizeFromDiag;

        lineStart = new Point(newStartX, newStartY);
      }

      /* Get width/height of square that comprises this diagonal line
       * to find line end point
       */
      let hypotenuse = lineLen;
      let squareSizeFromDiag = this.calcSquareSideFromHypotenuse(hypotenuse);
      let newEndY =
        (!rising && !rightToLeft) || (rising && rightToLeft)
          ? lineStart.y + squareSizeFromDiag
          : lineStart.y - squareSizeFromDiag;
      let newEndX = !rightToLeft
        ? lineStart.x + squareSizeFromDiag
        : lineStart.x - squareSizeFromDiag;
      let lineEnd = new Point(newEndX, newEndY);

      return { lineStart, lineEnd };
    };

    render() {
      let {
        rising,
        centered,
        rightToLeft,
        start,
        lineLen,
        ...otherProps
      } = this.props;
      let { lineStart, lineEnd } = this.getStartAndEnd(
        rising,
        centered,
        rightToLeft,
        start,
        lineLen
      );
      return <Line start={lineStart} end={lineEnd} {...otherProps} />;
    }
  };
}

export const HorizLine = horizontal(Line);
export const DiagLine = diagonal(Line);

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
    color: "#000000",
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
      targetPoints: [],
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
      let {
        start,
        height,
        width,
        centered,
        targetPoints,
        getDiagonal
      } = this.props;

      // If centered, reinterpret start point as midpoint
      if (centered) {
        start = this.getOriginFromMidpoint(start, width, height);
      }

      // Register each target point and its callback function to pass to parent
      targetPoints.forEach(({ target, callback }) => {
        const point = this.getPoint(target, start, height, width, centered);
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

    getOriginFromMidpoint = (midpoint, width, height) => {
      const originX = midpoint.x - Math.round(width / 2);
      const originY = midpoint.y - Math.round(height / 2);
      return new Point(originX, originY);
    };

    render() {
      let {
        targetPoints,
        centered,
        start,
        width,
        height,
        ...otherProps
      } = this.props;
      // If centered, reinterpret start point as midpoint
      if (centered) {
        start = this.getOriginFromMidpoint(start, width, height);
      }

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
  return class extends React.Component {
    static defaultProps = RectangleComponent.defaultProps;

    render() {
      let { sideLen, ...otherProps } = this.props;

      return (
        <RectangleComponent width={sideLen} height={sideLen} {...otherProps} />
      );
    }
  };
}

class SimpleCanvas extends React.Component {
  static defaultProps = {
    width: 600,
    height: 400,
    start: new Point(0, 0),
  };

  static childContextTypes = {
    subscribe: PropTypes.func,
    unsubscribe: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.drawables = [];
  }

  getChildContext() {
    return {
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe
    };
  }

  componentDidMount() {
    const { setup, draw } = this;

    const sketch = p => {
      p.setup = () => setup(p);
      p.draw = () => draw(p);
    };
    this.p = new p5(sketch, this.container);
  }

  setup = p => {
    const { width, height } = this.props;
    p.createCanvas(width, height);
  };

  subscribe = childFn => {
    this.drawables.push(childFn);
  };

  unsubscribe = childFn => {
    this.drawables = this.drawables.filter(c => c !== childFn);
  };

  draw = p => {
    p.background(255, 255, 255);
    this.drawables.forEach(c => c(p));
  };

  componentWillUnmount() {
    this.p.remove();
  }

  render() {
    const { children, ...otherProps } = this.props;
    return (
      <div ref={e => (this.container = e)}>
        <SimpleRectangle color="#FFFFFF" {...otherProps} />
        {children}
      </div>
    );
  }
}

export const Canvas = withRectPoints(SimpleCanvas);
export const Rectangle = withRectPoints(SimpleRectangle);
export const Square = withEqualSides(Rectangle);
