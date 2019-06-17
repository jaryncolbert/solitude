import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './components/App';
import Drawing118 from './components/drawings/Drawing118';
import Drawing289 from './components/drawings/Drawing289';
import SquareDrawings from './components/drawings/SquareDrawings';
import * as serviceWorker from './serviceWorker';

// Bootstrap dependencies
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const router = (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/square-wall-drawings">Drawings 154, 159, 160 & 164: Red Lines in Squares</Link>
        </li>
        <li>
          <Link to="/wall-drawing-118">Drawing 118: 50 Points & Lines</Link>
        </li>
        <li>
          <Link to="/wall-drawing-289">Drawing 289: White Lines to Grid Points</Link>
        </li>
      </ul>
      <Route exact path="/" component={App} />
      <Route path="/wall-drawing-118" component={Drawing118} />
      <Route path="/wall-drawing-289" component={Drawing289} />
      <Route path="/square-wall-drawings" component={SquareDrawings} />
    </div>
  </Router>
)
ReactDOM.render(router, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
