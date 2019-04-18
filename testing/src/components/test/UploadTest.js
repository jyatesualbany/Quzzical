import React from 'react';
import axios from 'axios'
//UploadTest.js - new page


class UploadTest extends React.Component {
    constructor(){
        super()
        //AdminInfo.ID
        this.test=""

        this.onSubmit = this.onSubmit.bind(this)
    }

    //take in csv file from rendering
    onSubmit(e){
        e.preventDefault()
        //new test query with default setting (test title, test description, ...
        const newTest = {
            name: "TEST NAME",
            //null values: Inassignment description, start_time, end_time, ... is_multiple (boolean)
        }
    //open csv file

    //go through csv line by line (temp[6] for T/f, [10|12|14] for MC)
        //line either: Q.num, Q.text, Ans1, Ans1.text, Ans2, Ans2.text, Ans3, Ans3.text, Ans4, Ans4.text, Ans5, Ans5.text, Ans6, Ans6.text
        //true & false: Q.num, Q.text, Ans1, Ans1.text, Ans2, Ans2.text

        //code in practice.js

    render() {
        return (
        <div className="UploadTest">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Add Test</h1>
                    <p className="lead text-center">Upload your CSV file:</p>

                    //submit button - sends file
                    <input id='fileid' type='file' hidden/>
                    <input id='buttonid' type='button' value='Upload CSV' onsubmit="OnSubmit()"/>
                    //send file to the onSubmit function





                </div>
            </div>
        </div>


        );
    }


}