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
      testList : props.testList
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
