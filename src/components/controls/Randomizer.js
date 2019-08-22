import React from "react";
import { getRandomInt } from "../util";

const withRandomize = WrappedComponent => {
  return function Randomizer({
    min,
    max,
    randomized,
    onRandomize,
    ...otherProps
  }) {
    if (randomized) {
      onRandomize(getRandomInt(min, max));
    }

    return <WrappedComponent {...otherProps} />;
  };
};

export default withRandomize;
