import React from 'react';
import p5 from 'p5';
import PropTypes from 'prop-types';

class Drawable extends React.Component {
  static defaultProps = {
    strokeWeight: 4,
    color: "#000000"
  }

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

  draw = (p) => {
    throw new Error('Unimplemented draw method!');
  }

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
    return Number.isInteger(point.x) && (this.x === point.x) &&
      Number.isInteger(point.y) && (this.y === point.y);
  }
}

export class Line extends Drawable {
  draw = (p) => {
    const { start, end, color, strokeWeight } = this.props;
    p.stroke(color);
    p.strokeWeight(strokeWeight);
    p.line(start.x, start.y, end.x, end.y);
  }
}

export class Rectangle extends Drawable {
  static defaultProps = {
    targetPoints: [],
    strokeWeight: 4,
    color: "#000000"
  }

  static Points = Object.freeze({
    TOP_LEFT: "top_left",
    TOP_RIGHT: "top_right",
    BTM_LEFT: "btm_left",
    BTM_RIGHT: "btm_right",
    MIDPOINT: "midpoint",
    MID_LEFT: "mid_left",
    MID_RIGHT: "mid_right"
  });

  constructor(props) {
    super(props);

    this.registerPoints(this.props.targetPoints);
  }

  registerPoints = () => {
    const { start, height, width, centered, targetPoints } = this.props;

    // Register each target point and its callback function to pass to parent
    targetPoints.forEach(({ target, callback }) => {
      const point = this.getPoint(target, start, height, width, centered);
      callback(point);
    });
  }

  getPoint = (targetPoint, start, height, width, centered) => {
    if (centered) {
      start = this.getOriginFromMidpoint(start, height, width);
    }

    const rightX = start.x + width;
    const midX = start.x + Math.round(width / 2);
    const midY = start.y + Math.round(height / 2);
    const btmY = start.y + height;

    switch(targetPoint) {
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
      default: throw new Error("Unknown Square point " + targetPoint);
    }
  }

  draw = (p) => {
    let { start, width, height, color, strokeWeight, centered } = this.props;
    p.stroke(color);
    p.strokeWeight(strokeWeight);

    if (centered) {
      start = this.getOriginFromMidpoint(start, width, height);
    }
    p.rect(start.x, start.y, width, height);
  }

  getOriginFromMidpoint = (midpoint, width, height) => {
    const originX = midpoint.x - Math.round(width / 2);
    const originY = midpoint.y - Math.round(height / 2);
    return new Point(originX, originY);
  }

  componentDidUpdate(prevProps) {
    if (this.props.width !== prevProps.width ||
      this.props.height !== prevProps.height ||
      !prevProps.start.equals(this.props.start)) {
      // Re-register the target points based on the new start location
      // or rectangle dimensions
      this.registerPoints();
    }
  }
}

export class Canvas extends React.Component {
  static defaultProps = {
    width: 600,
    height: 400
  }

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
    }
  }

  componentDidMount() {
    const { setup, draw } = this;

    const sketch = (p) => {
      p.setup = () => setup(p);
      p.draw = () => draw(p);
    };
    this.p = new p5(sketch, this.container);
  }

  setup = (p) => {
    const { width, height } = this.props;
    p.createCanvas(width, height);
  }

  subscribe = (childFn) => {
    this.drawables.push(childFn);
  }

  unsubscribe = (childFn) => {
    this.drawables = this.drawables.filter(c => c !== childFn);
  }

  draw = (p) => {
    p.background(255, 255, 255);
    this.drawables.forEach(c => c(p));
  }

  componentWillUnmount() {
    this.p.remove();
  }

  render() {
    const { children, width, height, targetPoints } = this.props;
    return (
      <div ref={(e) => this.container = e}>
        <Rectangle start={new Point(0, 0)} color="#FFFFFF"
          targetPoints={targetPoints} width={width} height={height}/>
        {children}
      </div>
    )
  }
}
