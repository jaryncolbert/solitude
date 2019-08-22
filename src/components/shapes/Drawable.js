import React from "react";
import PropTypes from "prop-types";
import Point from "./Point";

export default class Drawable extends React.Component {
  static defaultProps = {
    strokeWeight: 4,
    color: "#000000",
    start: new Point(0, 0)
  };

  static contextTypes = {
    subscribe: PropTypes.func,
    unsubscribe: PropTypes.func
  };

  componentDidMount() {
    this.context.subscribe(this.draw);
  }

  componentWillUnmount() {
    this.context.unsubscribe(this.draw);
  }

  draw = p => {
    throw new Error("Unimplemented draw method!");
  };

  render() {
    return null;
  }
}
