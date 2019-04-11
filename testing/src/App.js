import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/auth/Login.js';
import Navbar from './components/layout/Navbar.js';
import AdminDashboard from './components/auth/AdminDashboard.js';
import UserDashboard from './components/auth/UserDashboard.js';
import Register from './components/auth/Register.js';
import Logout from './components/auth/Logout.js';
import AdminViewTest from './components/adminTest/AdminViewTest.js';
import './components/styles/styles.css';


const test1 = {
    testId : 123,
    testName : "THIS IS A TEST",
    testDescription : "TEST DESCRIPTION"
}
const test2 = {
  testId : 1234,
  testName : "THIS IS ANOTHER TEST",
  testDescription : "TEST DESCRIPTION"
}
const test3 = {
  testId : 1235,
  testName : "ANOTHA ONE",
  testDescription : "TEST DESCRIPTION"
}
const test4 = {
  testId : 1235,
  testName : "ANOTHA ONE",
  testDescription : "TEST DESCRIPTION"
}

const props = {
  testList : [],
}
props.testList.push(test1)
props.testList.push(test2)
props.testList.push(test3)
props.testList.push(test4)


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Navbar />
        <div className="container">
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          {/*<Route exact path="/dashboard" component={Dashboard} />*/}
          <Route exact path="/admindashboard" render={()=><AdminDashboard {...props} />}/>
          <Route exact path="/userdashboard" render={()=><UserDashboard {...props} />}/>
          <Route exact path="/logout" component={Logout} />
          <Route path='/adminViewTest' component={AdminViewTest} />
        </div>
        </div>
      </Router>
    );
  }
}

export default App;
