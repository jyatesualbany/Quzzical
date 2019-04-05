import React from 'react';
import TrueFalse from './TrueFalse.js'
import './styles.css';
import MultipleChoice from './MultipleChoice.js';

const props = {
  question: "I FUCKING DID IT",
  answer: "True",
  questionNum: 1
}
const props2 = {
  question: "ITS YA BOI",
  answer1: "CLEAN AF CODE",
  answer2: "YALL ARE JUST JELLY",
  answer3: "CASH ME OUTSIDE",
  answer4: "HOW BOUT DAH",
  questionNum: 1
}

class Login extends React.Component {
  constructor(props){
    super()
    this.state = {
      testName: props.testName,
      testTime: props.testTime,               // we need to figoure a format, probably minutes only
      testDescription: props.testDescription,
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

    /*const question = {
      quetion: this.state.question,
      answer: this.state.password
    }*/

  }
  render() {
    return (
<div className="test">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">{this.state.testName}</h1>
          <p className="lead text-center">You have {this.state.testTime} minutes to complete the test</p>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <TrueFalse {...props}/>
              <MultipleChoice {...props2}/>
            </div>
            <input type="submit"Enter className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
    );
  }
}

export default Login
