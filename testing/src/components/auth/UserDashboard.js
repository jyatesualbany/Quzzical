import React from 'react';
import axios from 'axios' 
import {Link} from 'react-router-dom';

class Dashboard extends React.Component {
  constructor(props){
    super()
    this.state = {
      testList : [],
      userName:  '',
      userEmail: '',
      userType: '',
      userId: '',
      testGrade: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  
  componentDidMount(){
    axios.post('/api/users/current')
        .then(res => {
          if(res.data.bad == 'bad'){
            window.location = '/'
          }
          this.setState({
            userName: res.data.name,
            userEmail: res.data.email,
            userType: 'Student',
            userId: res.data.userId
          })
        }).catch(err =>  console.log(err.response.data))

    axios.get('/api/users/test/',
    {params: {userId: this.state.userId}} )
        .then(res => {
          this.setState({
            testList: res.data.testList
          })
        //console.log(this.state.testList[0].grade)
          //console.log(this.state.testList[0].TEST_ID)
        }).catch(err =>  console.log(err.response.data))
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
          <th scope="col">Test ID</th>
          <th scope="col">Take Test</th>
          <th scope="col">Grade</th>
          <th scope="col">Test Time</th>
        </tr>
      </thead>
    )
    let count = 0
    for (let i = 0; i < this.state.testList.length; i++) {
      let children = []
      let grade = this.state.testList[i].grade
      //console.log("grade", grade)
      if(grade != null){
        count = count + 1
        average += grade
      }
      children.push(<td className="align-middle">{i+1}</td>)
      children.push(<td className="align-middle">{this.state.testList[i].testName}</td>)
      children.push(<td className="align-middle">{this.state.testList[i].testId}</td>)
      if(grade == null){
        children.push(<td><Link className="btn btn-success btn-space" to={{
          pathname: "/Test",
          state: { 
            testId : this.state.testList[i].testId,
            timeLimit : this.state.testList[i].timeLimit,
            testName : this.state.testList[i].testName,
            testGrade: this.state.testList[i].grade
          }
        }}>Take Test</Link></td>)
      }else{
        children.push(<td> <div className="btn btn-primary btn-space"> Test Was Taken </div></td>)
      }
      //children.push(<td>{this.state.testList[i].grade}</td>)
      if(grade == null){
        children.push(<td> <div className="btn btn-primary btn-space"> N/A </div></td>)
      }else if(grade < 65){
        children.push(<td> <div className="btn btn-danger btn-space"> {grade} </div></td>)
      }else if(grade >= 65 && grade < 85){
        children.push(<td> <div className="btn btn-warning btn-space"> {grade} </div></td>)
      }else if(grade > 85){
        children.push(<td> <div className="btn btn-success btn-space"> {grade} </div></td>)
      }
      children.push(<td>{this.state.testList[i].timeLimit}</td>)
      //Create the parent and add the children
      list.push(<tr>{children}</tr>)
    }
    //console.log("count", count)
    average = Number((average/count ).toFixed(2))
    if(average < 65){ 
      list.push(<div className="btn btn-danger btn-space">Average: {average}</div>)
    }else if(average >= 65 && average < 85){
      list.push(<div className="btn btn-warning btn-space">Average: {average}</div>)
    }else if(average > 85){
      list.push(<div className="btn btn-success btn-space">Average: {average}</div>)
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
      <div className="col-md-3 float-left">
        <p className="lead text-center">USER INFO:</p>
        <ul className="list-group">
          <li className="list-group-item">Name: {this.state.userName}</li>
          <li className="list-group-item">User ID: {this.state.userId}</li>
          <li className="list-group-item">Email: {this.state.userEmail}</li>
          <li className="list-group-item">Account Type: {this.state.userType}</li>
          <li className="list-group-item">
            <Link className="btn btn-success btn-space" to='/updatepassword'>Update Password</Link> 
          </li>
        </ul>
      </div>
      <div className="col-md-9">
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
