import React from 'react';
import { Canvas, Square, Line, Point } from '../Shapes';
import { Button } from '../CommonComponents';
import { getMidpoint, getRandomInt } from '../util';

export class Drawing154 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lineStart: new Point(0, 0)
    };
  }

  setLineStart = (point) => {
    this.setState({
      lineStart: point
    });
  }

  render() {
    let canvasWidth = 600;
    let canvasHeight = 400;
    let sideLen = 300;
    let midpoint = getMidpoint(0, 0, canvasWidth, canvasHeight);
    let lineLen = getRandomInt(0, canvasWidth);
    let lineEnd = new Point(this.state.lineStart.x + lineLen,
      this.state.lineStart.y);

    return (<>
      <Canvas canvasWidth={canvasWidth} canvasHeight={canvasHeight}>
        <Square start={midpoint} centered sideLen={sideLen}
          targetPoint={Square.Points.MID_LEFT}
          registerPoint={this.setLineStart}/>
        <Line start={this.state.lineStart} end={lineEnd}
          color={"#FF0000"}/>
      </Canvas>
      <Button/>
    </>)
  }
}
