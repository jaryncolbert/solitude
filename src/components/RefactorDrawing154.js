import React from 'react';
import p5 from 'p5';

class Line extends React.Component {
  componentWillMount() {

  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {
    this.draw();
  }

  componentWillUnmount() {

  }

  draw(p) {
    const { x0, y0, x1, y1 } = this.props;
    p.stroke(255,0,0);
    p.line(x0, y0, x1, y1);
  }

}

class Canvas extends React.Component {
  static defaultProps = {
    width: 600,
    height: 400
  }

  componentDidMount() {
    const { setup, draw } = this;
    //this.drawables = [];

    const sketch = (p) => {
      p.setup = () => setup(p);
      p.draw = () => draw(p);
    };
    this.p = new p5(sketch, this.container);

    // DEBUG!
    window.mycanvas = this;
  }

  setup = (p) => {
    const { width, height } = this.props;
    p.createCanvas(width, height);
  }

  draw(p) {
    p.background(0);
    /*
    if (Array.isArray(children)) {
      children.map((c) => c.draw && c.draw(p));
    } else {
      children.draw && children.draw(p);
    }*/
  }

  componentDidUpdate(prevProps) {

  }

  componentWillUnmount() {
    this.p.remove();
  }

  render() {
    const { width, height } = this.props;
    return (
      <div ref={(e) => this.container = e}/>
    )
  }
}

export class Test extends React.Component {
  render() {
    return <Canvas width={400} height={400}>
      <Line x0={0} y0={0} x1={100} y1={100} color="red" />
    </Canvas>
  }
}
