import React from 'react';
import p5 from 'p5';
import PropTypes from 'prop-types';
import { getSquareStart } from './util';

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

export class Line extends Drawable {
  constructor(props) {
    super(props);
  }

  draw = (p) => {
    const { x0, y0, x1, y1,
      color, strokeWeight } = this.props;
    p.stroke(color);
    p.strokeWeight(strokeWeight);
    p.line(x0, y0, x1, y1);
  }
}

export class Square extends Drawable {
  constructor(props) {
    super(props);
  }

  draw = (p) => {
    const { sideLen, isCentered,
      color, strokeWeight } = this.props;
    p.stroke(color);
    p.strokeWeight(strokeWeight);

    let x0 = this.props.x0;
    let y0 = this.props.y0;
    if (isCentered) {
      // If centered, interpret x and y as midpoints
      // Otherwise, interpret x and y as top-left corner
      let { x, y } = getSquareStart(x0, y0, sideLen);
      x0 = x; y0 = y;
    }
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
