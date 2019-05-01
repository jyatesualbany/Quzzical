import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/auth/Login.js';
import Navbar from './components/layout/Navbar.js';
import AdminDashboard from './components/auth/AdminDashboard.js';
import UserDashboard from './components/auth/UserDashboard.js';
import Register from './components/auth/Register.js';
import Upload from './components/auth/Upload.js';
import Custom from './components/auth/AdminCustom.js';
import Logout from './components/auth/Logout.js';
import AdminViewTest from './components/adminTest/AdminViewTest.js';
import questionView from './components/adminTest/questionView';
import Test from './components/test/Test.js';
import CreateTest from './components/adminTest/CreateTest.js';
import AssginTest from './components/adminTest/AssignTest';
import UpdatePassword from './components/auth/UpdatePassword'
import './components/styles/styles.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Navbar />
        <div className="container">
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/custom" component={Custom} />
          <Route exact path="/admindashboard" component={AdminDashboard}/>
          <Route exact path="/userdashboard" component={UserDashboard}/>
          <Route exact path="/updatepassword" component={UpdatePassword}/>
          <Route exact path="/createtest" component={CreateTest}/>
          <Route exact path="/assgintest" component={AssginTest}/>
          <Route exact path="/logout" component={Logout} />
          <Route path='/adminViewTest' component={AdminViewTest} />
          <Route path='/questionView' component={questionView} />
          <Route path='/Test' component={Test} />
        </div>
        </div>
      </Router>
    );
  }
}

export default App;
