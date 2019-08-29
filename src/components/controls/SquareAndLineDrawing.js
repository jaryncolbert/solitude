import React from "react";
import { CenteredSquare, RectPoints } from "../shapes/Rectangle";
import { LineTypes } from "../shapes/Line";
import Point from "../shapes/Point";
import ResponsiveCanvas from "../canvas/ResponsiveCanvas";
import Slider from "../controls/Slider";
import RowGroup from "../controls/RowGroup";
import DrawingInfo from "../controls/DrawingInfo";
import ScalingAndExtensionControls from "../controls/ScalingAndExtensionControls";
import { getRandomInt, getRandomBool } from "../util";
import _ from "underscore";

// Add default controls for scaling square and extending lines
// to all drawings of squares and lines
export default class SquareAndLineDrawing extends React.Component {
  minLen = 5;
  state = {
    randomized: true,
    lineStarts: {},
    lineMaxes: {},
    lineLengths: {},
    sideLen: 0,
    canvasMidpoint: new Point(0, 0),
    canvasHeight: 0,
    canvasWidth: 0,
    canExtend: false,
    scaled: false
  };

  randomize = () => {
    this.setState({
      randomized: true,
      sideLen: getRandomInt(this.minLen, this.state.canvasHeight),
      scaled: getRandomBool(),
      canExtend: getRandomBool()
    });
  };

