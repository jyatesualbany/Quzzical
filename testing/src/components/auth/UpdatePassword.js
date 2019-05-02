import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames'

class UpdatePassword extends Component {
  constructor(){
    super()
    this.state = {
      userEmail: '',
      userName: '',
      password: '',
      password2: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount(){
    axios.post('/api/users/current', {})
      .then(res => {
        // console.log(res.data.email)
        if(res.data.bad == 'bad'){
          window.location = '/'
        }
        this.setState({
          userEmail: res.data.email,
          userName: res.data.name
        })
        console.log(this.state);
        
      })
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e){
    e.preventDefault()
    // console.log(this.state.userName);
    
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
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Update Password</h1>
              <p className="lead text-center">
                Change your Quizzical Password
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
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

export default UpdatePassword