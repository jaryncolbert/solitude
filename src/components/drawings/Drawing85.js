import React from "react";
import { RectPoints } from "../shapes/Rectangle";
import { LineTypes } from "../shapes/Line";
import { RowOfSquares } from "../utilities/LineFilledSquare";
import Colors from "../utilities/Colors";
import Point from "../shapes/Point";
import ResponsiveCanvas from "../canvas/ResponsiveCanvas";
import DrawingInfo from "../controls/DrawingInfo";
import DrawingContainer from "../controls/DrawingContainer";
import { shuffleArray, generatePowerSet } from "../util";
import _ from "underscore";

export default class Drawing85 extends React.Component {
  state = { powerSet: [], canvasWidth: 0 };

  randomize = () => {
    const { canvasWidth } = this.state;

    if (canvasWidth && canvasWidth > 0) {
      const colors = [Colors.RED, Colors.BLUE, Colors.BLACK, Colors.YELLOW];
      shuffleArray(colors);
      // Shallow clone of objects to shuffle in-place
      const lineTypes = Object.values({ ...LineTypes });
      shuffleArray(lineTypes);

      // Zip colors with line types to get random properties
      const sqProps = colors.map((c, i) => {
        return { lineColor: c, lineType: lineTypes[i] };
      });

      // Get all combinations of randomized properties
      this.setState({ powerSet: generatePowerSet(sqProps) });
    }
  };

  setCanvasPoints = points => {
    this.setState({
      canvasWidth:
        points[RectPoints.MID_RIGHT].x - points[RectPoints.MID_LEFT].x
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      _.isEmpty(this.state.powerSet) ||
      prevState.canvasWidth !== this.state.canvasWidth
    ) {
      this.randomize();
    }
  }

  generateRows = () => {
    const { powerSet, canvasWidth } = this.state;
    let rows = [];

    let prevRowHeight = 0;
    for (let i = 1; i <= 4; i++) {
      const squareProps = powerSet.filter(set => set.length === i);
      const sqWidth = Math.round(canvasWidth / squareProps.length);

      rows.push(
        <RowOfSquares
          squareProps={squareProps}
          key={"square-row-" + i}
          sideLen={sqWidth}
          rowStart={new Point(0, prevRowHeight)}
        />
      );

      prevRowHeight += sqWidth;
    }

    return rows;
  };

  render() {
    return (
      <DrawingContainer {...this.props} onRandomize={this.randomize}>
        <ResponsiveCanvas
          {...this.props}
          pointsCallback={this.setCanvasPoints}
          height={this.state.canvasWidth}>
          <DrawingInfo
            titleOnly={this.props.asThumbnail}
            title="Wall Drawing 85"
            instructions="A wall is divided into four horizontal parts. In the top row are
            four equal divisions, each with lines in a different direction. In the
            second row, six double combinations; in the third row, four triple
            combinations; in the bottom row, all four combinations superimposed."
            year="1971"
          />
          {this.generateRows()}
        </ResponsiveCanvas>
      </DrawingContainer>
    );
  }
}
