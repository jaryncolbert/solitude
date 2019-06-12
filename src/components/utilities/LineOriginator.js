import React from "react";
import Point from "../shapes/Point";
import Line from "../shapes/Line";
import { getRandomInt } from "../util";

export default function LineOriginator({
  originName,
  numLines,
  origin,
  min,
  max,
  ...otherProps
}) {
  let lines = [];
  for (let i = 0; i < numLines; i++) {
    const endX = getRandomInt(min.x, max.x);
    const endY = getRandomInt(min.y, max.y);
    lines.push(
      <Line
        key={originName + "-" + i.toString()}
        start={origin}
        strokeWeight={2}
        color={"#FFFFFF"}
        end={new Point(endX, endY)}
      />
    );
  }

  return lines;
}
