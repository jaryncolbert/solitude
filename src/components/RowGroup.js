import React from 'react';

class RowGroup extends React.Component {
  render() {
    return (
      <div className="row">
        {this.props.children.map((c, i) =>
          <div className="col" key={"col-" + i}>
            {c}
          </div>
        )}

      </div>
    );
  }
}

export default RowGroup;
