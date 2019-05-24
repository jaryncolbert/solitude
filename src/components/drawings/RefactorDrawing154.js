import React from 'react';
import { Canvas, Square, Line, Point } from '../Shapes';
import { Button } from '../CommonComponents';
import { getMidpoint, getRandomInt } from '../util';

export class Drawing154 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lineOrigin: new Point(0, 0)
    };
  }

  setLineOrigin = (point) => {
    this.setState({
      lineOrigin: point
    });
  }

  render() {
    let canvasWidth = 600;
    let canvasHeight = 400;
    let sideLen = 300;
    let midpoint = getMidpoint(0, 0, canvasWidth, canvasHeight);
    let lineLen = getRandomInt(0, canvasWidth);


    return (<>
      <Canvas canvasWidth={canvasWidth} canvasHeight={canvasHeight}>
        <Square centered x0={midpoint.x} y0={midpoint.y} sideLen={sideLen}
          targetPoint={Square.Points.MID_LEFT}
          registerPoint={this.setLineOrigin}/>
        <Line x0={this.state.lineOrigin.x} y0={this.state.lineOrigin.y}
          x1={this.state.lineOrigin.x + lineLen} y1={this.state.lineOrigin.y}
          color={"#FF0000"}/>
      </Canvas>
      <Button/>
    </>)
  }
}
