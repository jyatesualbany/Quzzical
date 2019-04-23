import React from 'react';
import TrueFalse from '../test/TrueFalse.js'
import '../styles/styles.css';
import axios from 'axios' 
import MultipleChoice from '../test/MultipleChoice.js';

const questions = {
  questionListFromDB : []
}

class AdminViewTest extends React.Component {
  constructor(props){
    super()
    this.state = {
      testId : props.location.state.testId,
      testName: props.location.state.testName,
      timeLimit: props.location.state.timeLimit,               // we need to figoure a format, probably minutes only
      testDescription: props.location.state.testDesc,
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
  componentDidMount(){
    axios.post('/api/users/current')
        .then(res => {
          this.setState({
            userId: res.data.userId
          })
        }).catch(err =>  console.log(err.response.data))

    // arraylist of questions from database
    axios.post('/api/admin/getTest',
        {params: {testId: this.state.testId}})
        .then(res => {
          this.setState({
            questionListFromDB: res.data.questionList
          })
        }).catch(err =>  console.log(err.response.data))

  }

  createTest(){
    let questionList = []
    let questionListFromDB = [] // FILL WITH QUERY
    console.log(questionListFromDB)

    for(let i=0; i < this.state.questionListFromDB.length; i++){
      this.state.questionListFromDB[i].questionNum = i + 1;
      if(this.state.questionListFromDB[i].isMult == true){
        //var component = 
        questionList.push(<MultipleChoice {...this.state.questionListFromDB[i]}> </MultipleChoice>)
      }else{
        questionList.push(<TrueFalse {...this.state.questionListFromDB[i]}> </TrueFalse>)
      }
    }
    return questionList
  }

  render() {
    return (
<div className="test">
      <div className="row">
        <div className="m-auto col-xl">
          {/*<div>Loading{"...".substr(0, this.state.counter % 3 + 1)}</div>*/}
          <h1 className="display-4 text-center">Name: {this.state.testName}</h1>
          <p className="lead text-center">Test ID: {this.state.testId}</p>
          <p className="lead text-center">Test Description: {this.state.testDescription}</p>
          <p className="lead text-center">You have {this.state.timeLimit} to complete the test</p>
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

export default AdminViewTest
