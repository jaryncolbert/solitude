import React from "react";

const RowGroup = props => {
  let children = React.Children.toArray(props.children);

  return (
    // Surround element with 'row' div and add 'col' class to existing elem
    <div className="row">
      {children.map((c, i) =>
        React.cloneElement(c, {
          className: c.props.className ? c.props.className + " col" : "col",
          key: "col-" + i
        })
      )}
    </div>
  );
};

export default RowGroup;
