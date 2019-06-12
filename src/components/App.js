import React, { Component } from "react";
import "../App.css";
import SquareDrawings from "./drawings/SquareDrawings";
import Drawing118 from "./drawings/Drawing118";
import Drawing289 from "./drawings/Drawing289";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Drawing118 />
        <Drawing289 />
        <SquareDrawings />
      </div>
    );
  }
}

export default App;
