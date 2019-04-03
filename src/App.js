import React, { Component } from 'react';
import P5Wrapper from './react-p5-wrapper';
import sketch from './sketch';
import sketch2 from './sketch2';
import './App.css';

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
			rotation: 150,
			stateSketch: sketch,
		};
	}

	rotationChange(e){
		this.setState({rotation:e.target.value});
	}

	pressEvent(){
		this.state.stateSketch === sketch ? this.setState({stateSketch:sketch2}) : this.setState({stateSketch:sketch});
	}

  render() {
    return (
      <div className="App">
        <P5Wrapper sketch={this.state.stateSketch} rotation={this.state.rotation}/>
        <input type="range" value={this.state.rotation}  min="0"  max="360" step="1" onInput={this.rotationChange.bind(this)}/>
        <button onClick={this.pressEvent.bind(this)}>Change Sketch</button>
      </div>
    );
  }
}

export default App;
