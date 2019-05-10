import React, { Component } from 'react';
import '../App.css';
import SquareDrawings from './drawings/SquareDrawings';
import { Test } from './RefactorDrawing154';
import '../square-drawings.css';

class App extends Component {

  render() {
    return (
      <div className="App container-fluid">
        <Test/>
      </div>
    );
  }
}

export default App;
