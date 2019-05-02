import React from 'react';
import '../styles/styles.css';
import MultipleChoice from '../adminTest/AdminViewMult';
import TrueFalse from '../adminTest/AdminViewTrueFalse';

class questionView extends React.Component {
  constructor(props){
    super()
    this.state = {
      question: props.location.state.question,
      errors: {}
    }
    // console.log(questID)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.renderQuestion = this.renderQuestion.bind(this)

  }

  componentDidMount(){
    //console.log('qName: ' + this.state.qName);
    
    //console.log('this is the question id: ' + this.state.questID)
  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit(e){
    e.preventDefault()
  }
  renderQuestion(){
    if(this.state.question.isMult == 0){
      //console.log("TF:", this.state.question)
      return<TrueFalse {...this.state.question}> </TrueFalse>
    }
    else{
      console.log("MULT:", this.state.question)
      return<MultipleChoice {...this.state.question}> </MultipleChoice>
    }
  }

  render() {
    return (
<div className="test">
      <div className="row">
        <div className="m-auto col-xl">
          <h1 className="display-4 text-center">Question ID: {this.state.question.qID}</h1>
          <h1 className="lead text-center">The question will look like this to the users:</h1>
          {this.renderQuestion()}

          {/* <form onSubmit={this.onSubmit}>
              {/* <TrueFalse {...props}/>
              <MultipleChoice {...props2}/>
              <TrueFalse {...props}/> */}
            {/* <div className="form-group">
            </div>
            <input type="submit"Enter className="btn btn-info btn-block mt-4" /> */}
          {/* </form>  */}
        </div>
      </div>
  </div>
    );
  }
}

export default questionView