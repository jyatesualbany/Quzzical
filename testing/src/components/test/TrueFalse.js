import React from 'react';
import './styles.css';

class TrueFalse extends React.Component {
  constructor(props){
    super()
    this.state = {
      question: props.question,
      answer: props.answer,
      questionNum: props.questionNum,
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
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Question #{this.state.questionNum}</h1>
          <p className="lead text-center">{this.state.question}</p>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <button type="button" class="btn btn-success btn-space" name="True" onChange={this.onChange}>True</button>
                <button type="button" class="btn btn-danger btn-space" name="True" onChange={this.onChange}>False</button>
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

export default TrueFalse
