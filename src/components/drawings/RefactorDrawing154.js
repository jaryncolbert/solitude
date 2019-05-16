import React from 'react';
import { Canvas, Square, Line } from '../Shapes';
import { getMidpoint } from '../util';

export class Drawing154 extends React.Component {
  render() {
    let canvasWidth = 400;
    let canvasHeight = 400;

    let { x, y } = getMidpoint(0, 0, canvasWidth, canvasHeight);
    return <Canvas width={canvasWidth} height={canvasHeight}>
      <Square x0={x} y0={y} sideLen={300} isCentered={true}/>
      <Line x0={0} y0={0} x1={100} y1={100} color={"#FF0000"}/>
    </Canvas>
  }
}
