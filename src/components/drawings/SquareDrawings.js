import React, { Component } from 'react';
import Drawing154 from './Drawing154';
import Drawing159 from './Drawing159';
import Drawing160 from './Drawing160';
import Drawing164 from './Drawing164';
import { RowGroup } from '../CommonComponents';

class SquareDrawings extends Component {
  static initSquareSize = 300;
  static minSquareSize = 10;
  static maxSquareSize = 380;
  static minLineLen = 5;
  static canvasWidth = 600;
  static canvasHeight = 400;

  render() {
    return (
      <>
        <RowGroup>
          <Drawing154/>
          <Drawing159 />
        </RowGroup>
        <RowGroup>
          <Drawing160 />
          <Drawing164 />
        </RowGroup>
      </>
    );
  }
}

export default SquareDrawings;
