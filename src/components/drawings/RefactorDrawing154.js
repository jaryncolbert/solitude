import React from 'react';
import { Canvas, Square, Line } from '../Shapes';
import { getMidpoint, getRandomInt } from '../util';

export class Drawing154 extends React.Component {
  render() {
    let canvasWidth = 400;
    let canvasHeight = 400;

    let { x, y } = getMidpoint(0, 0, canvasWidth, canvasHeight);
    let lineLen = getRandomInt(0, canvasWidth);

    let sideLen = 300;
    let halfSideLen = Math.round(sideLen / 2);
    let lineOriginX = x - halfSideLen;

    return <Canvas width={canvasWidth} height={canvasHeight}>
      <Square x0={x} y0={y} sideLen={sideLen} isCentered={true}/>
      <Line x0={lineOriginX} y0={y}
        x1={lineOriginX + lineLen} y1={y} color={"#FF0000"}/>
    </Canvas>
  }
}
