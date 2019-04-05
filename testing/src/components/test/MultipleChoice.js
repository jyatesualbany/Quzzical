import React from 'react';
import './styles.css';

class MultipleChoice extends React.Component {
  constructor(props){
    super()
    this.state = {
      question: props.question,
      answer1: props.answer1,
      answer2: props.answer2,
      answer3: props.answer3,
      answer4: props.answer4,
      questionNum: props.questionNum,
      isChecked: false,
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value})
    this.setState({isChecked:true})
  }
  onSubmit(e){
    e.preventDefault()
  }
  render() {
    return (
<div className="test">
    <div className="container">
      <div className="row">
        <div className="m-auto">
          <h1 className="display-4 text-center">Question #{this.state.questionNum}</h1>
            <p className="lead text-center">{this.state.question}</p>
            <form onSubmit={this.onSubmit}>
            <div className="float-left">
            <tabel>
                <tr>
                    <div className="radio float-left">
                        <label>
                            <input name="Radio" type="radio" value="option1" onChange={this.onChange}/>
                            {this.state.answer1}
                        </label> 
                    </div>
                </tr>
                <tr>
                    <div className="radio float-left">   
                        <label>
                            <input name="Radio" type="radio" value="option2" onChange={this.onChange}/>
                            {this.state.answer2}
                        </label>
                    </div>
                </tr>
                <tr>
                    <div className="radio float-left">     
                        <label>
                            <input name="Radio" type="radio" value="option3" onChange={this.onChange} />
                            {this.state.answer3}
                        </label>
                    </div>
                </tr>
                <tr>
                    <div className="radio float-left">
                        <label>
                            <input name="Radio" type="radio" value="option4" onChange={this.onChange} />
                            {this.state.answer4}
                        </label>
                    </div>
                </tr>
            </tabel>
            </div>
            <input type="submit" Enter className="btn btn-info btn-block mt-4 text-center" />
          </form>
        </div>
      </div>
    </div>
  </div>
    );
  }
}

export default MultipleChoice
