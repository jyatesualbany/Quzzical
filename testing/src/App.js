import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/auth/Login.js';
import Navbar from './components/layout/Navbar.js';
import Footer from './components/layout/Footer.js';
import Register from './components/auth/Register.js';
import Test from './components/test/Test.js';
import './App.css';

const props = {
  testName: "THIS IS THE FITNESS GRAM PACER TEST",
  testTime: 90,
  testDescription: "this is not all that hard",
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
          <Test {...props} />
        </div>
        <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
