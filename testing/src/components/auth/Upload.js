import React, { Component } from 'react';
import axios from 'axios';

class Upload extends Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        }
    }
    onChangeHandler= e =>{
        this.setState({selectedFile: e.target.files[0]}, () =>{
            console.log(this.state.selectedFile)
        })
    }
    onClickHandler = () => {
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        axios.post('api/admin/upload', data)
            .then(results => {
                console.log(results.data.status)
                if(results.data.status == 'good'){
                    window.location = '/admindashboard'
                }
                console.log(results.statusText)
            }).catch(err => console.log(err.response.data))
    }
    render(){
        return (
            <div className="container">
	                  <form method="post" action="#" id="#">
                      <div className="row">
                        <div className="col-md-6 m-auto">
                            <div className="form-group files">
                            <h1>Upload Your File: </h1>
                            <input className = "float-right m-4" type="file" name="file" onChange={this.onChangeHandler}/>
                            </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 m-auto">
                            <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
                        </div>
                      </div>
                     </form>
            </div>
        )
    }

}

export default Upload;