import React from "react";
import RowGroup from "../controls/RowGroup";
import { HorizLine, DiagLine, LineTypes } from "../shapes/Line";
import SquareAndLineDrawing from "../controls/SquareAndLineDrawing";
import { RectPoints } from "../shapes/Rectangle";
import Drawing from "../controls/Drawing";

const SquareDrawings = props => {
  // Override default scaling so that square drawings are 2x2
  const defaultProps = {
    scaleWidth: 0.4,
    scaleHeight: 0.35,
    lineColor: "#FF0000",
    ...props
  };

  return (
    <div className="container-fluid">
      <RowGroup>
        <Drawing154 {...defaultProps} />
        <Drawing159 {...defaultProps} />
      </RowGroup>
      <RowGroup>
        <Drawing160 {...defaultProps} />
        <Drawing164 {...defaultProps} />
      </RowGroup>
    </div>
  );
};

const Drawing154 = ({ lineColor, ...otherProps }) => {
  return (
    <Drawing {...otherProps}>
      <SquareAndLineDrawing
        {...otherProps}
        title="Wall Drawing 154"
        instructions="A black outlined square with a red
  horizontal line from the midpoint of the left side toward the
  middle of the right side."
        year="1973"
        lineAnchors={{
          [LineTypes.HORIZONTAL]: RectPoints.MID_LEFT
        }}>
        <HorizLine color={lineColor} />
      </SquareAndLineDrawing>
    </Drawing>
  );
};

const Drawing159 = ({ lineColor, ...otherProps }) => {
  return (
    <Drawing {...otherProps}>
      <SquareAndLineDrawing
        {...otherProps}
        title="Wall Drawing 159"
        instructions="A black outlined square
  with a red diagonal line
  from the lower left corner
  toward the upper right corner;
  and another red line
  from the lower right corner
  to the upper left."
        year="1973"
        lineAnchors={{
          [LineTypes.DIAG_RISING]: RectPoints.BTM_LEFT,
          [LineTypes.DIAG_FALLING]: RectPoints.BTM_RIGHT
        }}>
        <DiagLine type={LineTypes.DIAG_RISING} color={lineColor} />
        <DiagLine type={LineTypes.DIAG_FALLING} rightToLeft color={lineColor} />
      </SquareAndLineDrawing>
    </Drawing>
  );
};

const Drawing160 = ({ lineColor, ...otherProps }) => {
  return (
    <Drawing {...otherProps}>
      <SquareAndLineDrawing
        {...otherProps}
        title="Wall Drawing 160"
        instructions="A black outlined square
            with a red diagonal line
            centered on the axis
            between the upper left and lower right corners
            and another red diagonal line
            centered on the axis
            between the lower left and upper right corners."
        year="1973"
        lineAnchors={{
          [LineTypes.DIAG_RISING]: RectPoints.MIDPOINT,
          [LineTypes.DIAG_FALLING]: RectPoints.MIDPOINT
        }}>
        <DiagLine type={LineTypes.DIAG_RISING} centered color={lineColor} />
        <DiagLine type={LineTypes.DIAG_FALLING} centered color={lineColor} />
      </SquareAndLineDrawing>
    </Drawing>
  );
};

const Drawing164 = ({ lineColor, ...otherProps }) => {
  return (
    <Drawing {...otherProps}>
      <SquareAndLineDrawing
        {...otherProps}
        title="Wall Drawing 164"
        instructions="A black outlined square
            with a red horizontal line centered on the axis
            between the midpoint of the left side
            and the midpoint of the right side
            and a red diagonal line centered on the axis
            between the lower left and upper right corners."
        year="1973"
        lineAnchors={{
          [LineTypes.DIAG_RISING]: RectPoints.MIDPOINT,
          [LineTypes.HORIZONTAL]: RectPoints.MIDPOINT
        }}>
        <DiagLine type={LineTypes.DIAG_RISING} centered color={lineColor} />
        <HorizLine centered color={lineColor} />
      </SquareAndLineDrawing>
    </Drawing>
  );
};

export default SquareDrawings;
