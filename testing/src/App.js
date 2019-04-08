import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/auth/Login.js';
import Navbar from './components/layout/Navbar.js';
//import Footer from './components/layout/Footer.js';
import Dashboard from './components/auth/Dashboard.js'
import Register from './components/auth/Register.js';
import Test from './components/test/Test.js';
import './App.css';

const props = {
  testName: "THIS IS THE FITNESS GRAM PACER TEST",
  testTime: 90,
  testDescription: "this is not all that hard",
  isStarted: false,
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
          {/*<Test {...props} />*/}
        </div>
        </div>
      </Router>
    );
  }
}

export default App;
