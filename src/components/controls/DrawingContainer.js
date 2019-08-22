import React from "react";
import Button from "./Button";

const DrawingContainer = ({
  children,
  className,
  asThumbnail,
  onRandomize
}) => (
  <div
    className={
      className ? "drawing-container " + className : "drawing-container"
    }>
    {children}
    {!asThumbnail && <Button onClick={onRandomize} />}
  </div>
);

export default DrawingContainer;
