import React, { Component } from "react";
import Drawing154 from "./Drawing154";
import Drawing159 from "./Drawing159";
import Drawing160 from "./Drawing160";
import Drawing164 from "./Drawing164";
import { RowGroup } from "../CommonComponents";

class SquareDrawings extends Component {
  render() {
    return (
      <div className="container-fluid">
        <RowGroup>
          <Drawing154 />
          <Drawing159 />
        </RowGroup>
        <RowGroup>
          <Drawing160 />
          <Drawing164 />
        </RowGroup>
      </div>
    );
  }
}

export default SquareDrawings;
