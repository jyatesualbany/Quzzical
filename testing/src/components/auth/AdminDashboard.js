import React from 'react';
import {Link} from 'react-router-dom';

const userInfo = {
    name: "Cory",
    email: "corymarriott@test.gmail",
    accountType: "Administrator",
}

class Dashboard extends React.Component {
  constructor(props){
    super()
    this.state = {
      testList : props.testList,
      isAdmin : true,
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.deleteTest = this.deleteTest.bind(this)

  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit(e){
    e.preventDefault()
  }
  deleteTest(test){
    // REMOVE TEST FROM DATABASE
    const tempList = this.state.testList
    tempList.splice(tempList.indexOf(test), 1)
    this.setState({testList : tempList})
  }
  createAdminTable = () => {
    let list = []
    list.push(
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Test ID</th>
          <th scope="col">Test Name</th>
          <th scope="col">Description</th>
          <th scope="col">View Test</th>
          <th scope="col">Delete? </th>
        </tr>
      </thead>
    )
    for (let i = 0; i < this.state.testList.length; i++) {
      let children = []
      children.push(<td className="align-middle">{i+1}</td>)
      children.push(<td className="align-middle">{this.state.testList[i].testId}</td>)
      children.push(<td className="align-middle">{this.state.testList[i].testName}</td>)
      children.push(<td className="align-middle">{this.state.testList[i].testDescription}</td>)
      children.push(<td><Link className="btn btn-success btn-space" to={{
        pathname: "/AdminViewTest",
        state: { testId : this.state.testList[i].testId}
      }} 
      params={this.state.testList[i]}>View</Link></td>)
      children.push(<td><Link className="btn btn-danger btn-space" to="/dashboard"
      onClick={this.deleteTest.bind(this, this.state.testList[i])}>Delete</Link></td>)
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
    for (let i = 0; i < this.state.testList.length; i++) {
      let children = []
      children.push(<td className="align-middle">{i+1}</td>)
      children.push(<td className="align-middle">{this.state.testList[i].testName}</td>)
      children.push(<td className="align-middle">{this.state.testList[i].testDescription}</td>)
      //children.push(<td>{testList[i].grade}</td>)
      average += this.state.testList[i].grade
      //Create the parent and add the children
      list.push(<tr>{children}</tr>)
    }
    average = average / this.state.testList.length
    if(average < 65){
      list.push(<div className="btn btn-danger btn-space"> Average: {average}</div>)
    }else if(average >= 65 && average < 85){
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
                    <li className="list-group-item">
                      <Link className="btn btn-success btn-space" to="/register">Create Account</Link>
                    </li>
                    <li className="list-group-item">
                      <Link className="btn btn-warning btn-space" to="/register">Create Test</Link>
                    </li>
                    <li className="list-group-item">
                      <Link className="btn btn-danger btn-space" to="/register">Delete Account</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-md-9">
                    <p className="lead text-center">TESTS:</p>
                    <table className="table">
                        {this.createAdminTable()}
                    </table>
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
