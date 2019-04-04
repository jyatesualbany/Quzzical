import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/auth/Login.js';
import Navbar from './components/layout/Navbar.js';
import Footer from './components/layout/Footer.js';
import Register from './components/auth/Register.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Navbar />
        <div className="container">
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
        </div>
        <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
