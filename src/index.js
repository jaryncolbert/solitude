import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import Drawing85 from "./components/drawings/Drawing85";
import Drawing118 from "./components/drawings/Drawing118";
import Drawing289 from "./components/drawings/Drawing289";
import SquareDrawings from "./components/drawings/SquareDrawings";
import * as serviceWorker from "./serviceWorker";
import Sol391 from "./assets/sol_lewitt_391_color.svg";

// Bootstrap dependencies
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./css/index.css";


const router = (
  <Router>
    <nav className="navbar navbar-light">
      <Link to="/" className="navbar-brand">
        <img
          src={Sol391}
          width="75"
          height="75"
          alt="Sol Drawing 391"
        />
        Sol-itude
      </Link>
      <span className="navbar-text">
        An Exploration of Randomness through the Art of Sol LeWitt
      </span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar-top"
        aria-controls="navbar-top"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbar-top">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/wall-drawing-85" className="nav-link">
              Drawing 85: Superimposing Colors
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/wall-drawing-118" className="nav-link">
              Drawing 118: 50 Random Points & Lines Between Them
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/wall-drawing-289" className="nav-link">
              Drawing 289: White Lines from Canvas Points to Grid Points
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/square-wall-drawings" className="nav-link">
              Drawings 154, 159, 160 & 164: Red Lines from Square Points
            </Link>
          </li>
        </ul>
      </div>
    </nav>

    <Route exact path="/" component={App} />
    <Route path="/wall-drawing-85" component={Drawing85} />
    <Route path="/wall-drawing-118" component={Drawing118} />
    <Route path="/wall-drawing-289" component={Drawing289} />
    <Route path="/square-wall-drawings" component={SquareDrawings} />
  </Router>
);

ReactDOM.render(router, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
