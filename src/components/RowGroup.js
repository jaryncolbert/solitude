import React from 'react';

class RowGroup extends React.Component {
  render() {
    return (
      <div className="row">
        {this.props.children.map((c) =>
          <div className="col">
            {c}
          </div>
        )}

      </div>
    );
  }
}

export default RowGroup;
