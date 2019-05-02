import React from 'react';
import TrueFalse from './TrueFalse.js'
import '../styles/styles.css';
import axios from 'axios' 
import MultipleChoice from './MultipleChoice.js';
import {Link} from "react-router-dom";

const questions = {
  questionListFromDB : []
}

class Test extends React.Component {
  constructor(props){
    super()
    this.state = {
      testId : props.location.state.testId,
      testName: props.location.state.testName,
      timeLimit: props.location.state.timeLimit,               // we need to figoure a format, probably minutes only
      testDescription: props.testDescription,
      isStarted: props.isStarted,
      questionListFromDB : [],
      grade: '',
      counter: 0,
      errors: {}

    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value})
    //Post to answers

    
  }
  onSubmit(e){
    e.preventDefault()
    axios.post('/api/users/grade',
        {usertestId: this.state.questionListFromDB[0].usertestId} )
        .then(res => {
          console.log(res)
          this.setState({
            grade: res.data.grade
          })
          window.location = '/userdashboard'
        }).catch(err => this.setState({errors: err.response.data}))
  }

  componentDidMount(){
    axios.post('/api/users/current')
        .then(res => {
          this.setState({
            userId: res.data.userId
          })
        }).catch(err =>  console.log(err.response.data))

    // arraylist of questions from database
    axios.post('/api/users/getTest',
        {params: {userId: this.state.userId, testId: this.state.testId}} )
        .then(res => {
          this.setState({
            questionListFromDB: res.data.questionList,
          })
        }).catch(err =>  console.log(err))


  }

  createTest(){
    let questionList = []
    let questionListFromDB = [] // FILL WITH QUERY

    for(let i=0; i < this.state.questionListFromDB.length; i++){
      this.state.questionListFromDB[i].questionNum = i + 1;
      if(this.state.questionListFromDB[i].isMult == true){
        questionList.push(<MultipleChoice {...this.state.questionListFromDB[i]}> </MultipleChoice>)
      }else{
        questionList.push(<TrueFalse {...this.state.questionListFromDB[i]}> </TrueFalse>)
      }
    }
    return questionList
  }

  render() {
    if(!this.state.isStarted){
      return(
        <div className = "Begin Test">
        <h1 className="display-4 text-center">Do you wish to begin?</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
              <button type="button" class="btn btn-success btn-space" name="isStarted" onClick={this.onChange} value = "true">Yes</button>
              <button type="button" class="btn btn-danger btn-space" name="isStarted" value = "false">No</button>
          </div>
        </form>
        </div>
      )
    }
    return (
<div className="test">
      <div className="row">
        <div className="m-auto col-xl">
          {/*<div>Loading{"...".substr(0, this.state.counter % 3 + 1)}</div>*/}
          <h1 className="display-4 text-center">Name: {this.state.testName}</h1>
          <p className="lead text-center">Test ID: {this.state.testId}</p>
          <p className="lead text-center">You have {this.state.timeLimit} to complete the test</p>
          <form onSubmit={this.onSubmit}>
              {this.createTest()}
            <div className="form-group">
              <Link className="btn btn-success btn-space" to="/userdashboard"
                  // onClick={this.createTest.bind(this, this.state.questionList)}>Create Test</Link>
                    onClick={this.onSubmit.bind(this)}>Submit Test</Link>
            </div>
          </form>
        </div>
      </div>
  </div>
    );
  }
}

export default Test
