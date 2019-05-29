import React, { Component } from 'react';
import '../App.css';
import SquareDrawings from './drawings/SquareDrawings';
import { Drawing154 } from './drawings/RefactorDrawing154';
import { Drawing159 } from './drawings/RefactorDrawing159';
import { Drawing160 } from './drawings/RefactorDrawing160';
import '../square-drawings.css';

class App extends Component {

  render() {
    return (
      <div className="App container-fluid">
        <Drawing154 />
        <Drawing159 />
        <Drawing160 />
      </div>
    );
  }
}

export default App;
