import React from 'react';
import '../styles/styles.css';
import MultipleChoice from '../test/MultipleChoice.js';
import TrueFalse from '../test/TrueFalse.js';

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

class Login extends React.Component {
  constructor(props){
    super()
    this.state = {
      testId: props.location.state.testId,
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

  render() {
    return (
<div className="test">
      <div className="row">
        <div className="m-auto col-xl">
          <h1 className="display-4 text-center">Test ID: {this.state.testId}</h1>
          <p className="lead text-center">The Test will look like this to the users:</p>
          <p className="lead text-center">{this.state.testDescription}</p>
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

export default Login
