import React from "react";
import { RectPoints } from "../shapes/Rectangle";
import { LineTypes } from "../shapes/Line";
import { RowOfRectangles } from "../utilities/LineFilledRectangle";
import { Colors } from "../utilities/Colors";
import Point from "../shapes/Point";
import Canvas from "../P5Canvas";
import { Button, DrawingInfo, DrawingContainer } from "../CommonComponents";
import { shuffleArray } from "../util";

export default class Drawing85 extends React.Component {
  state = { rows: [] };

  randomize = () => {
    // Shallow clone of objects to shuffle in-place
    const colors = [Colors.RED, Colors.BLUE, Colors.BLACK, Colors.YELLOW];
    shuffleArray(colors);
    const lineTypes = Object.values({ ...LineTypes });
    shuffleArray(lineTypes);
    let rows = [];

    // Zip colors with line types to get random properties
    const rectProps = colors.map((c, i) => {
      return [{ lineColor: c, lineType: lineTypes[i] }];
    });

    // Get all combinations of randomized properties
    if (this.state.canvasWidth) {
      let rectWidth = Math.round(this.state.canvasWidth / rectProps.length);
      rows.push(
        <RowOfRectangles
          key={"rect-row-1"}
          rowStart={new Point(0, 0)}
          rectWidth={rectWidth}
          rectProps={rectProps}
        />
      );

      this.setState({ rows });
    }
  };

  setValue = (value, propName) => {
    this.setState({
      [propName]: value
    });
  };

  // Save coordinates for line origination points on canvas
  getCanvasPoints = () => {
    return [
      {
        target: RectPoints.BTM_RIGHT,
        callback: point => {
          this.setValue(point.x, "canvasWidth");
        }
      }
    ];
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState["rows"].length === 0 && !!this.state.rows) {
      this.randomize();
    }
  }

  render() {
    let asThumbnail = this.props.asThumbnail;
    const width = asThumbnail ? this.props.width : 1400;
    const height = asThumbnail ? this.props.height : 500;

    return (
      <DrawingContainer {...this.props}>
        <Canvas
          targetPoints={this.getCanvasPoints()}
          width={width}
          height={height}
        >
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
          {this.state.rows}
        </Canvas>
        {!asThumbnail && <Button onClick={this.randomize} />}
      </DrawingContainer>
    );
  }
}
