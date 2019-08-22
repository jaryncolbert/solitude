import React from "react";
import Button from "../controls/Button";

export default class Drawing extends React.Component {
  state = {
    onRandomize: () => null,
    triggerRandomized: false
  };

  onRandomize = randomize => {
    this.setState({
      onRandomize: randomize,
      triggerRandomized: false
    });
  };

  componentDidMount() {
    this.setState({
      triggerRandomized: true
    });
  }

  render() {
    const { children, ...otherProps } = this.props;

    const injectedProps = {
      ...children.props,
      randomized: this.state.triggerRandomized,
      onRandomize: this.onRandomize
    };

    return (
      <DrawingContainer {...otherProps} onRandomize={this.state.onRandomize}>
        {React.cloneElement(children, injectedProps)}
      </DrawingContainer>
    );
  }
}

const DrawingContainer = ({
  children,
  className,
  asThumbnail,
  onRandomize
}) => (
  <div
    className={
      className ? "drawing-container " + className : "drawing-container"
    }>
    {children}
    {!asThumbnail && <Button onClick={onRandomize} />}
  </div>
);
