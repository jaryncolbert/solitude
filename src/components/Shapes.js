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
}

export class Line extends Drawable {
  draw = (p) => {
    const { start, end, color, strokeWeight } = this.props;
    p.stroke(color);
    p.strokeWeight(strokeWeight);
    p.line(start.x, start.y, end.x, end.y);
  }
}

export class Square extends Drawable {
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
    const { start, sideLen, centered, targetPoints } = this.props;

    // Register each target point and its callback function to pass to parent
    targetPoints.forEach(({ target, callback }) => {
      const point = this.getPoint(target, start, sideLen, centered);
      callback(point);
    });
  }

  getPoint = (targetPoint, start, sideLen, centered) => {
    if (centered) {
      start = this.getOriginFromMidpoint(start, sideLen);
    }

    const halfSideLen = Math.round(sideLen / 2);
    const rightX = start.x + sideLen;
    const midX = start.x + halfSideLen;
    const midY = start.y + halfSideLen;
    const btmY = start.y + sideLen;

    switch(targetPoint) {
      case Square.Points.TOP_LEFT:
        return new Point(start.x, start.y);
      case Square.Points.TOP_RIGHT:
        return new Point(rightX, start.y);
      case Square.Points.BTM_LEFT:
        return new Point(start.x, btmY);
      case Square.Points.BTM_RIGHT:
        return new Point(rightX, btmY);
      case Square.Points.MIDPOINT:
        return new Point(midX, midY);
      case Square.Points.MID_LEFT:
        return new Point(start.x, midY);
      case Square.Points.MID_RIGHT:
        return new Point(rightX, midY);
      default: throw new Error("Unknown Square point " + targetPoint);
    }
  }

  draw = (p) => {
    let { start, sideLen, color, strokeWeight, centered } = this.props;
    p.stroke(color);
    p.strokeWeight(strokeWeight);

    if (centered) {
      start = this.getOriginFromMidpoint(start, sideLen);
    }
    p.rect(start.x, start.y, sideLen, sideLen);
  }

  getOriginFromMidpoint = (midpoint, sideLen) => {
    const halfSideLen = Math.round(sideLen / 2);
    return new Point(midpoint.x - halfSideLen, midpoint.y - halfSideLen);
  }

  componentDidUpdate(prevProps) {
    if (this.props.sideLen !== prevProps.sideLen) {
      // Re-register the target point based on the new start location
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
    const { children } = this.props;
    return (
      <div ref={(e) => this.container = e}>
        {children}
      </div>
    )
  }
}
