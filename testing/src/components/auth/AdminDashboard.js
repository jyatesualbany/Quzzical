import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'

const userInfo = {
    name: "Cory",
    email: "corymarriott@test.gmail",
    accountType: "Administrator",
}

class Dashboard extends React.Component {
  constructor(props){
    super()
    this.state = {
      // testList : props.testList,
      testList : [],
      isAdmin : true,
      userName: '',
      userEmail: '',
      userType: 'Administrator',
      // questionList : props.questionList
      questionList : []
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.deleteTest = this.deleteTest.bind(this)

  }
  makeObj(input, x){
    if(x.ANSWER_FIVE_TEXT == null){
      input = {
        q: x.QUESTION_TEXT,
        an1: x.ANSWER_ONE_TEXT,
        an2: x.ANSWER_TWO_TEXT,
        an3: x.ANSWER_THREE_TEXT,
        an4: x.ANSWER_FOUR_TEXT,
        qID: x.QUESTION_ID,
        correct: x.CORRECT
      }
      return input
    }else if(x.ANSWER_SIX_TEXT == null){
       input = {
        q: x.QUESTION_TEXT,
        an1: x.ANSWER_ONE_TEXT,
        an2: x.ANSWER_TWO_TEXT,
        an3: x.ANSWER_THREE_TEXT,
        an4: x.ANSWER_FOUR_TEXT,
        an5: x.ANSWER_FIVE_TEXT,
        qID: x.QUESTION_ID,
        correct: x.CORRECT
      }
      return input
    }else{
      input = {
        q: x.QUESTION_TEXT,
        an1: x.ANSWER_ONE_TEXT,
        an2: x.ANSWER_TWO_TEXT,
        an3: x.ANSWER_THREE_TEXT,
        an4: x.ANSWER_FOUR_TEXT,
        an5: x.ANSWER_FIVE_TEXT,
        an6: x.ANSWER_SIX_TEXT,
        qID: x.QUESTION_ID,
        correct: x.CORRECT
      }
    }
  }
  componentDidMount(){
    axios.post('/api/users/current', userInfo)
      .then(res => {
        // console.log(res.data.email)
        this.setState({
          userEmail: res.data.email,
          userName: res.data.name
        })
      })
    
    axios.post('/api/admin/getQuestion', {})
      .then(res => {
        console.log(res.data.ques)
        var array = []
        res.data.ques.forEach(x => {
          if(x.IS_MULTIPLE == 0){
            const quest = {
              q: x.QUESTION_TEXT,
              an1: x.ANSWER_ONE_TEXT,
              an2: x.ANSWER_TWO_TEXT,
              qID: x.QUESTION_ID,
              correct: x.CORRECT,
            }
            // console.log(quest);
            array.push(quest)
            // console.log(array);
            
          }else{
            var input = {}
            input = this.makeObj(input, x)
            // console.log(input);
            array.push(input)
          }
        })
        this.setState({
          questionList: array 
        })
        console.log(this.state.questionList[2].qID)
      })

    axios.post('/api/admin/getTest', {})
      .then(res => {
        // console.log(res);
        
        var array = []
        res.data.test.forEach(x => {
          console.log(x.TEST_ID);
          
          const test = {
            tID: x.TEST_ID,
            td: x.TEST_DESCRIPTION,
            tl: x.TIME_LIMIT 
          }
          // console.log(test.tID);
          
          array.push(test)
          // console.log(array[0].tID);
          
        })
        this.setState({
          testList: array
        })
        console.log(this.state.testList);
        console.log(this.state.testList.tID);
        
      })  
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
      children.push(<td className="align-middle">{this.state.testList[i].tId}</td>)
      children.push(<td className="align-middle">{this.state.testList[i].testName}</td>)
      children.push(<td className="align-middle">{this.state.testList[i].td}</td>)
      children.push(<td><Link className="btn btn-success btn-space" to={{
        pathname: "/AdminViewTest",
        state: { testId : this.state.testList[i].testId}
      }}>View</Link></td>)
      children.push(<td><Link className="btn btn-danger btn-space" to="/admindashboard"
      onClick={this.deleteTest.bind(this, this.state.testList[i])}>Delete</Link></td>)
      //Create the parent and add the children
      list.push(<tr>{children}</tr>)
    }
    return list
  }

  createQuestionBankTable = () => {
    let list = []
    list.push(
      <thead>
        <tr>
          <th scope="col" className="align-middle">#</th>
          <th scope="col" className="align-middle">Question ID</th>
          <th scope="col" className="align-middle">Question </th>
          <th scope="col" className="align-middle">Answer #1</th>
          <th scope="col" className="align-middle">Answer #2</th>
          <th scope="col" className="align-middle">Answer #3</th>
          <th scope="col" className="align-middle">Answer #4</th>
          <th scope="col" className="align-middle">View</th>
          <th scope="col" className="align-middle">Delete? </th>
        </tr>
      </thead>
    )
    for (let i = 0; i < this.state.questionList.length; i++) {
      let children = []
      children.push(<td className="align-middle">{i+1}</td>)
      children.push(<td className="align-middle">{this.state.questionList[i].qID}</td>)
      children.push(<td className="align-middle">{this.state.questionList[i].q}</td>)
      children.push(<td className="align-middle">{this.state.questionList[i].an1}</td>)
      children.push(<td className="align-middle">{this.state.questionList[i].an2}</td>)
      children.push(<td className="align-middle">{this.state.questionList[i].an3}</td>)
      children.push(<td className="align-middle">{this.state.questionList[i].an4}</td>)
      children.push(<td><Link className="btn btn-success btn-space" to={{
        pathname: "/AdminViewTest",
        state: { questionId : this.state.questionList[i].questionId}
      }}>View</Link></td>)
      children.push(<td><Link className="btn btn-danger btn-space" to="/admindashboard"
      onClick={this.deleteTest.bind(this, this.state.testList[i])}>Delete</Link></td>)
      //Create the parent and add the children
      list.push(<tr>{children}</tr>)
    }
    return list
  }
  render() {
          return(
            <div className="dashboard">
              <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">ADMIN DASHBOARD</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <table className="table">
                    <tr>
                      <th scope="col">Name:</th>
                      <th scope="col">Email:</th>
                      <th scope="col">Create Account</th>
                      <th scope="col">Create Test</th>
                      <th scope="col">Upload Test</th>
                      <th scope="col">Update Password</th>
                    </tr>
                    <tr>
                      <td className="align-middle">{this.state.userName}</td>
                      <td className="align-middle">{this.state.userEmail}</td>
                      <td className="align-middle">
                        <Link className="btn btn-success btn-space" to="/register">Create Account</Link>
                      </td>
                      <td className="align-middle">
                        <Link className="btn btn-warning btn-space" to="/createtest">Create Test</Link>
                      </td>
                      <td className="align-middle">
                        <Link className="btn btn-success btn-space" to="/upload">Upload Test</Link>
                      </td>
                      <td className="align-middle">
                        <Link className="btn btn-warning btn-space" to="/updatepassword">Update Password</Link>
                      </td>
                    </tr>
                  </table>
                </div>
                </div>
                <div className="row">
                <div className="col-md-12">
                  <h1 className="display-12 text-center">TESTS:</h1>
                    <table className="table table-striped">
                        {this.createAdminTable()}
                    </table>
                    <h1 className="display-12 text-center">Question Bank:</h1>
                    <table className="table table-striped">
                      {this.createQuestionBankTable()}
                    </table>
                    
                </div>
               
              </div>
          </div>
          )
      }
}

export default Dashboard
