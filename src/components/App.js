import React, { Component } from "react";
import "../App.css";
import SquareDrawings from "./drawings/SquareDrawings";
import Drawing289 from "./drawings/Drawing289";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Drawing289 />
        <SquareDrawings />
      </div>
    );
  }
}

export default App;
