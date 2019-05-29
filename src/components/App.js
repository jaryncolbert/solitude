import React, { Component } from 'react';
import '../App.css';
import SquareDrawings from './drawings/SquareDrawings';
import Drawing154 from './drawings/Drawing154';
import Drawing159 from './drawings/Drawing159';
import Drawing160 from './drawings/Drawing160';
import Drawing164 from './drawings/Drawing164';
import '../square-drawings.css';

class App extends Component {

  render() {
    return (
      <div className="App container-fluid">
        <Drawing154 />
        <Drawing159 />
        <Drawing160 />
        <Drawing164 />
      </div>
    );
  }
}

export default App;
