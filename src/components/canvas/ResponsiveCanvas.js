import React from "react";
import Canvas from "./P5Canvas";
import _ from "underscore";

export default class ResponsiveCanvas extends React.Component {
  static defaultProps = {
    scaleWidth: 0.95,
    scaleHeight: 0.6,
    minWidth: 0,
    minHeight: 0
  };

  state = {
    windowWidth: 0,
    windowHeight: 0
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    window.addEventListener("orientationchange", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
    window.removeEventListener(
      "orientationchange",
      this.updateWindowDimensions
    );
  }

  updateWindowDimensions = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  };

  componentDidUpdate(prevProps) {
    if (!_.isEmpty(this.props) && !_.isEqual(this.props, prevProps)) {
      this.updateWindowDimensions();
    }
  }

  render() {
    const {
      scaleWidth,
      scaleHeight,
      minWidth,
      minHeight,
      children,
      width,
      height,
      ...otherProps
    } = this.props;

    const { windowWidth, windowHeight } = this.state;

    const scaledWidth = Math.round(windowWidth * scaleWidth);
    const scaledHeight = Math.round(windowHeight * scaleHeight);
    const calcWidth = width ? width : Math.max(scaledWidth, minWidth);
    const calcHeight = height ? height : Math.max(scaledHeight, minHeight);

    return (
      <Canvas {...otherProps} width={calcWidth} height={calcHeight}>
        {children}
      </Canvas>
    );
  }
}
