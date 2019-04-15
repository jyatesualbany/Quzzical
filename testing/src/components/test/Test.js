import React from 'react';
import TrueFalse from './TrueFalse.js'
import '../styles/styles.css';
import MultipleChoice from './MultipleChoice.js';

const props = {
  question: "REACT IS EZPZ",
  answer: "True",
  questionNum: 1
}
const props2 = {
  question: "IS JEFF YATES THE BEST PROFESSOR EVER?",
  answer1: "YES",
  answer2: "OF COURSE HE IS",
  answer3: "THAT MAN IS A LEGEND",
  answer4: "ALL OF THE ABOVE",
  questionNum: 2
}

class Test extends React.Component {
  constructor(props){
    super()
    this.state = {
      testName: props.testName,
      testTime: props.testTime,               // we need to figoure a format, probably minutes only
      testDescription: props.testDescription,
      isStarted: props.isStarted,
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
    // arraylist of questions from database
    this.setState({})
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
        <div className="m-auto">
          {/*<div>Loading{"...".substr(0, this.state.counter % 3 + 1)}</div>*/}
          <h1 className="display-4 text-center">{this.state.testName}</h1>
          <p className="lead text-center">You have TIME to complete the test</p>
          <form onSubmit={this.onSubmit}>
              <TrueFalse {...props}/>
              <MultipleChoice {...props2}/>
              <TrueFalse {...props}/>
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
