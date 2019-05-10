import React from 'react';
import p5 from 'p5';
import PropTypes from 'prop-types';

class Drawable extends React.Component {
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
    throw `Unimplemented draw method!`;
  }

  render() {
    return null;
  }
}

class Line extends Drawable {
  draw = (p) => {
    const { x0, y0, x1, y1 } = this.props;
    p.stroke(255, 0, 0);
    p.line(x0, y0, x1, y1);
  }
}

class Canvas extends React.Component {
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
    console.log("subscribed! ", childFn);
  }

  unsubscribe = (childFn) => {
    this.drawables = this.drawables.filter(c => c !== childFn);
    console.log("unsubscribed! ", childFn);
  }

  draw = (p) => {
    p.background(0);
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

export class Test extends React.Component {
  render() {
    return <Canvas width={400} height={400}>
      <Line x0={0} y0={0} x1={100} y1={100} />
    </Canvas>
  }
}
