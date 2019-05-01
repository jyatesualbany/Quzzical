import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import update from 'react-addons-update';


class AssignTest extends React.Component {
  constructor(props){
    super()
    this.state = {
      isAdmin : true,
      testName: '',
      testDesc: '',
      testTime: '',
      dateTime: null,
      questionList : []
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.createTest = this.createTest.bind(this)
    this.isChecked = this.isChecked.bind(this)

  }
   
  componentDidMount(){
    // axios.post('/api/admin/getQuestion', {})
    //   .then(res => {
    //     //console.log(res.data.ques)
    //     var array = []
    //     res.data.ques.forEach(x => {
    //       if(x.IS_MULTIPLE == 0){
    //         const quest = {
    //           q: x.QUESTION_TEXT,
    //           an1: x.ANSWER_ONE_TEXT,
    //           an2: x.ANSWER_TWO_TEXT,
    //           qID: x.QUESTION_ID,
    //           correct: x.CORRECT,
    //           isChecked: false
    //         }
    //         // console.log('this is the quest id' + quest.qID);
    //         array.push(quest)
    //         // console.log(array);
            
    //       }else{
    //         var input = {}
    //         input = this.makeObj(input, x)
    //         // console.log(input);
    //         array.push(input)
    //       }
    //     })
    // console.log('state quest id: ' + this.state.questionList[0].qID)
    //   })
    
    axios.post('/api/admin/getUsers', {})
    .then(res => {
        console.log(res.data.users)
        var array = []
        res.data.users.forEach(x => {
            array.push(x.NAME)
        })
        this.setState({
            questionList: array 
        })
    })
  }
  onChange(e){
    if(e.target.name == 'Test Description'){
      this.setState({testDesc : e.target.value})
    }else if(e.target.name == 'TestName'){
      this.setState({testName: e.target.value})
    }else if(e.target.name == 'Test Date'){
      this.setState({dateTime: e.target.value})
    }else{
      this.setState({testTime: e.target.value})
    }
  }
  onSubmit(){
    // e.preventDefault()
    this.createTest()
  }
  isChecked(index){
    console.log("questionList:", this.state.questionList)
    let temp = this.state.questionList
    if(temp[index].isChecked === true){
      temp[index].isChecked = false
      this.setState({ questionList : temp})
    }else{
      temp[index].isChecked = true
      this.setState({ questionList : temp})
    }
  }
  createQuestionTable = () => {
    let list = []
    list.push(
      <thead>
        <tr>
          {/* <th scope="col">#</th> */}
          <th scope="col">Select User</th>
          {/* <th scope="col">Delete? </th> */}
        </tr>
      </thead>
    )
    // console.log('length of list: ' + this.state.questionList.questionList[0].questionID);
    
    for (let i = 0; i < this.state.questionList.length; i++) {
      let children = []
      children.push(<td className="align-middle">{i+1}</td>)
      children.push(<td className="align-middle">
        <input className="form-check-input text-align:center" type="checkbox" id="inlineCheckbox1" 
        onClick={this.isChecked.bind(this, i)}/>
      </td>)
      children.push(<td className="align-middle">{this.state.questionList[i]}</td>)
      //Create the parent and add the children
      list.push(<tr>{children}</tr>)
    }
    return list
  }
  createTest(){
    let selectedQuestions = []
    for(let i=0; i<this.state.questionList.length; i++){
      if(this.state.questionList[i].isChecked ===  true){
        selectedQuestions.push(this.state.questionList[i])
      }
    }
    
    const input = {
      users: selectedQuestions,
    } 
    
    axios.post('/api/admin/assginTesr', input)
      .then(res => {
        console.log('it worked')
      })
  }
  render() {
          return(
            // <form onChange={this.onChange}>
            <form onSubmit={this.onSubmit}>
            <div className="dashboard">
              <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Assgin TEST</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <table className="table">
                    <tr>
                      <td className="align-middle">
                        <div className="form-group">
                        <Link className="btn btn-success btn-space" to="/admindashboard"
                            onClick={this.onSubmit.bind(this, this.state.questionList)}>Assgin Test</Link>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
                </div>
                <div className="row">
                    <h1 className="display-12 text-center m-auto">User Bank:</h1>
                    <table className="table table-striped">
                      {this.createQuestionTable()}
                    </table> 
              </div>
          </div>
         </form>
          )
      }
}
export default AssignTest
