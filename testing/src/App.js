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

const quest1 = {
  questionId : 987654321,
  question :"THIS IS A QUESTION",
  answer1 : "THIS IS A MEME",
  answer2 : ":THINKINGFACE:",
  answer3 : "SO MUCH REACT",
  answer4 : "*THIS IS THE RIGHT ANSWER"
}
const quest2 = {
  questionId : 112345,
  question :"THIS IS A QUESTION",
  answer1 : "THIS IS A MEME",
  answer2 : ":THINKINGFACE:",
  answer3 : "SO MUCH REACT",
  answer4 : "*THIS IS THE RIGHT ANSWER"
}
const quest3 = {
  questionId : 321,
  question :"THIS IS A QUESTION",
  answer1 : "THIS IS A MEME",
  answer2 : ":THINKINGFACE:",
  answer3 : "SO MUCH REACT",
  answer4 : "*THIS IS THE RIGHT ANSWER"
}
const quest4 = {
  questionId : 456,
  question :"THIS IS A QUESTION",
  answer1 : "THIS IS A MEME",
  answer2 : ":THINKINGFACE:",
  answer3 : "SO MUCH REACT",
  answer4 : "*THIS IS THE RIGHT ANSWER"
}
const quest5 = {
  questionId : 123,
  question :"THIS IS A QUESTION",
  answer1 : "THIS IS A MEME",
  answer2 : ":THINKINGFACE:",
  answer3 : "SO MUCH REACT",
  answer4 : "*THIS IS THE RIGHT ANSWER"
}

const test1 = {
    testId : 123,
    testName : "THIS IS A TEST",
    testDescription : "TEST DESCRIPTION",
    testGrade : 60
}
const test2 = {
  testId : 1234,
  testName : "THIS IS ANOTHER TEST",
  testDescription : "TEST DESCRIPTION",
  testGrade : 100
}
const test3 = {
  testId : 1235,
  testName : "ANOTHA ONE",
  testDescription : "THIS IS A REALLY LONG DESCRIPTION TEST I WANT TO SEE HOW BOOTSTRAP HANDLES REALLY LONG DESCRIPTIONS",
  testGrade : 80
}
const test4 = {
  testId : 1235,
  testName : "ANOTHA ONE",
  testDescription : "TEST DESCRIPTION",
  testGrade : 65
}

const props = {
  testList : [],
  questionList : []
}
props.testList.push(test1)
props.testList.push(test2)
props.testList.push(test3)
props.testList.push(test4)
props.questionList.push(quest1)
props.questionList.push(quest2)
props.questionList.push(quest3)
props.questionList.push(quest4)
props.questionList.push(quest5)

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
