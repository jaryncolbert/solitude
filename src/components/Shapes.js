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
    const { x0, y0, x1, y1,
      color, strokeWeight } = this.props;
    p.stroke(color);
    p.strokeWeight(strokeWeight);
    p.line(x0, y0, x1, y1);
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
    const { targetPoint, registerPoint } = this.props;
    const point = this.getPoint(targetPoint);
    registerPoint(point);
  }

  getPoint = (targetPoint) => {
    const { x0, y0, sideLen } = this.props;
    let halfSideLen = Math.round(sideLen / 2);

    const rightX = x0 + sideLen;
    const midX = x0 + halfSideLen;
    const midY = y0 + halfSideLen;
    const btmY = y0 + sideLen;

    switch(targetPoint) {
      case Square.Points.TOP_LEFT:
        return new Point(x0, y0);
      case Square.Points.TOP_RIGHT:
        return new Point(rightX, y0);
      case Square.Points.BTM_LEFT:
        return new Point(x0, btmY);
      case Square.Points.BTM_RIGHT:
        return new Point(rightX, btmY);
      case Square.Points.MIDPOINT:
        return new Point(midX, midY);
      case Square.Points.MID_LEFT:
        return new Point(x0, midY);
      case Square.Points.MID_RIGHT:
        return new Point(rightX, midY);
      default: throw new Error("Unknown Square point ", targetPoint);
    }
  }

  draw = (p) => {
    const { x0, y0, sideLen, color, strokeWeight } = this.props;
    p.stroke(color);
    p.strokeWeight(strokeWeight);
    p.rect(x0, y0, sideLen, sideLen);
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
