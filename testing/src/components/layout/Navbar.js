import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
//import {".navbar-custom"} from "style.css";
import '../styles/styles.css';
//<ul><img src={'./testing/src/Dog.png'} alt=" UAlbany" style={{color:'white'}}/></ul>
//<h1 className="display-12">UAlbany</h1>
//<span>University at Albany</span>
import axios from 'axios'

var logo='https://saltcitysniperslacrosse.com/wp-content/uploads/2016/08/albany.png'
//}
class Navbar extends React.Component {

  checkSession(){
    axios.post('/api/users/current', {})
      .then(res => {
        if(res.data.bad == 'bad'){
        }else if(res.data.isAdmin == 'n'){
          window.location = '/userdashboard'
        }else{
          window.location = '/admindashboard'
        }
      })
  }

  render() {
    return (
        <nav className="navbar navbar-color navbar-default navbar-light" >

            <div className="container div" >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item header">
                  <Link className="nav-link header" to="/">
                  {/* <Link className="nav-link header" to={this.checkSession()}> */}
                  {/* <Link className="nav-link header" to={this.checkSession()}> */}
                    <img src={logo} ALIGN="left" alt=" UAlbany" width="50" height="50"/>
                    </Link>
                  </li>
              </ul>
              <ul className="navbar-nav mr-auto">
                <li className="nav-item header">
                  <h1 className="display-12 header">University at Albany</h1>
                </li>
              </ul>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/profiles"> Grades/Placeholder
                    </Link>
                  </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/logout">Logout</Link>
                  </li>

                </ul>
              </div>
            </div>
          </nav>

    );
  }
}
export default Navbar