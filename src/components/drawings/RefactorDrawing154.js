import React from 'react';
import { Canvas, Square, Line } from '../Shapes';
import { Button } from '../CommonComponents';
import { getMidpoint, getRandomInt } from '../util';

export class Drawing154 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lineOriginX: 0,
      lineOriginY: 0
    };
  }

  setLineOrigin = ({x, y}) => {
    this.setState({
      lineOriginX: x,
      lineOriginY: y
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
        <Line x0={this.state.lineOriginX} y0={this.state.lineOriginY}
          x1={this.state.lineOriginX + lineLen} y1={this.state.lineOriginY}
          color={"#FF0000"}/>
      </Canvas>
      <Button/>
    </>)
  }
}
