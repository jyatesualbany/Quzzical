import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/auth/Login.js';
import Navbar from './components/layout/Navbar.js';
import Dashboard from './components/auth/Dashboard.js';
import Register from './components/auth/Register.js';
import Logout from './components/auth/Logout.js';
import './App.css';

const test1 = {
  testName: "THIS IS THE FITNESS GRAM PACER TEST",
  testTime: 90,
  testDescription: "this is not all that hard",
  isStarted: false
}
const test2 = {
  testName: "THIS IS THE FITNESS GRAM PACER TEST",
  testTime: 90,
  testDescription: "this is not all that hard",
  isStarted: false
}

const props = {
  testList : [test1, test2],
  isAdmin :  true
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Navbar />
        <div className="container">
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/logout" component={Logout} />
        </div>
        </div>
      </Router>
    );
  }
}

export default App;
