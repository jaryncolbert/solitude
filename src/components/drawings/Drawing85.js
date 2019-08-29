import React from "react";
import { RectPoints } from "../shapes/Rectangle";
import { LineTypes } from "../shapes/Line";
import { RowOfRectangles } from "../utilities/LineFilledRectangle";
import { Colors } from "../utilities/Colors";
import Point from "../shapes/Point";
import ResponsiveCanvas from "../canvas/ResponsiveCanvas";
import DrawingInfo from "../controls/DrawingInfo";
import DrawingContainer from "../controls/DrawingContainer";
import { shuffleArray } from "../util";
import _ from "underscore";

export default class Drawing85 extends React.Component {
  state = { rows: [], canvasWidth: 0 };

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

    const { canvasWidth } = this.state;

    // Get all combinations of randomized properties
    if (canvasWidth && canvasWidth > 0) {
      let prevWidth = 0;
      let rectWidth = Math.round(canvasWidth / rectProps.length);
      rows.push(
        <RowOfRectangles
          key={"rect-row-1"}
          rowStart={new Point(0, 0)}
          rectWidth={rectWidth}
          rectProps={rectProps}
        />
      );
      prevWidth = rectWidth;

      const secondRow = [
        [...rectProps[0], ...rectProps[1]],
        [...rectProps[0], ...rectProps[2]],
        [...rectProps[0], ...rectProps[3]]
      ];
      rectWidth = Math.round(canvasWidth / secondRow.length);
      rows.push(
        <RowOfRectangles
          key={"rect-row-2"}
          rowStart={new Point(0, prevWidth)}
          rectWidth={rectWidth}
          rectProps={secondRow}
        />
      );
      prevWidth = rectWidth;

      this.setState({ rows });
    }
  };

  setValue = (value, propName) => {
    this.setState({
      [propName]: value
    });
  };

  setCanvasPoints = points => {
    this.setState({
      canvasWidth:
        points[RectPoints.MID_RIGHT].x - points[RectPoints.MID_LEFT].x
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevState["rows"].length === 0 && !!this.state.rows) ||
      !_.isEqual(prevState.canvasPoints, this.state.canvasPoints)
    ) {
      this.randomize();
    }
  }

  render() {
    const instructions = (
      <>
        <b>Note</b>: This drawing is a work-in-progress and does not accurately
        convey Sol's instructions.
        <br />
        <br />A wall is divided into four horizontal parts. In the top row are
        four equal divisions, each with lines in a different direction. In the
        second row, six double combinations; in the third row, four triple
        combinations; in the bottom row, all four combinations superimposed.
      </>
    );

    return (
      <DrawingContainer {...this.props} onRandomize={this.randomize}>
        <ResponsiveCanvas
          pointsCallback={this.setCanvasPoints}
          width={this.props.width}
          height={this.props.height}>
          <DrawingInfo
            titleOnly={this.props.asThumbnail}
            title="WIP: Wall Drawing 85"
            instructions={instructions}
            year="1971"
          />
          {this.state.rows}
        </ResponsiveCanvas>
      </DrawingContainer>
    );
  }
}
