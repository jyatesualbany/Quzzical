import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import Dashboard from '../auth/AdminDashboard';

class CreateQuestion extends React.Component{
    constructor(){
        super()
        this.state = {
            quest: '',
            ans1Text: '',
            ans1: '',
            ans2Text: '',
            ans2: '',
            ans3Text: '',
            ans3: '',
            ans4Text: '',
            ans4: '',
        }
    }
    onChange(e){
        if(e.target.name == 'Question'){
            this.setState({quest: e.target.value})
        }
    }
    onSubmit(e){
        
    }

    render(){
        return(
            <form onSubmit={this.onSubmit}>
                <div className="question">
                    <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">CREATE QUESTION</h1>
                    </div>
              </div>
                    <td className="align-middle">
                        <div className="form-group">
                            <input type="Question" className="form-control form-control-lg"
                            placeholder="Question" name="Question"
                            value={this.state.quest}
                            onChange={this.onChange}
                            autoFocus={true} required/>
                        </div>
                      </td>
                </div>
            
            </form>
        )
    }
}

export default CreateQuestion