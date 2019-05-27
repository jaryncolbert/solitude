import React from "react";
import p5 from "p5";
import PropTypes from "prop-types";

class Drawable extends React.Component {
  static defaultProps = {
    strokeWeight: 4,
    color: "#000000"
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

export class Line extends Drawable {
  draw = p => {
    const { start, end, color, strokeWeight } = this.props;
    p.stroke(color);
    p.strokeWeight(strokeWeight);
    p.line(start.x, start.y, end.x, end.y);
  };
}

export class LineDrawer extends React.Component {
  calcSquareSideFromHypotenuse = hypotenuse => {
    return Math.round(hypotenuse / Math.sqrt(2));
  };

  getStartAndEnd = () => {
    let { type, rising, centered, start, lineLen } = this.props;

    const knownTypes = ["horizontal", "diagonal"];
    if (!knownTypes.includes(type))
      throw new Error("Unknown Line Type: " + type);

    let lineStart = start;
    let lineEnd = new Point(0, 0);

    // Process horizontal line
    if (type === "horizontal") {
      if (centered) {
        lineStart = new Point(
          lineStart.x - Math.round(lineLen / 2),
          lineStart.y
        );
      }

      lineEnd = new Point(lineStart.x + lineLen, lineStart.y);
      return { lineStart, lineEnd };
    }

    // Process diagonal line
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
    let newEndY = lineStart.y - squareSizeFromDiag;
    let newEndX = rising
      ? lineStart.x + squareSizeFromDiag
      : lineStart.x - squareSizeFromDiag;
    return { lineStart, lineEnd: new Point(newEndX, newEndY) };
  };

  render() {
    let { type, rising, centered, start, lineLen, ...otherProps } = this.props;
    let { lineStart, lineEnd } = this.getStartAndEnd();
    return <Line start={lineStart} end={lineEnd} {...otherProps} />;
  }
}

export class Rectangle extends Drawable {
  static Points = Object.freeze({
    TOP_LEFT: "top_left",
    TOP_RIGHT: "top_right",
    BTM_LEFT: "btm_left",
    BTM_RIGHT: "btm_right",
    MIDPOINT: "midpoint",
    MID_LEFT: "mid_left",
    MID_RIGHT: "mid_right"
  });

  draw = p => {
    let { start, width, height, color, strokeWeight } = this.props;
    p.stroke(color);
    p.strokeWeight(strokeWeight);
    p.rect(start.x, start.y, width, height);
  };
}

export class RectangleDrawer extends React.Component {
  static defaultProps = {
    /* targetPoints is an array of objects:
     * {
         target: A point of interest from Square.Points,
         callback: A function that should be called to return target value
       }
     */
    targetPoints: [],
    strokeWeight: 4,
    color: "#000000"
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
      case Rectangle.Points.TOP_LEFT:
        return new Point(start.x, start.y);
      case Rectangle.Points.TOP_RIGHT:
        return new Point(rightX, start.y);
      case Rectangle.Points.BTM_LEFT:
        return new Point(start.x, btmY);
      case Rectangle.Points.BTM_RIGHT:
        return new Point(rightX, btmY);
      case Rectangle.Points.MIDPOINT:
        return new Point(midX, midY);
      case Rectangle.Points.MID_LEFT:
        return new Point(start.x, midY);
      case Rectangle.Points.MID_RIGHT:
        return new Point(rightX, midY);
      default:
        throw new Error("Unknown Square point " + targetPoint);
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
      <Rectangle start={start} width={width} height={height} {...otherProps} />
    );
  }
}

export class Canvas extends React.Component {
  static defaultProps = {
    width: 600,
    height: 400
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
        <RectangleDrawer
          start={new Point(0, 0)}
          color="#FFFFFF"
          {...otherProps}
        />
        {children}
      </div>
    );
  }
}
