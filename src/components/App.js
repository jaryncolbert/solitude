import React, { Component } from "react";
import "../App.css";
import SquareDrawings from "./drawings/SquareDrawings";
import "../square-drawings.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <SquareDrawings />
      </div>
    );
  }
}

export default App;
