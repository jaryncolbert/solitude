import React from "react";
import { RectPoints, LineFilledRectangle } from "../shapes/Rectangle";
import Canvas from "../P5Canvas";
import { Button, DrawingInfo, DrawingContainer } from "../CommonComponents";

export default class Drawing85 extends React.Component {
  state = { lines: [] };

  randomize = () => {
    let lines = [];

    this.setState({ lines });
  };

  setPoint = (point, propName) => {
    this.setState({
      [propName]: point
    });
  };

  getPoint = point => {
    return this.state[point];
  };

  // Save coordinates for line origination points on canvas
  getCanvasPoints = () => {
    return [
      {
        target: RectPoints.TOP_LEFT,
        callback: point => this.setPoint(point, "canvasMin")
      },
      {
        target: RectPoints.BTM_RIGHT,
        callback: point => this.setPoint(point, "canvasMax")
      }
    ];
  };


  render() {
    let asThumbnail = this.props.asThumbnail;
    const width = asThumbnail ? this.props.width : 1400;
    const height = asThumbnail ? this.props.height : 500;

    return (
      <DrawingContainer {...this.props}>
        <Canvas targetPoints={this.getCanvasPoints()} width={width} height={height}>
          <DrawingInfo
            titleOnly={asThumbnail}
            title="Wall Drawing 85"
            instructions="A wall is divided into four horizontal parts.
            In the top row are four equal divisions,
            each with lines in a different direction.
            In the second row, six double combinations;
            in the third row, four triple combinations;
            in the bottom row, all four combinations superimposed."
            year="1971"
          />
          <LineFilledRectangle width={300} height={300} lineType="horizontal" lineColor="#FF0000"/>
        </Canvas>
        { !asThumbnail && <Button onClick={this.randomize} /> }
      </DrawingContainer>
    );
  }
}
