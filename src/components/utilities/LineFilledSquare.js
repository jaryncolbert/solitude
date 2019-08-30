import React from "react";

import Point from "../shapes/Point";
import Line, { HorizLine, VertLine, LineTypes } from "../shapes/Line";
import Colors from "./Colors";

const HorizLineSquare = ({
  start,
  lineWeight,
  lineColor,
  lineSpacing,
  sideLen
}) => {
  let lines = [];

  for (let y = start.y; y <= start.y + sideLen; y = y + lineSpacing) {
    lines.push(
      <HorizLine
        key={"horiz-" + start.x + "-" + y}
        color={lineColor}
        strokeWeight={lineWeight}
        start={new Point(start.x, y)}
        lineLen={sideLen}
      />
    );
  }
  return lines;
};

const VertLineSquare = ({
  start,
  lineWeight,
  lineColor,
  lineSpacing,
  sideLen
}) => {
  let lines = [];

  for (let x = start.x; x <= start.x + sideLen; x = x + lineSpacing) {
    lines.push(
      <VertLine
        key={"vert-" + x + "-" + start.y}
        color={lineColor}
        strokeWeight={lineWeight}
        start={new Point(x, start.y)}
        lineLen={sideLen}
      />
    );
  }
  return lines;
};

const DiagLineSquare = ({
  start,
  lineWeight,
  lineColor,
  lineType,
  lineSpacing,
  sideLen
}) => {
  let lines = [];
  const maxWidth = start.x + sideLen;
  const maxHeight = start.y + sideLen;

  for (let z = lineSpacing; z <= sideLen; z = z + lineSpacing) {
    const topStartX = start.x;
    const topEndX = start.x + z;
    const btmStartX = maxWidth - z;
    const btmEndX = maxWidth;

    const isRising = lineType === LineTypes.DIAG_RISING;
    const topStartY = isRising ? start.y + z : maxHeight - z;
    const topEndY = isRising ? start.y : maxHeight;
    const btmStartY = isRising ? maxHeight : start.y;
    const btmEndY = isRising ? maxHeight - z : start.y + z;

    // First push diagonal line for top of square...
    lines.push(
      <Line
        key={"diag-top-" + lineType + "-" + z}
        color={lineColor}
        strokeWeight={lineWeight}
        start={new Point(topStartX, topStartY)}
        end={new Point(topEndX, topEndY)}
      />
    );
    // ...Then push diagonal line for bottom of square
    lines.push(
      <Line
        key={"diag-btm-" + lineType + "-" + z}
        color={lineColor}
        strokeWeight={lineWeight}
        start={new Point(btmStartX, btmStartY)}
        end={new Point(btmEndX, btmEndY)}
      />
    );
  }
  return lines;
};

export const LineFilledSquare = ({ lineType, ...otherProps }) => {
  const props = {
    start: new Point(0, 0),
    sideLen: 300,
    lineSpacing: 2,
    lineWeight: 1,
    lineColor: Colors.BLACK,
    color: Colors.WHITE,
    lineType,
    ...otherProps
  };
  let lines = [];

  switch (lineType) {
    case LineTypes.HORIZONTAL:
      lines = HorizLineSquare(props);
      break;
    case LineTypes.VERTICAL:
      lines = VertLineSquare(props);
      break;
    case LineTypes.DIAG_RISING:
      lines = DiagLineSquare(props);
      break;
    case LineTypes.DIAG_FALLING:
      lines = DiagLineSquare(props);
      break;
    default:
      throw new Error("Unknown line type: ", lineType);
  }

  return lines;
};

export const RowOfSquares = ({
  rowStart,
  sideLen,
  squareProps,
  ...otherProps
}) => {
  let squares = [];

  for (let i = 0; i < squareProps.length; i++) {
    for (let j = 0; j < squareProps[i].length; j++) {
      squares.push(
        <LineFilledSquare
          {...otherProps}
          key={"filled-square-" + i + "-" + j}
          start={new Point(sideLen * i + rowStart.x, rowStart.y)}
          sideLen={sideLen}
          lineType={squareProps[i][j]["lineType"]}
          lineColor={squareProps[i][j]["lineColor"]}
        />
      );
    }
  }

  return squares;
};

export default LineFilledSquare;
