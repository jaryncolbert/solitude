import React from 'react';
import { Canvas, Square, Line, Point } from '../Shapes';
import { Button } from '../CommonComponents';
import { getMidpoint, getRandomInt } from '../util';

export class Drawing154 extends React.Component {
  canvasWidth = 600;
  canvasHeight = 400;

  constructor(props) {
    super(props);

    this.state = {
      lineStart: new Point(0, 0),
      lineLen: getRandomInt(5, this.canvasWidth),
      sideLen: 300
    };
  }

  setLineStart = (point) => {
    this.setState({
      lineStart: point
    });
  }

  randomize = () => {
    let lineMax = this.canvasWidth - this.state.lineStart.x;

    this.setState({
      lineLen: getRandomInt(5, lineMax),
      sideLen: getRandomInt(5, this.canvasHeight)
    });
  }

  render() {
    let midpoint = getMidpoint(0, 0, this.canvasWidth, this.canvasHeight);
    let lineEnd = new Point(this.state.lineStart.x + this.state.lineLen,
      this.state.lineStart.y);

    return (<>
      <Canvas canvasWidth={this.canvasWidth} canvasHeight={this.canvasHeight}>
        <Square start={midpoint} centered sideLen={this.state.sideLen}
          targetPoint={Square.Points.MID_LEFT}
          registerPoint={this.setLineStart}/>
        <Line start={this.state.lineStart} end={lineEnd} color={"#FF0000"}/>
      </Canvas>
      <Button onClick={this.randomize}/>
    </>)
  }
}
