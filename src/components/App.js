import React from "react";
import { Link } from "react-router-dom";

import "../css/App.css";
import "../css/drawings.css";

import RowGroup from "./controls/RowGroup";

import Drawing85 from "./drawings/Drawing85";
import Drawing118 from "./drawings/Drawing118";
import Drawing289 from "./drawings/Drawing289";
import SquareDrawings from "./drawings/SquareDrawings";

const App = () => {
  return (
    <div className="App">
      <RowGroup>
        <Thumbnail118 link="/wall-drawing-118" scaleHeight={0.5} />
      </RowGroup>

      <RowGroup>
        <Thumbnail85 link="/wall-drawing-85" />
      </RowGroup>

      <RowGroup>
        <Thumbnail289 link="/wall-drawing-289" />
      </RowGroup>

      <RowGroup>
        <SquareThumbnails
          scaleWidth={0.4}
          scaleHeight={0.2}
          link="/square-wall-drawings"
        />
      </RowGroup>
    </div>
  );
};
export default App;

const asThumbnailLink = DrawingComponent => {
  return function ThumbnailLink({ link, className, ...otherProps }) {
    const defaultProps = {
      scaleWidth: 0.9,
      scaleHeight: 0.3
    };
    return (
      <Link
        to={link}
        className={
          className ? "drawing-thumbnail " + className : "drawing-thumbnail"
        }>
        <DrawingComponent
          {...defaultProps}
          {...otherProps}
          asThumbnail={true}
        />
      </Link>
    );
  };
};

const Thumbnail85 = asThumbnailLink(Drawing85);
const Thumbnail118 = asThumbnailLink(Drawing118);
const Thumbnail289 = asThumbnailLink(Drawing289);
const SquareThumbnails = asThumbnailLink(SquareDrawings);
