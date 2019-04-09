import React from 'react';
import axios from 'axios';


class Register extends React.Component {
  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      isAdmin: '',
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

     const newUser = {
       name: this.state.name,
       email: this.state.email,
       password: this.state.password,
       password2: this.state.password2,
       isAdmin: this.state.isAdmin
     }
//     fetch('./routes/api/users/register',{
//       method: 'post',
//       body: JSON.stringify(newUser),
//       headers:{
//         'Content-Type': 'application/json'
//       }
//     });
//
    axios.post('http://localhost:5000/api/users/register', newUser)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="register">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your Quizzical account</p>
          <form onSubmit={this.onSubmit} id="myform" >
            <div className="form-group">
              <input type="text" className="form-control form-control-lg"
                placeholder="Name" name="name"
                value={this.state.name}
                onChange={this.onChange}
                required />
            </div>
            <div className="form-group">
              <input type="email" className="form-control form-control-lg"
                placeholder="Email Address" name="email"
                value={this.state.email}
                onChange={this.onChange}
              required />
            </div>
            <div className="form-group">
              <input type="password" className="form-control form-control-lg"
                placeholder="Password" name="password"
                value={this.state.password}
                onChange={this.onChange}
                required />
            </div>
            <div className="form-group">
              <input type="password" className="form-control form-control-lg"
                placeholder="Confirm Password" name="password2"
                value={this.state.password2}
                onChange={this.onChange}
              required/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control form-control-lg"
                       placeholder="Is Admin (y/n)" name="isAdmin"
                       value={this.state.isAdmin}
                       onChange={this.onChange}
                required/>
            </div>
            <input type="submit" value="submit" className="btn btn-info btn-block mt-4"  />
          </form>
        </div>
      </div>
    </div>
  </div>
    );
  }
}

export default Register

