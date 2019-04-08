import React from 'react';
import {Link} from 'react-router-dom';

// fetch list from database
const testList = [1,2,3,4]

// fetch admin info from database
const userInfo = {
    name: "Cory",
    email: "corymarriott@test.gmail",
    accountType: "Administrator",
}

class Dashboard extends React.Component {
  constructor(){
    super()
    this.state = {
        isAdmin : true,
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit(e){
    e.preventDefault()
  }
  createTable = () => {
    let table = []

    // Outer loop to create parent
    for (let i = 0; i < testList.length; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 0; j < 4; j++) {
        children.push(<td>{`Column ${j + 1}`}</td>)
      }
      //Create the parent and add the children
      table.push(<tr>{children}</tr>)
    }
    return table
  }
  render() {
      if(this.state.isAdmin){
          return(
            <div className="dashboard">
              <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">ADMIN DASHBOARD</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 float-left">
                  <p className="lead text-center">USER INFO:</p>
                  <ul className="list-group">
                    <li className="list-group-item">Name: {userInfo.name}</li>
                    <li className="list-group-item">Email: {userInfo.email}</li>
                    <li className="list-group-item">Account Type: {userInfo.accountType}</li>
                </ul>
                </div>
                <div className="col-md-6">
                    <p className="lead text-center">TESTS:</p>
                    <table>
                        {this.createTable()}
                    </table>
                </div>
                <div className="col-md-3 float-right">
                    <Link className="btn btn-success btn-space" to="/register">Create Account</Link>
                    <Link className="btn btn-danger btn-space" to="/register">Delete Account</Link>
                </div>
              </div>
          </div>
          )
      }
    return (
<div className="dashboard">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">DASHBOARD</h1>
          <p className="lead text-center">SOME SHIT</p>
        </div>
      </div>
    </div>
  </div>
    );
  }
}

export default Dashboard
