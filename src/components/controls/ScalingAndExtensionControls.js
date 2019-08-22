import React from "react";
import RowGroup from "./RowGroup";
import Checkbox from "./Checkbox";

// Add default controls for scaling square and extending lines
const ScalingAndExtensionControls = ({
  canExtend,
  lineExtensionHandler,
  scaled,
  squareScalingHandler
}) => {
  return (
    <RowGroup>
      <Checkbox
        label="Can line extend beyond square?"
        isSelected={canExtend}
        changeHandler={lineExtensionHandler}
      />
      <Checkbox
        label="Scale square proportionally?"
        isSelected={scaled}
        changeHandler={squareScalingHandler}
      />
    </RowGroup>
  );
};

export default ScalingAndExtensionControls;
