import React from 'react';

function Sketch({ drawingId, title, instructions, year, ...p5Props }) {
  return (
    <>
      <P5Wrapper {...p5Props}/>
      <div className="sketch">
        <h2 className="sketch-title">{title}</h2>
        <div className="sketch-container" id={drawingId}></div>
        <p className="sketch-instructions">{instructions}
          <span className="sketch-year">({year})</span></p>
      </div>
    </>
  );
}

export default Sketch;

export class P5Wrapper extends React.Component {

  constructor(props) {
    super(props);

    this.canvas = new window.p5(props.sketch, this.wrapper);
    if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(props);
    }
  }

  componentWillReceiveProps(newprops) {
    if(this.props.sketch !== newprops.sketch){
      this.wrapper.removeChild(this.wrapper.childNodes[0]);
      this.canvas = new window.p5(newprops.sketch, this.wrapper);
    }
    if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(newprops);
    }
  }

  render() {
    return <div ref={wrapper => this.wrapper = wrapper} className="p5-wrapper"/>;
  }
}
