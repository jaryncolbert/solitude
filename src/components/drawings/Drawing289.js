import React from "react";
import { RectPoints } from "../shapes/Rectangle";
import Point from "../shapes/Point";
import Line from "../shapes/Line";
import Canvas from "../P5Canvas";
import {
  Button,
  DrawingInfo,
  DrawingContainer
} from "../CommonComponents";

export default class Drawing289 extends React.Component {
  minLen = 20;

  randomize = () => {
    return null;
  };

  setPoint = (point, propName) => {
    this.setState({
      [propName]: point
    });
  };

  // Save coordinates for line origination points on canvas
  getCanvasPoints = () => {
    // For each point, create a fn that sets a state prop using its name
    return Object.values(RectPoints).map(point => {
      return {
        target: point,
        callback: p => this.setPoint(p, point)
      }
    });
  };

  render() {
    return (
      <DrawingContainer {...this.props}>
        <Canvas
          targetPoints={this.getCanvasPoints()}
        >
          <DrawingInfo
            title="Wall Drawing 289"
            instructions="A 6-inch (15 cm) grid covering each of the four black
          walls. White lines to points on the grids. Fourth wall: twenty-four
          lines from the center, twelve lines from the midpoint of each of the
          sides, twelve lines from each corner. (The length of the lines and
          their placement are determined by the drafter.)"
            year="1976"
          />
        </Canvas>
        <Button onClick={this.randomize} />
      </DrawingContainer>
    );
  }
}
