import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'


class CreateTest extends React.Component {
  constructor(props){
    super()
    this.state = {
      isAdmin : true,
      questionList : props.questionList,
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)

  }

  componentDidMount(){
      axios.get('/api/admin/getQuestions/',
    {params: {userId: this.state.userId}} )
        .then(res => {
          this.setState({
            testList: res.data.testList
          })
          //console.log(this.state.testList[0].TEST_ID)
        }).catch(err =>  console.log(err.response.data))
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
          <th scope="col">Delete? </th>
        </tr>
      </thead>
    )
    for (let i = 0; i < this.state.questionList.length; i++) {
      let children = []
      children.push(<td className="align-middle">{i+1}</td>)
      children.push(<td className="align-middle">
        <input className="form-check-input text-align:center" type="checkbox" id="inlineCheckbox1" value={this.state.questionList[i].questionID}/>
      </td>)
      children.push(<td className="align-middle">{this.state.questionList[i].questionText}</td>)
      children.push(<td className="align-middle">{this.state.questionList[i].questionAnswer1}</td>)
      children.push(<td className="align-middle">{this.state.questionList[i].questionAnswer2}</td>)
      children.push(<td className="align-middle">{this.state.questionList[i].questionAnswer3}</td>)
      children.push(<td className="align-middle">{this.state.questionList[i].questionAnswer4}</td>)
      children.push(<td className="align-middle">{this.state.questionList[i].questionAnswer5}</td>)
      children.push(<td className="align-middle">{this.state.questionList[i].questionAnswer6}</td>)
      children.push(<td><Link className="btn btn-danger btn-space" to="/createTest"
      onClick={this.deleteQuestion.bind(this, this.state.questionList[i])}>Delete</Link></td>)
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
