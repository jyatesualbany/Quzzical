import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'


class CreateTest extends React.Component {
  constructor(props){
    super()
    this.state = {
      isAdmin : true,
      // questionList : props.questionList,
      questionList : []
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)

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
            // console.log('this is the quest id' + quest.qID);
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
        // console.log('state quest id: ' + this.state.questionList[0].qID)
      })
  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit(e){
    e.preventDefault()
  }
  deleteQuestion(question){
    // REMOVE QUESTION FROM DATABASE
    const tempList = this.state.questionList
    tempList.splice(tempList.indexOf(question), 1)
    this.setState({questionList : tempList})
  }
  createQuestionTable = () => {
    let list = []
    list.push(
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Select Question</th>
          <th scope="col">Question Text</th>
          <th scope="col">Answer #1</th>
          <th scope="col">Answer #2</th>
          <th scope="col">Answer #3</th>
          <th scope="col">Answer #4</th>
          <th scope="col">Answer #5</th>
          <th scope="col">Answer #6</th>
          {/* <th scope="col">Delete? </th> */}
        </tr>
      </thead>
    )
    // console.log('length of list: ' + this.state.questionList.questionList[0].questionID);
    
    for (let i = 0; i < this.state.questionList.length; i++) {
      let children = []
      children.push(<td className="align-middle">{i+1}</td>)
      children.push(<td className="align-middle">
        <input className="form-check-input text-align:center" type="checkbox" id="inlineCheckbox1" value={this.state.questionList[i].qID}/>
      </td>)
      // children.push(<td className="align-middle">{this.state.questionList[i].questionText}</td>)
      // console.log(this.state.questionList.questionList[i].questionList);
      console.log('hi');
            
      // children.push(<td className="align-middle">{this.state.questionList[i].qID}</td>)
      children.push(<td className="align-middle">{this.state.questionList[i].q}</td>)
      children.push(<td className="align-middle">{this.state.questionList[i].an1}</td>)
      children.push(<td className="align-middle">{this.state.questionList[i].an2}</td>)
      children.push(<td className="align-middle">{this.state.questionList[i].an3}</td>)
      children.push(<td className="align-middle">{this.state.questionList[i].an4}</td>)
      children.push(<td className="align-middle">{this.state.questionList[i].an5}</td>)
      children.push(<td className="align-middle">{this.state.questionList[i].an6}</td>)
      // children.push(<td><Link className="btn btn-danger btn-space" to="/createTest"
      // onClick={this.deleteQuestion.bind(this, this.state.questionList[i])}>Delete</Link></td>)
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
                    <h1 className="display-4 text-center">CREATE TEST</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <table className="table">
                    <tr>
                      <th scope="col">Test Name:</th>
                      <th scope="col">Test Description:</th>
                      <th scope="col">Time Alloted (Minutes):</th>
                    </tr>
                    <tr>
                      <td className="align-middle">
                        <div className="form-group">
                            <input type="Test Name" className="form-control form-control-lg"
                            placeholder="Test Name" name="Test Name"
                            value={this.state.testName}
                            onChange={this.onChange}
                            />
                        </div>
                      </td>
                      <td className="align-middle">
                        <div className="form-group">
                            <input type="Test Description" className="form-control form-control-lg"
                            placeholder="Test Description" name="Test Description"
                            value={this.state.testDesc}
                            onChange={this.onChange}
                            />
                        </div>
                      </td>
                      <td className="align-middle">
                      <div className="form-group">
                            <input type="Test Time" className="form-control form-control-lg"
                            placeholder="Test Time" name="Test Time"
                            value={this.state.testTime}
                            onChange={this.onChange}
                            />
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
                </div>
                <div className="row">
                    <h1 className="display-12 text-center m-auto">Question Bank:</h1>
                    <table className="table table-striped">
                      {this.createQuestionTable()}
                    </table> 
              </div>
          </div>
          )
      }
}

export default CreateTest
