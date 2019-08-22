import React from "react";

import Point from "./Point";
import Drawable from "./Drawable";
import withRandomize from "../controls/Randomizer";

export const LineTypes = Object.freeze({
  DIAG_RISING: "rising",
  DIAG_FALLING: "falling",
  VERTICAL: "vertical",
  HORIZONTAL: "horizontal"
});

export default class Line extends Drawable {
  draw = p => {
    const { start, end, color, strokeWeight } = this.props;
    p.stroke(color);
    p.strokeWeight(strokeWeight);
    p.line(start.x, start.y, end.x, end.y);
  };
}

export function horizontal(Line) {
  return class HorizontalLine extends React.Component {
    static defaultProps = {
      type: LineTypes.HORIZONTAL
    };

    getStartAndEnd = (centered, rightToLeft, start, lineLen) => {
      let lineStart = start;
      let lineEnd = new Point(0, 0);
      if (centered) {
        lineStart = new Point(
          lineStart.x - Math.round(lineLen / 2),
          lineStart.y
        );
      }

      lineEnd = rightToLeft
        ? new Point(lineStart.x - lineLen, lineStart.y)
        : new Point(lineStart.x + lineLen, lineStart.y);
      return { lineStart, lineEnd };
    };

    render() {
      let { centered, rightToLeft, start, lineLen, ...otherProps } = this.props;
      let { lineStart, lineEnd } = this.getStartAndEnd(
        centered,
        rightToLeft,
        start,
        lineLen
      );
      return <Line {...otherProps} start={lineStart} end={lineEnd} />;
    }
  };
}

export function vertical(Line) {
  return class VerticalLine extends React.Component {
    static defaultProps = {
      type: LineTypes.VERTICAL
    };

    getStartAndEnd = (centered, btmToTop, start, lineLen) => {
      let lineStart = start;
      let lineEnd = new Point(0, 0);
      if (centered) {
        lineStart = new Point(
          lineStart.x,
          lineStart.y - Math.round(lineLen / 2)
        );
      }

      lineEnd = btmToTop
        ? new Point(lineStart.x, lineStart.y - lineLen)
        : new Point(lineStart.x, lineStart.y + lineLen);
      return { lineStart, lineEnd };
    };

    render() {
      let { centered, btmToTop, start, lineLen, ...otherProps } = this.props;
      let { lineStart, lineEnd } = this.getStartAndEnd(
        centered,
        btmToTop,
        start,
        lineLen
      );
      return <Line {...otherProps} start={lineStart} end={lineEnd} />;
    }
  };
}

function diagonal(Line) {
  return class DiagonalLine extends React.Component {
    calcSquareSideFromHypotenuse = hypotenuse => {
      return Math.round(hypotenuse / Math.sqrt(2));
    };

    getStartAndEnd = (rising, centered, rightToLeft, start, lineLen) => {
      let lineStart = start;
      if (centered) {
        //Calculate new start point from midpoint
        /* Half of lineLen is hypotenuse, line extends equally to/from midpoint
         * to the start and end of the line
         */
        let hypotenuse = lineLen / 2;
        let squareSizeFromDiag = this.calcSquareSideFromHypotenuse(hypotenuse);
        let newStartX = lineStart.x - squareSizeFromDiag;
        let newStartY = rising
          ? lineStart.y + squareSizeFromDiag
          : lineStart.y - squareSizeFromDiag;

        lineStart = new Point(newStartX, newStartY);
      }

      /* Get width/height of square that comprises this diagonal line
       * to find line end point
       */
      let hypotenuse = lineLen;
      let squareSizeFromDiag = this.calcSquareSideFromHypotenuse(hypotenuse);
      let newEndY =
        (!rising && !rightToLeft) || (rising && rightToLeft)
          ? lineStart.y + squareSizeFromDiag
          : lineStart.y - squareSizeFromDiag;
      let newEndX = !rightToLeft
        ? lineStart.x + squareSizeFromDiag
        : lineStart.x - squareSizeFromDiag;
      let lineEnd = new Point(newEndX, newEndY);

      return { lineStart, lineEnd };
    };

    render() {
      let {
        type,
        centered,
        rightToLeft,
        start,
        lineLen,
        ...otherProps
      } = this.props;
      let { lineStart, lineEnd } = this.getStartAndEnd(
        type === LineTypes.DIAG_RISING,
        centered,
        rightToLeft,
        start,
        lineLen
      );

      return <Line {...otherProps} start={lineStart} end={lineEnd} />;
    }
  };
}

export const VertLine = vertical(Line);
export const HorizLine = horizontal(Line);
export const DiagLine = diagonal(Line);
export const RandomVertLine = withRandomize(VertLine);
export const RandomHorizLine = withRandomize(HorizLine);
export const RandomDiagLine = withRandomize(DiagLine);
