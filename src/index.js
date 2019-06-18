import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import About from "./components/About";
import Drawing85 from "./components/drawings/Drawing85";
import Drawing118 from "./components/drawings/Drawing118";
import Drawing289 from "./components/drawings/Drawing289";
import SquareDrawings from "./components/drawings/SquareDrawings";
import * as serviceWorker from "./serviceWorker";
import Sol391 from "./assets/sol_lewitt_391_color.svg";
import Footer from "./components/Footer";

// Bootstrap dependencies
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./css/index.css";

const router = (
  <Router>
    <nav className="navbar navbar-light">
      <Link to="/" className="navbar-brand">
        <img src={Sol391} width="75" height="75" alt="Sol Drawing 391" />
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
          <NavListItem path="/" text="Home" />
          <NavListItem path="/about" text="About" />
          <NavListItem
            path="/wall-drawing-85"
            text="Drawing 85: Superimposing Colors"
          />
          <NavListItem
            path="/square-wall-drawings"
            text="Drawings 154, 159, 160 & 164: Red Lines from Square Points"
          />
          <NavListItem
            path="/wall-drawing-118"
            text="Drawing 118: 50 Random Points & Lines Between Them"
          />
          <NavListItem
            path="/wall-drawing-289"
            text="Drawing 289: White Lines from Canvas Points to Grid Points"
          />
        </ul>
      </div>
    </nav>

    <Route exact path="/" component={App} />
    <Route path="/about" component={About} />
    <Route path="/wall-drawing-85" component={Drawing85} />
    <Route path="/wall-drawing-118" component={Drawing118} />
    <Route path="/wall-drawing-289" component={Drawing289} />
    <Route path="/square-wall-drawings" component={SquareDrawings} />

    <Footer />
  </Router>
);

function NavListItem({ path, text }) {
  return (
    <li
      className="nav-item"
      data-toggle="collapse"
      data-target=".navbar-collapse.show"
    >
      <Link to={path} className="nav-link">
        {text}
      </Link>
    </li>
  );
}

ReactDOM.render(router, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
