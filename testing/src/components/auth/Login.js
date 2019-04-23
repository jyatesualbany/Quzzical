import React, { Component }from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Login extends Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: '',
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
    const user = {
      email: this.state.email,
      password: this.state.password

      //passes the input to the login api and user as a payload
    }
     axios.post('/api/users/login', user) 
      .then(res =>{
        if(res.data.redirect == '1'){
          console.log(res.data.redirect)
          window.location = '/admindashboard'
        }else{
          window.location = '/userdashboard'
        }
      })
      .catch(err => this.setState({errors: err.response.data}))
  }

  loginPost(){

  }
  render() {
    return (
      <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">Sign in to your Quizzical account</p>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input type="email" className="form-control form-control-lg"
                      placeholder="Email Address" name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg"
                      placeholder="Password" name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
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

export default Login
