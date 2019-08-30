import React from "react";
import PropTypes from "prop-types";
import Point from "./Point";
import Colors from "../utilities/Colors";

export default class Drawable extends React.Component {
  static defaultProps = {
    strokeWeight: 4,
    color: Colors.BLACK,
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
