import React from 'react';
import TrueFalse from './TrueFalse.js'
import '../styles/styles.css';
import axios from 'axios' 
import MultipleChoice from './MultipleChoice.js';

const questions = {
  questionListFromDB : []
}

class Test extends React.Component {
  constructor(props){
    super()
    this.state = {
      testId : props.location.state.testId,
      testName: props.testName,
      testTime: props.testTime,               // we need to figoure a format, probably minutes only
      testDescription: props.testDescription,
      isStarted: props.isStarted,
      questionListFromDB : [],
      counter: 0,
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit(e){
    e.preventDefault()
  }
  /*componentDidMount(){
    // arraylist of questions from database
    axios.post('/api/users/getTest', questions)
        .then(res => {
          this.setState({
            questionListFromDB: res.data.questionList
          })
        }).catch(err =>  console.log(err.response.data))
  }*/
  createTest(){
    let questionList = []
    let questionListFromDB = [] // FILL WITH QUERY
    const props2 = {
      question: "IS JEFF YATES THE BEST PROFESSOR EVER?",
      answer1: "YES",
      answer2: "OF COURSE HE IS",
      answer3: "THAT MAN IS A LEGEND",
      answer4: "ALL OF THE ABOVE",
      isMult: true,
      questionNum: 2
    }
    const props = {
      question: "REACT IS EZPZ",
      answer: "True",
      isMult: false,
      questionNum: 1
    }
    questionListFromDB.push(props)
    questionListFromDB.push(props2)

    for(let i=0; i < questionListFromDB.length; i++){
      if(questionListFromDB[i].isMult == true){
        //var component = 
        questionList.push(<MultipleChoice {...questionListFromDB[i]}> </MultipleChoice>)
      }else{
        questionList.push(<TrueFalse {...questionListFromDB[i]}> </TrueFalse>)
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
              <button type="button" class="btn btn-danger btn-space" name="isStarted" onClick={this.onChange} value = "false">No</button>
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
          <p className="lead text-center">You have ___ to complete the test</p>
          <form onSubmit={this.onSubmit}>
              {this.createTest()}
            <div className="form-group">
            </div>
            <input type="submit"Enter className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
  </div>
    );
  }
}

export default Test
