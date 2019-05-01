import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import update from 'react-addons-update';


class AssignTest extends React.Component {
  constructor(props){
    super()
    this.state = {
      isAdmin : true,
      testName: props.location.state.test.tn,
      testDesc: props.location.state.test.td,
      testTime: props.location.state.test.tl,
      dateTime: null,
      userList : []
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.assignTest = this.assignTest.bind(this)
    this.isChecked = this.isChecked.bind(this)

  }
  componentDidMount(){
    axios.post('/api/admin/getUsers', {})
    .then(res => {
        //console.log(res.data.users)
        var array = []
        res.data.users.forEach(x => {
            array.push(x)
        })
        this.setState({ userList: array })
    })
  }
  onChange(e){
  }
  onSubmit(){
    // e.preventDefault()
    this.assignTest()
  }
  isChecked(index){
    console.log("TestName:", this.state.testName)
    let temp = this.state.userList
    if(temp[index].isChecked === true){
      temp[index].isChecked = false
      this.setState({ userList : temp})
    }else{
      temp[index].isChecked = true
      this.setState({ userList : temp})
    }
  }
  createUserTable = () => {
    let list = []
    list.push(
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Select User</th>
          <th scope="col">User ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          {/* <th scope="col">Delete? </th> */}
        </tr>
      </thead>
    )
    // console.log('length of list: ' + this.state.questionList.questionList[0].questionID);
    
    for (let i = 0; i < this.state.userList.length; i++) {
      let children = []
      children.push(<td className="align-middle">{i+1}</td>)
      children.push(<td className="align-middle">
        <input className="form-check-input text-align:center" type="checkbox" id="inlineCheckbox1" 
        onClick={this.isChecked.bind(this, i)}/>
      </td>)
      children.push(<td className="align-middle">{this.state.userList[i].USER_ID}</td>)
      children.push(<td className="align-middle">{this.state.userList[i].NAME}</td>)
      children.push(<td className="align-middle">{this.state.userList[i].EMAIL}</td>)
      //Create the parent and add the children
      list.push(<tr>{children}</tr>)
    }
    return list
  }
  assignTest(){
    let selectedUsers = []
    for(let i=0; i<this.state.userList.length; i++){
      if(this.state.userList[i].isChecked ===  true){
        selectedUsers.push(this.state.userList[i])
      }
    }
    //console.log("selected users:", selectedUsers)
    //console.log('this the the create test fn: ' + this.state.testName);
    
    const input = {
      test: selectedUsers,
      tName: this.state.testName,
      tDes: this.state.testDesc,
      tTime: this.state.testTime,
      dateTime: this.state.dateTime
    } 
   
    axios.post('/api/admin/assginTest', input)
      .then(res => {
        console.log('it worked')
      })
    //console.log("SELECTED QUESTIONS:", selectedUsers)
    //console.log("Test Name:", this.state.testName)
    // QUERY DB WITH LIST OF SELECTED QUESTIONS AND TEXT FROM INPUT BOXES
  }
  render() {
          return(
            // <form onChange={this.onChange}>
            <form onSubmit={this.onSubmit}>

            <div className="dashboard">
              <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">ASSIGN USERS TO TEST</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <table className="table">
                    <tr>
                      <th scope="col">Test Name:</th>
                      <th scope="col">Test Description:</th>
                      <th scope="col">Time Allotted (Minutes):</th>
                      <th scope="col">Date of Test(YYYY-MM-DD HH:MI:SS):</th>
                      <th scope="col">Create Test: </th>
                    </tr>
                    <tr>
                      <td className="align-middle">
                        <div className="form-group">
                            <p>{this.state.testName}</p>
                        </div>
                      </td>
                      <td className="align-middle">
                        <div className="form-group">
                            <p>{this.state.testDesc}</p>
                        </div>
                      </td>
                      <td className="align-middle">
                        <div className="form-group">
                        <p>{this.state.testTime}</p>
                        </div>
                      </td>
                      <td className="align-middle">
                        <p>{this.state.testDate}</p>
                      </td>
                      <td className="align-middle">
                        <div className="form-group">
                        <Link className="btn btn-success btn-space" to="/admindashboard"
                            // onClick={this.createTest.bind(this, this.state.questionList)}>Create Test</Link>
                            onClick={this.onSubmit.bind(this, this.state.userList)}>Assign Users</Link>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
                </div>
                <div className="row">
                    <h1 className="display-12 text-center m-auto">Users:</h1>
                    <table className="table table-striped">
                      {this.createUserTable()}
                    </table> 
              </div>
          </div>
         </form>
          )
      }
}
export default AssignTest
