import React from "react";

import Point from "./Point";
import Drawable from "./Drawable";

export default class Line extends Drawable {
  draw = p => {
    const { start, end, color, strokeWeight } = this.props;
    p.stroke(color);
    p.strokeWeight(strokeWeight);
    p.line(start.x, start.y, end.x, end.y);
  };
}

export function horizontal(Line) {
  return class extends React.Component {
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
      return <Line start={lineStart} end={lineEnd} {...otherProps} />;
    }
  };
}

function diagonal(Line) {
  return class extends React.Component {
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
        rising,
        centered,
        rightToLeft,
        start,
        lineLen,
        ...otherProps
      } = this.props;
      let { lineStart, lineEnd } = this.getStartAndEnd(
        rising,
        centered,
        rightToLeft,
        start,
        lineLen
      );
      return <Line start={lineStart} end={lineEnd} {...otherProps} />;
    }
  };
}

export const HorizLine = horizontal(Line);
export const DiagLine = diagonal(Line);
