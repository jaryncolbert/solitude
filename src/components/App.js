import React, { Component } from 'react';
import Drawing154 from './drawings/Drawing154';
import Drawing159 from './drawings/Drawing159';
import Drawing160 from './drawings/Drawing160';
import Drawing164 from './drawings/Drawing164';
import '../App.css';
import '../square-drawings.css';

class App extends Component {

  render() {
    return (
      <div className="App container-fluid">
        <div className="row">
          <Drawing154 />
          <Drawing159 />
        </div>
        <div className="row">
          <Drawing160 />
          <Drawing164 />
        </div>
      </div>
    );
  }
}

export default App;
