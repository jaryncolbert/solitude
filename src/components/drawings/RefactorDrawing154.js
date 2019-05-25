import React from 'react';
import { Canvas, Square, Line, Point } from '../Shapes';
import { Button, Slider, RowGroup } from '../CommonComponents';
import { getMidpoint, getRandomInt } from '../util';

export class Drawing154 extends React.Component {
  canvasWidth = 600;
  canvasHeight = 400;
  midpoint = getMidpoint(0, 0, this.canvasWidth, this.canvasHeight);
  minLen = 5;

  constructor(props) {
    super(props);

    const extent = this.canvasWidth;
    const lineLen = getRandomInt(this.minLen, extent);
    const lineStart = new Point(0, 0);

    this.state = {
      lineStart: lineStart,
      lineLen: lineLen,
      sideLen: 300,
      extent: extent,
    };
  }

  setExtent = (max) => {
    // Signifies the greatest x value to which the line can extend
    this.setState({
      extent: max
    });
  }

  setLineStart = (point) => {
    this.setState({
      lineStart: point
    });
  }

  setTargetValue = (e, propName) => {
    let value = Number(e.target.value);

    this.setState({
      [propName]: value
    });
  }

  randomize = () => {
    const lineMax = this.getLineMax();

    this.setState({
      lineLen: getRandomInt(this.minLen, lineMax),
      sideLen: getRandomInt(this.minLen, this.canvasHeight)
    });
  }

  getLineMax = () => {
    return this.state.extent - this.state.lineStart.x;
  };

  render() {
    const lineEnd = new Point(this.state.lineStart.x + this.state.lineLen,
      this.state.lineStart.y);
    const lineMax = this.getLineMax();

    return (<>
      <Canvas canvasWidth={this.canvasWidth} canvasHeight={this.canvasHeight}>
        <Square start={this.midpoint} centered sideLen={this.state.sideLen}
          targetPoint={Square.Points.MID_LEFT}
          registerPoint={this.setLineStart}/>
        <Line start={this.state.lineStart} end={lineEnd} color={"#FF0000"}/>
      </Canvas>

      <RowGroup>
        <Slider label="Square Size:"
          value={this.state.sideLen}
          changeHandler={(e) => this.setTargetValue(e, "sideLen")}
          min={this.minLen} max={this.canvasHeight}/>
        <Slider label="Line Length:"
          value={this.state.lineLen}
          changeHandler={(e) => this.setTargetValue(e, "lineLen")}
          min={this.minLen} max={lineMax}/>
      </RowGroup>

      <Button onClick={this.randomize}/>
    </>)
  }
}
