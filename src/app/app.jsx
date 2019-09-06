import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import LandingPage from './pages/landing';
import LoginPage from './pages/login';
import ConfirmationPage from './pages/confirmation';
import SignOutPage from './pages/sign-out';
import './app.scss';

const App = () => (
    <Router>
        <Route path="/" component={LandingPage} exact />
        <Route path="/login/" component={LoginPage} exact />
        <Route path="/confirmation/" component={ConfirmationPage} />
        <Route path="/signout/" component={SignOutPage} />
    </Router>
);

render(<App />, document.getElementById('app'));
