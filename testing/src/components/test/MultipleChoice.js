import React from 'react';
import '../styles/styles.css';

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
      pickedAnswer: null,
      isChecked: false,
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
    })
    //this.setState({isChecked:true})
  }
  onSubmit(e){
    e.preventDefault()
  }
  render() {
    return (
<div className="MultipleChoice">
<hr/>
      <div className="row">
        <div className="col-md">
            <p className="lead float-left">Question #{this.state.questionNum})</p>
        </div>
        <div className="col-xl-8">
          <p className="lead center-text">{this.state.question}</p>
        </div>
        <div className="col-md">
          <button type="button" class={this.state.savedCSS}>{this.state.saved}</button>
        </div>
    </div>
    <div className="row">
        <form onSubmit={this.onSubmit}>
            <div className="float-left">
            <tabel>
                <tr>
                    <div className="radio float-left radio-space-wrapper">
                        <label>
                            <input className="radio-space" name="pickedAnswer" type="radio" value={this.state.answer1} onChange={this.onChange}/>
                            {this.state.answer1}
                        </label> 
                    </div>
                </tr>
                <tr>
                    <div className="radio float-left radio-space-wrapper">   
                        <label>
                            <input className="radio-space" name="pickedAnswer" type="radio" value={this.state.answer2} onChange={this.onChange}/>
                            {this.state.answer2}
                        </label>
                    </div>
                </tr>
                <tr>
                    <div className="radio float-left radio-space-wrapper">     
                        <label>
                            <input className="radio-space" name="pickedAnswer" type="radio" value={this.state.answer3} onChange={this.onChange} />
                            {this.state.answer3}
                        </label>
                    </div>
                </tr>
                <tr>
                    <div className="radio float-left radio-space-wrapper">
                        <label>
                            <input className="radio-space" name="pickedAnswer" type="radio" value={this.state.answer4} onChange={this.onChange} />
                            {this.state.answer4}
                        </label>
                    </div>
                </tr>
            </tabel>
            </div>
        {/*} <input type="submit" Enter className="btn btn-info btn-block mt-4 text-center" />*/}
        </form>
      </div>
  </div>
    );
  }
}

export default MultipleChoice
