import React from 'react';
import '../styles/styles.css';
import axios from 'axios';

class MultipleChoice extends React.Component {
  constructor(props){
    super()
    this.state = {
        utID: props.usertestId,
        qID: props.questionId,
      question: props.questionText,
      answer1: props.answer1Text,
        a1: props.answer1,
      answer2: props.answer2Text,
        a2: props.answer2,
      answer3: props.answer3Text,
        a3: props.answer3,
      answer4: props.answer4Text,
        a4: props.answer4,
      answer5: props.answer5Text,
        a5: props.answer5,
      answer6: props.answer6Text,
        a6: props.answer6,    
      questionNum: props.questionNum,
      pickedAnswer: null,
      isChecked: false,
      saved: "unsaved",
      savedCSS: "btn btn-danger btn-space float-right",
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.createTable =  this.createTable.bind(this)

  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value},()=>{
        if(this.state.pickedAnswer != null){
            //console.log(this.state.pickedAnswer)
            this.setState({saved: "saved"})
            this.setState({savedCSS: "btn btn-success btn-space float-right"})
            axios.post('/api/users/selectAnswer',
                {pickedAnswer: this.state.pickedAnswer, utID: this.state.utID, qID: this.state.qID })
                .catch(err =>  console.log(err.response.data))
        }
    })
    //this.setState({isChecked:true})
  }
  onSubmit(e){
    e.preventDefault()
  }
  createTable = () => {
    let list = []
    list.push(<tr>
      <div className="radio float-left radio-space-wrapper">
          <label>
              <input className="radio-space" name="pickedAnswer" type="radio" value={this.state.a1} onChange={this.onChange}/>
              {this.state.answer1}
          </label> 
      </div>
      </tr>)
  list.push(<tr>
    <div className="radio float-left radio-space-wrapper">
        <label>
            <input className="radio-space" name="pickedAnswer" type="radio" value={this.state.a2} onChange={this.onChange}/>
            {this.state.answer2}
        </label> 
    </div>
    </tr>)
  list.push(<tr>
    <div className="radio float-left radio-space-wrapper">
        <label>
            <input className="radio-space" name="pickedAnswer" type="radio" value={this.state.a3} onChange={this.onChange}/>
            {this.state.answer3}
        </label> 
    </div>
    </tr>)
    list.push(<tr>
      <div className="radio float-left radio-space-wrapper">
          <label>
              <input className="radio-space" name="pickedAnswer" type="radio" value={this.state.a4} onChange={this.onChange}/>
              {this.state.answer4}
          </label> 
      </div>
      </tr>)
      if(this.state.answer5 != null){
        list.push(<tr>
          <div className="radio float-left radio-space-wrapper">
              <label>
                  <input className="radio-space" name="pickedAnswer" type="radio" value={this.state.a5} onChange={this.onChange}/>
                  {this.state.answer5}
              </label> 
          </div>
          </tr>)
      }
      if(this.state.answer6 != null){
        list.push(<tr>
          <div className="radio float-left radio-space-wrapper">
              <label>
                  <input className="radio-space" name="pickedAnswer" type="radio" value={this.state.a6} onChange={this.onChange}/>
                  {this.state.answer6}
              </label> 
          </div>
          </tr>)
      }
    return list
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
            <tabel className="table table-striped">
              {this.createTable()}
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
