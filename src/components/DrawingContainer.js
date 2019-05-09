import React from 'react';

function withDrawingContainer(Component) {
  return class WithDrawingContainer extends React.Component {
    render() {
      return (
        <div className="drawing-container col">
          <Component {...this.props}/>
        </div>
      );
    }
  }
}

export default withDrawingContainer;
