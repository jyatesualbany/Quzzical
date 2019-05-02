import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames'

class CreateQuestion extends Component {
  constructor(){
    super()
    this.state = {
      isMult : true,
      questionText : '',
      ans1text : null,
      ans2text : null,
      ans3text : null,
      ans4text : null,
      ans5text : null,
      ans6text : null,
      correctAnswer : "A",
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.isChecked = this.isChecked.bind(this)
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }
  isChecked(){
    if(this.state.isMult === true){
      this.setState({ isMult : false})
    }else{
      this.setState({ isMult : true})
    }
    //onsole.log("isMult:", this.state.isMult)
  }

  onSubmit(e){
    e.preventDefault()
    //console.log(this.state.ans6text)
    var quest
    if(this.state.isMult == false){
        quest = {
        q: this.state.questionText,
        isMult: false,
        ans1text: this.state.ans1text,
        ans2text: this.state.ans2text,
        correct: this.state.correctAnswer
    }  
    }else{
        quest = {
            q: this.state.questionText,
            mult: this.state.isMult,
            ans1text: this.state.ans1text,
            ans1: 'A',
            ans2text: this.state.ans2text,
            ans2: 'B',
            ans3text: this.state.ans3text,
            ans3: 'C',
            ans4text: this.state.ans4text,
            ans4: 'D',
            ans5text: this.state.ans5text,
            ans5: 'E',
            ans6text: this.state.ans6text,
            ans6: 'F',
            correct: this.state.correctAnswer
        }
    }  
    console.log(quest)
    axios.post('/api/admin/makeQuestion', quest)
        .then(res =>{
            if(res.data.output == 'good'){
              window.location='/admindashboard'
            }
        })
  }
  render() {
    const { errors } = this.state;
        return (
        <div className="createQuestion">
            <div className="container">
            {/*<form>*/}
            <div className="row">
                <div className="col-lg-12 m-auto">
                    <h1 className="display-4 text-center">Create your question</h1>
                    <p className="lead text-4">Select the correct answer from the buttons on the left</p>
                    <label className="lead text-center">
                        <input className="form-check-input float-right" type="checkbox" onClick={this.isChecked}/>
                        True/False?
                    </label>
                </div>
                <div className="col-lg-12 m-auto">
                        <div className="form-group">
                        <input
                            type="text"
                            className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.password
                            })}
                            placeholder="Question Text"
                            name="questionText"
                            value={this.state.questionText}
                            onChange={this.onChange}
                        />
                    </div>
                  </div>
                <table className="col-lg-12 m-auto">
                <tr>
                    <td>
                      <div className="radio float-left radio-space-wrapper">
                          <label>
                              <input className="radio-space" name="correctAnswer" type="radio" value="A" id="defaultChecked" onChange={this.onChange}/>
                              {this.state.answer1}
                          </label> 
                      </div>
                    </td>
                    <td>
                    <div className="col-lg-12 m-auto">
                        <div className="form-group">
                        <input
                            type="text"
                            className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.password
                            })}
                            placeholder="Answer 1 Text"
                            name="ans1text"
                            value={this.state.ans1text}
                            onChange={this.onChange}
                        />
                    </div>
                  </div>
                  </td>
                </tr>
                <tr>
                    <td>
                      <div className="radio float-left radio-space-wrapper">
                          <label>
                              <input className="radio-space" name="correctAnswer" type="radio" value="B" onChange={this.onChange}/>
                              {this.state.answer1}
                          </label> 
                      </div>
                    </td>
                    <td>
                    <div className="col-lg-12 m-auto">
                        <div className="form-group">
                        <input
                            type="text"
                            className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.password
                            })}
                            placeholder="Answer 2 Text"
                            name="ans2text"
                            value={this.state.ans2text}
                            onChange={this.onChange}
                        />
                    </div>
                  </div>
                  </td>
                </tr>
                <tr>
                    <td>
                      <div className="radio float-left radio-space-wrapper">
                          <label>
                              <input className="radio-space" name="correctAnswer" type="radio" value="C" onChange={this.onChange}/>
                              {this.state.answer1}
                          </label> 
                      </div>
                    </td>
                    <td>
                    <div className="col-lg-12 m-auto">
                        <div className="form-group">
                        <input
                            type="text"
                            className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.password
                            })}
                            placeholder="Answer 3 Text"
                            name="ans3text"
                            value={this.state.ans3text}
                            onChange={this.onChange}
                        />
                    </div>
                  </div>
                  </td>
                </tr>
                <tr>
                    <td>
                      <div className="radio float-left radio-space-wrapper">
                          <label>
                              <input className="radio-space" name="correctAnswer" type="radio" value="D" onChange={this.onChange}/>
                              {this.state.answer1}
                          </label> 
                      </div>
                    </td>
                    <td>
                    <div className="col-lg-12 m-auto">
                        <div className="form-group">
                        <input
                            type="text"
                            className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.password
                            })}
                            placeholder="Answer 4 Text"
                            name="ans4text"
                            value={this.state.ans4text}
                            onChange={this.onChange}
                        />
                    </div>
                  </div>
                  </td>
                </tr>
                <tr>
                    <td>
                      <div className="radio float-left radio-space-wrapper">
                          <label>
                              <input className="radio-space" name="correctAnswer" type="radio" value="E" onChange={this.onChange}/>
                              {this.state.answer1}
                          </label> 
                      </div>
                    </td>
                    <td>
                    <div className="col-lg-12 m-auto">
                        <div className="form-group">
                        <input
                            type="text"
                            className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.password
                            })}
                            placeholder="Answer 5 Text"
                            name="ans5text"
                            value={this.state.ans5text}
                            onChange={this.onChange}
                        />
                    </div>
                  </div>
                  </td>
                </tr>
                <tr>
                    <td>
                      <div className="radio float-left radio-space-wrapper">
                          <label>
                              <input className="radio-space" name="correctAnswer" type="radio" value="F" onChange={this.onChange}/>
                              {this.state.answer1}
                          </label> 
                      </div>
                    </td>
                    <td>
                    <div className="col-lg-12 m-auto">
                        <div className="form-group">
                        <input
                            type="text"
                            className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.password
                            })}
                            placeholder="Answer 6 Text"
                            name="ans6text"
                            value={this.state.ans6text}
                            onChange={this.onChange}
                        />
                    </div>
                  </div>
                  </td>
                </tr>
                </table>
                    <input type="submit" className="btn btn-info btn-block mt-4" onClick={this.onSubmit}/>
            </div>
            {/*</form>*/}
            </div>
        </div>
        );
  }
}

export default CreateQuestion