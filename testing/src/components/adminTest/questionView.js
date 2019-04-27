import React from 'react';
import '../styles/styles.css';
import MultipleChoice from '../test/MultipleChoice.js';
import TrueFalse from '../test/TrueFalse.js';

class questionView extends React.Component {
  constructor(props){
    super()
    this.state = {
      questID: props.location.state.questionId,
      qName: props.location.state.questName,
      qA1: props.location.state.questionAns1,
      qA2: props.location.state.questionAns2,
      qA3: props.location.state.questionAns3,
      qA4: props.location.state.questionAns4,
      qA5: props.location.state.questionAns5,
      qA6: props.location.state.questionAns6,
      errors: {}
    }
    // console.log(questID)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }

  componentDidMount(){
    console.log('qName: ' + this.state.qName);
    
    console.log('this is the question id: ' + this.state.questID)
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
          <h1 className="display-4 text-center">Question ID: {this.state.questID}</h1>
          <p className="lead text-center">The question will look like this to the users:</p>
          
          {/* <p className="lead text-center">{this.state.testDescription}</p> */}
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