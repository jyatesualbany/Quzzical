import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames'

class CreateQuestion extends Component {
  constructor(){
    super()
    this.state = {
      isMult : false,
      questionText : '',
      ans1text : '',
      ans2text : '',
      ans3text : '',
      ans4text : '',
      ans5text : '',
      ans6text : '',
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
    //console.log(this.state.isMult)
    /* console.log(this.state.userName);
    
    const newUser = {
      name: this.state.userName,
      email: this.state.userEmail,
      password: this.state.password,
      password2: this.state.password2,
    }

    console.log(newUser);
    

    axios.post('/api/users/updatePassword', newUser)
         .then(res => {
           if(res.data.output == 'good'){
             window.location = '/userdashboard'
           }
         })
         .catch(err => this.setState({errors: err.response.data}))
         */
  }
  render() {
    const { errors } = this.state;
        return (
        <div className="createQuestion">
            <div className="container">
            <div className="row">
                <div className="col-lg-12 m-auto">
                    <h1 className="display-4 text-center">Create your question</h1>
                    <label className="lead text-center">
                        <input className="form-check-input float-right" type="checkbox" onClick={this.isChecked}/>
                        True/False?
                    </label>
                </div>
                <div className="col-lg-12 m-auto">
                <form noValidate onSubmit={this.onSubmit}>
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
                    {/*{errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                    )}*/}
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password2
                        })}
                        placeholder="Answer 1 Text"
                        name="ans1text"
                        value={this.state.ans1text}
                        onChange={this.onChange}
                    />
                    {/*{errors.password2 && (
                        <div className="invalid-feedback">{errors.password2}</div>
                    )}*/}
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password2
                        })}
                        placeholder="Answer 2 Text"
                        name="ans2text"
                        value={this.state.ans2text}
                        onChange={this.onChange}
                    />
                    {/*{errors.password2 && (
                        <div className="invalid-feedback">{errors.password2}</div>
                    )}*/}
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password2
                        })}
                        placeholder="Answer 3 text"
                        name="ans3text"
                        value={this.state.ans3text}
                        onChange={this.onChange}
                    />
                    {/*{errors.password2 && (
                        <div className="invalid-feedback">{errors.password2}</div>
                    )}*/}
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password2
                        })}
                        placeholder="Answer 4 text"
                        name="ans4text"
                        value={this.state.ans4text}
                        onChange={this.onChange}
                    />
                    {/*{errors.password2 && (
                        <div className="invalid-feedback">{errors.password2}</div>
                    )}*/}
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password2
                        })}
                        placeholder="Answer 5 text"
                        name="ans5text"
                        value={this.state.ans5text}
                        onChange={this.onChange}
                    />
                    {/*{errors.password2 && (
                        <div className="invalid-feedback">{errors.password2}</div>
                    )}*/}
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password2
                        })}
                        placeholder="Answer 6 text"
                        name="ans6text"
                        value={this.state.ans6text}
                        onChange={this.onChange}
                    />
                    {/*{errors.password2 && (
                        <div className="invalid-feedback">{errors.password2}</div>
                    )}*/}
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
                </div>
            </div>
            </div>
        </div>
        );
  }
}

export default CreateQuestion