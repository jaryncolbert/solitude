import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../css/App.css";
import "../css/drawings.css";

import { RowGroup } from "./CommonComponents";
import asThumbnail from "./utilities/Thumbnail";

import Drawing85 from "./drawings/Drawing85";
import Drawing118 from "./drawings/Drawing118";
import Drawing154 from "./drawings/Drawing154";
import Drawing159 from "./drawings/Drawing159";
import Drawing160 from "./drawings/Drawing160";
import Drawing164 from "./drawings/Drawing164";
import Drawing289 from "./drawings/Drawing289";

class App extends Component {
  render() {
    return (
      <div className="App">
        <RowGroup>
          <Link to="/wall-drawing-118" className="drawing-thumbnail">
            <Thumbnail118 width={500} height={300}/>
          </Link>
          <Link to="/wall-drawing-289" className="drawing-thumbnail">
            <Thumbnail289 width={500} height={300}/>
          </Link>
        </RowGroup>

        <RowGroup>
          <Link to="/wall-drawing-85" className="drawing-thumbnail">
            <Thumbnail85 width={500} height={300}/>
          </Link>
        </RowGroup>

        <RowGroup>
          <Link to="/square-wall-drawings" className="drawing-thumbnail">
            <Thumbnail154 />
          </Link>
          <Link to="/square-wall-drawings" className="drawing-thumbnail">
            <Thumbnail159 />
          </Link>
          <Link to="/square-wall-drawings" className="drawing-thumbnail">
            <Thumbnail160 />
          </Link>
          <Link to="/square-wall-drawings" className="drawing-thumbnail">
            <Thumbnail164 />
          </Link>
        </RowGroup>
      </div>
    );
  }
}

export default App;
const Thumbnail85 = asThumbnail(Drawing85);
const Thumbnail118 = asThumbnail(Drawing118);
const Thumbnail154 = asThumbnail(Drawing154);
const Thumbnail159 = asThumbnail(Drawing159);
const Thumbnail160 = asThumbnail(Drawing160);
const Thumbnail164 = asThumbnail(Drawing164);
const Thumbnail289 = asThumbnail(Drawing289);
