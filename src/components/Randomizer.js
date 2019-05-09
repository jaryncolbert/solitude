import React from 'react';

function withRandomizer(Component) {
  return class WithRandomizer extends React.Component {
    render() {
      return (
        <>
          <Component randomizer={click => this.randomizer = click}
            {...this.props}/>
          <button onClick={() => this.randomizer()}
            className="btn btn-primary">Randomize</button>
        </>
      );
    }
  }
}

export default withRandomizer;
