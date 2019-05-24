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
    let midpoint = getMidpoint(0, 0, canvasWidth, canvasHeight);
    let lineLen = getRandomInt(0, canvasWidth);

    let sideLen = 300;
    let halfSideLen = Math.round(sideLen / 2);
    let sqOriginX = midpoint.x - halfSideLen;
    let sqOriginY = midpoint.y - halfSideLen;

    return (<>
      <Canvas canvasWidth={canvasWidth} canvasHeight={canvasHeight}>
        <Square x0={sqOriginX} y0={sqOriginY} sideLen={sideLen}
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
