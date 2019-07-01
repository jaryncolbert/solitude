import React from "react";

export default function asThumbnail(DrawingComponent) {
  return class extends React.Component {
    static defaultProps = {
      scaleWidth: 0.9,
      scaleHeight: 0.3
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
