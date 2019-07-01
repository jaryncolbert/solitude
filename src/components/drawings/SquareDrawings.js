import React from "react";
import Drawing154 from "./Drawing154";
import Drawing159 from "./Drawing159";
import Drawing160 from "./Drawing160";
import Drawing164 from "./Drawing164";
import { RowGroup } from "../CommonComponents";

class SquareDrawings extends React.Component {
  // Override default scaling so that square drawings are 2x2
  static defaultProps = {
    scaleWidth: 0.4,
    scaleHeight: 0.35
  };

  render() {
    return (
      <div className="container-fluid">
        <RowGroup>
          <Drawing154 {...this.props} />
          <Drawing159 {...this.props} />
        </RowGroup>
        <RowGroup>
          <Drawing160 {...this.props} />
          <Drawing164 {...this.props} />
        </RowGroup>
      </div>
    );
  }
}

export default SquareDrawings;
