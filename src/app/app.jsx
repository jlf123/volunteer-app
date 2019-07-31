import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LandingPage from './pages/landing';
import './app.scss';

const App = () => <Router>
    <Route path="/" component={LandingPage}  />
</Router>;

render(<App />, document.getElementById('app'));
