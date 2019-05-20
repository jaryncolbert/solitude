import React from 'react';
import { Canvas, Square, Line } from '../Shapes';
import { Button } from '../CommonComponents';
import { getMidpoint, getRandomInt } from '../util';

export class Drawing154 extends React.Component {
  render() {
    let canvasWidth = 400;
    let canvasHeight = 400;

    let midpoint = getMidpoint(0, 0, canvasWidth, canvasHeight);
    let lineLen = getRandomInt(0, canvasWidth);

    let sideLen = 300;
    let halfSideLen = Math.round(sideLen / 2);
    let sqOriginX = midpoint.x - halfSideLen;
    let sqOriginY = midpoint.y - halfSideLen;
    let lineOriginX = sqOriginX;
    let lineOriginY = midpoint.y;

    return <Canvas width={canvasWidth} height={canvasHeight}>
      <Square x0={sqOriginX} y0={sqOriginY} sideLen={sideLen}/>
      <Line x0={lineOriginX} y0={lineOriginY}
        x1={lineOriginX + lineLen} y1={lineOriginY} color={"#FF0000"}/>
      <Button/>
    </Canvas>
  }
}