  componentDidMount() {
    this.props.onRandomize(this.randomize);

    this.setState({
      sideLen: this.props.isThumbnail ? 100 : 225
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSideLen = prevState.sideLen;
    const prevCanExtend = prevState.canExtend;
    const prevSquarePoints = prevState.squarePoints;
    const prevLineLengths = prevState.lineLengths;
    let {
      sideLen,
      scaled,
      canExtend,
      randomized,
      lineLengths,
      lineMaxes,
      squarePoints
    } = this.state;

    let { lineAnchors } = this.props;
    let maxesUpdated = false;

    if (
      canExtend !== prevCanExtend ||
      (lineAnchors &&
        squarePoints &&
        !_.isEqual(prevSquarePoints, squarePoints))
    ) {
      /**
       * Calculate line origins and their max lengths
       * once square points are available
       */
      let newMaxes = {};
      let anchors = {};
      Object.keys(lineAnchors).forEach(k => {
        const lineStart = squarePoints[lineAnchors[k]];
        anchors[k] = lineStart;
        newMaxes[k] = this.getLineMax(lineStart, k);
        maxesUpdated = true;
      });

      let newLengths = {
        ...lineLengths
      };
      if (
        (!canExtend && prevCanExtend) ||
        !_.isEqual(prevSquarePoints, squarePoints)
      ) {
        /**
         * If the line extension is toggled,
         * recalculate the lines' max lengths
         */
        Object.keys(lineLengths).forEach(k => {
          if (lineLengths[k] > newMaxes[k]) {
            newLengths[k] = newMaxes[k];
          }
        });
      }

      this.setState({
        lineStarts: anchors,
        lineMaxes: newMaxes,
        lineLengths: newLengths
      });
    }

    if (scaled && sideLen !== prevSideLen) {
      let newLineLengths = {
        ...prevLineLengths
      };

      // Maintain previous scale of lineLen to squareSize
      Object.keys(lineAnchors).forEach(k => {
        const prevRatio = prevLineLengths[k] / prevSideLen;
        const lineLen = Math.max(Math.round(prevRatio * sideLen), this.minLen);
        newLineLengths[k] = lineLen;
      });

      this.setState({
        lineLengths: newLineLengths
      });
    }

    /**
     * Once sideLen and dependent properties are stabilized,
     * generate random lineLengths if randomization is enabled
     */
    if (
      randomized &&
      !maxesUpdated &&
      prevSideLen === sideLen &&
      !_.isEmpty(lineMaxes)
    ) {
      let newLineLengths = {};
      Object.keys(lineAnchors).forEach(k => {
        newLineLengths[k] = getRandomInt(this.minLen, lineMaxes[k]);
      });

      this.setState({
        randomized: false,
        lineLengths: newLineLengths
      });
    }
  }

  setTargetValue = (e, propName) => {
    this.setState({
      [propName]: Number(e.target.value)
    });
  };

  setLineLen = (e, lineType) => {
    this.setState({
      lineLengths: {
        ...this.state.lineLengths,
        [lineType]: Number(e.target.value)
      }
    });
  };

  toggleValue = (e, propName) => {
    this.setState({
      [propName]: !!e.target.checked
    });
  };

  getLineMax = (lineStart, lineType) => {
    let {
      squareExtent,
      canvasWidth,
      squareDiag,
      canvasDiag,
      canExtend
    } = this.state;

    if (lineType === LineTypes.HORIZONTAL) {
      const extent = canExtend ? canvasWidth : squareExtent;
      return extent - lineStart.x;
    } else {
      return canExtend ? canvasDiag : squareDiag;
    }
  };

  setSquarePoints = points => {
    if (points) {
      this.setState({
        squarePoints: points,
        squareExtent: points[RectPoints.MID_RIGHT].x,
        squareDiag: points[RectPoints.DIAGONAL]
      });
    }
  };

  setCanvasPoints = points => {
    if (points) {
      this.setState({
        canvasMidpoint: points[RectPoints.MIDPOINT],
        canvasWidth: points[RectPoints.MID_RIGHT].x,
        canvasHeight: points[RectPoints.BTM_RIGHT].y,
        canvasDiag: points[RectPoints.DIAGONAL]
      });
    }
  };

  render() {
    const {
      sideLen,
      lineLengths,
      lineStarts,
      lineMaxes,
      canvasMidpoint,
      canvasHeight,
      scaled,
      canExtend
    } = this.state;
    const {
      title,
      instructions,
      year,
      asThumbnail,
      onRandomize,
      children,
      ...otherProps
    } = this.props;

    const drawingInfoProps = {
      title,
      instructions,
      year,
      titleOnly: asThumbnail
    };
    const scalingAndExtensionProps = {
      lineExtensionHandler: e => this.toggleValue(e, "canExtend"),
      squareScalingHandler: e => this.toggleValue(e, "scaled"),
      scaled,
      canExtend
    };
    const controlProps = {
      sideLen,
      minLen: this.minLen,
      squareChangeHandler: e => this.setTargetValue(e, "sideLen"),
      canvasHeight,
      children,
      lineMaxes,
      lineLengths,
      lineChangeHandler: (e, lineType) => this.setLineLen(e, lineType),
      scalingAndExtensionProps: scalingAndExtensionProps
    };

    return (
      <>
        <ResponsiveCanvas
          {...otherProps}
          pointsCallback={this.setCanvasPoints}
          minWidth={sideLen * 1.1}
          minHeight={sideLen * 1.1}>
          <DrawingInfo {...drawingInfoProps} />
          <CenteredSquare
            midpoint={canvasMidpoint}
            sideLen={sideLen}
            pointsCallback={this.setSquarePoints}
          />

          {React.Children.map(this.props.children, c => {
            const lineType = c.props.type;
            return React.cloneElement(c, {
              ...c.props,
              start: lineStarts[lineType] || new Point(0, 0),
              lineLen: lineLengths[lineType] || 0
            });
          })}
        </ResponsiveCanvas>
        {!asThumbnail && <Controls {...controlProps} />}
      </>
    );
  }
}

const Controls = ({
  sideLen,
  minLen,
  squareChangeHandler,
  canvasHeight,
  children,
  lineMaxes,
  lineLengths,
  lineChangeHandler,
  scalingAndExtensionProps
}) => {
  return (
    <div className="drawing-controls container">
      <RowGroup>
        <Slider
          label="Square Size:"
          value={sideLen}
          changeHandler={e => squareChangeHandler(e)}
          min={minLen}
          max={canvasHeight}
        />

        {React.Children.map(children, c => {
          const lineType = c.props.type;

          return (
            <LineControl
              {...c.props}
              lineType={lineType}
              lineMin={minLen}
              lineMax={lineMaxes[lineType] || 0}
              lineLen={lineLengths[lineType] || 0}
              changeHandler={e => lineChangeHandler(e, lineType)}
            />
          );
        })}
      </RowGroup>

      <ScalingAndExtensionControls {...scalingAndExtensionProps} />
    </div>
  );
};

const LineControl = ({
  lineType,
  lineMin,
  lineMax,
  lineLen,
  changeHandler,
  ...otherProps
}) => {
  return (
    <Slider
      {...otherProps}
      label={lineType[0].toUpperCase() + lineType.slice(1) + " Line:"}
      value={lineLen}
      changeHandler={changeHandler}
      min={lineMin}
      max={lineMax}
    />
  );
};
