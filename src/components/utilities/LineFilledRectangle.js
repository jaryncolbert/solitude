import React from "react";

import Point from "../shapes/Point";
import Line, { HorizLine, VertLine, LineTypes } from "../shapes/Line";
import { SimpleRectangle } from "../shapes/Rectangle";

export default class LineFilledRectangle extends React.Component {
  static defaultProps = {
    start: new Point(0, 0),
    width: 300,
    height: 300,
    lineSpacing: 10,
    lineWeight: 4,
    lineColor: "#000000",
    color: "#FFFFFF"
  };

  generateHorizLines = () => {
    const {
      start,
      lineWeight,
      lineColor,
      lineSpacing,
      width,
      height
    } = this.props;
    let lines = [];

    for (let y = start.y; y <= start.y + height; y = y + lineSpacing) {
      lines.push(
        <HorizLine
          key={"horiz-" + start.x + "-" + y}
          color={lineColor}
          strokeWeight={lineWeight}
          start={new Point(start.x, y)}
          lineLen={width}
        />
      );
    }
    return lines;
  };

  generateVertLines = () => {
    const {
      start,
      lineWeight,
      lineColor,
      lineSpacing,
      width,
      height
    } = this.props;
    let lines = [];

    for (let x = start.x; x <= start.x + width; x = x + lineSpacing) {
      lines.push(
        <VertLine
          key={"vert-" + x + "-" + start.y}
          color={lineColor}
          strokeWeight={lineWeight}
          start={new Point(x, start.y)}
          lineLen={height}
        />
      );
    }
    return lines;
  };

  generateDiagLines = () => {
    const {
      start,
      lineWeight,
      lineColor,
      lineType,
      lineSpacing,
      width,
      height
    } = this.props;
    let lines = [];
    const startPoint = width > height ? start.x : start.y;
    const maxWidth = start.x + width;
    const maxHeight = start.y + height;
    const max = width > height ? maxWidth : maxHeight;

    for (let z = startPoint + lineSpacing; z <= max; z = z + lineSpacing) {
      const topStartX = start.x;
      const topEndX = start.x + z;
      const btmStartX = maxWidth - z;
      const btmEndX = maxWidth;

      const isRising = lineType === LineTypes.DIAG_RISING;
      const topStartY = isRising ? start.y + z : maxHeight - z;
      const topEndY = isRising ? start.y : maxHeight;
      const btmStartY = isRising ? maxHeight : start.y;
      const btmEndY = isRising ? maxHeight - z : start.y + z;

      // First push diagonal line for top of rectangle...
      lines.push(
        <Line
          key={"diag-top-" + lineType + "-" + z + "-" + z}
          color={lineColor}
          strokeWeight={lineWeight}
          start={new Point(topStartX, topStartY)}
          end={new Point(topEndX, topEndY)}
        />
      );
      // ...Then push diagonal line for bottom of rectangle
      lines.push(
        <Line
          key={"diag-btm-" + lineType + "-" + z + "-" + z}
          color={lineColor}
          strokeWeight={lineWeight}
          start={new Point(btmStartX, btmStartY)}
          end={new Point(btmEndX, btmEndY)}
        />
      );
    }
    return lines;
  };

  render() {
    const {
      lineType,
      lineWeight,
      lineColor,
      lineSpacing,
      ...otherProps
    } = this.props;
    let lines = [];

    switch (lineType) {
      case LineTypes.HORIZONTAL:
        lines = this.generateHorizLines();
        break;
      case LineTypes.VERTICAL:
        lines = this.generateVertLines();
        break;
      case LineTypes.DIAG_RISING:
        lines = this.generateDiagLines();
        break;
      case LineTypes.DIAG_FALLING:
        lines = this.generateDiagLines();
        break;
      default:
        throw new Error("Unknown line type: ", lineType);
    }

    return (
      <>
        <SimpleRectangle {...otherProps} />
        {lines}
      </>
    );
  }
}

export function RowOfRectangles({
  rowStart,
  rectWidth,
  rectProps,
  ...otherProps
}) {
  let rects = [];

  for (let i = 0; i < rectProps.length; i++) {
    for (let j = 0; j < rectProps[i].length; j++) {
      rects.push(
        <LineFilledRectangle
          {...otherProps}
          key={"filled-rect-" + i + "-" + j}
          start={new Point(rectWidth * i + rowStart.x, rowStart.y)}
          width={rectWidth}
          height={rectWidth}
          lineType={rectProps[i][j]["lineType"]}
          lineColor={rectProps[i][j]["lineColor"]}
        />
      );
    }
  }

  return rects;
}
