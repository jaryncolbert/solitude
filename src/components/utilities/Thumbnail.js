import React from "react";

export default function asThumbnail(DrawingComponent) {
  return class extends React.Component {
    static defaultProps = {
      width: 300,
      height: 300
    };

    render() {
      return (
        <DrawingComponent
          {...this.props}
          width={this.props.width}
          height={this.props.height}
          asThumbnail={true}
        />
      );
    }
  };
}
