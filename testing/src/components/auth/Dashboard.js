import React from 'react';
import {Link} from 'react-router-dom';

// fetch list from database
const testList = []
const test1 = {
  name : "THIS IS A TEST",
  description : "YOLO",
  grade: 95
}
const test2 = {
  name : "THIS IS A TEST",
  description : "YOLO",
  grade: 20
}
const test3 = {
  name : "THIS IS A TEST",
  description : "YOLO",
  grade: 80
}
testList.push(test1)
testList.push(test2)
testList.push(test3)

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
        isAdmin : false,
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
  createAdminTable = () => {
    let list = []
    list.push(
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Test Name</th>
          <th scope="col">Description</th>
          <th scope="col">Delete? </th>
        </tr>
      </thead>
    )
    for (let i = 0; i < testList.length; i++) {
      let children = []
      for (let j = 0; j < 3; j++) {
        children.push(<td>{`Column ${j + 1}`}</td>)
      }
      children.push(<td><Link className="btn btn-danger btn-space" to="/dashboard">Delete</Link></td>)
      //Create the parent and add the children
      list.push(<tr>{children}</tr>)
    }
    return list
  }
  createUserTable = () => {
    let average=0
    let list = []
    list.push(
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Test Name</th>
          <th scope="col">Description</th>
          <th scope="col">Grade</th>
        </tr>
      </thead>
    )
    for (let i = 0; i < testList.length; i++) {
      let children = []
      children.push(<td>{i}</td>)
      children.push(<td>{testList[i].name}</td>)
      children.push(<td>{testList[i].description}</td>)
      children.push(<td>{testList[i].grade}</td>)
      average += testList[i].grade
      //Create the parent and add the children
      list.push(<tr>{children}</tr>)
    }
    average = average / testList.length
    if(average < 65){
      list.push(<div className="btn btn-danger btn-space"> Average: {average}</div>)
    }
    else if(average >= 65 && average < 85){
      list.push(<div className="btn btn-warning btn-space"> Average: {average}</div>)
    }else if(average > 85){
      list.push(<div className="btn btn-success btn-space"> Average: {average}</div>)
    }
    return list
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
                    <table className="table">
                        {this.createAdminTable()}
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
    <div className="row">
      <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">USER DASHBOARD</h1>
      </div>
    </div>
    <div className="row">
      <div className="col-md-4 float-left">
        <p className="lead text-center">USER INFO:</p>
        <ul className="list-group">
          <li className="list-group-item">Name: {userInfo.name}</li>
          <li className="list-group-item">Email: {userInfo.email}</li>
          <li className="list-group-item">Account Type: {userInfo.accountType}</li>
        </ul>
      </div>
      <div className="col-md-8">
          <p className="lead text-center">TESTS:</p>
          <table className="table">
              {this.createUserTable()}
          </table>
      </div>
    </div>
    </div>
    );
  }
}

export default Dashboard
