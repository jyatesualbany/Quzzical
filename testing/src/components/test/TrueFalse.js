import React from 'react';
//import Saved from './Saved.js'
import '../styles/styles.css';

class TrueFalse extends React.Component {
  constructor(props){
    super()
    this.state = {
      question: props.question,
      answer: props.answer,
      questionNum: props.questionNum,
      pickedAnswer: null,
      saved: "unsaved",
      savedCSS: "btn btn-danger btn-space float-right",
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value},()=>{
      if(this.state.pickedAnswer != null){
        //console.log(this.state.pickedAnswer)
        this.setState({saved: "saved"})
        this.setState({savedCSS: "btn btn-success btn-space float-right"})
      }
      //setTimeout(InsertAnswer(this.state.pickedAnswer), 5000)
    })
  }
  onSubmit(e){
    e.preventDefault()
  }
  render() {
    return (
<div className="TrueFalse">
  <hr />
      <div className="row">
        <div className="col md">
          <p className="lead float-left">Question #{this.state.questionNum})</p>
        </div>
        <div className="col xl-8">
          <p className="lead center-text">{this.state.question}</p>
        </div>
        <div className="col md">
          <button type="button" className={this.state.savedCSS}>{this.state.saved}</button>
        </div>
      </div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
              <button type="button" className="btn btn-success btn-space" name="pickedAnswer" onClick={this.onChange} value = "True">True</button>
              <button type="button" className="btn btn-danger btn-space" name="pickedAnswer" onClick={this.onChange} value = "False">False</button>
          </div>
          {/*<input type="submit"Enter className="btn btn-info btn-block mt-4" />*/}
        </form>
    </div>
    );
  }
}

export default TrueFalse
