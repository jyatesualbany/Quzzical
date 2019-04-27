import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
//import {".navbar-custom"} from "style.css";
import '../styles/styles.css';
//<ul><img src={'./testing/src/Dog.png'} alt=" UAlbany" style={{color:'white'}}/></ul>
//<h1 className="display-12">UAlbany</h1>

class Navbar extends React.Component {

  render() {
    return (
        <nav className="navbar navbar-color navbar-default navbar-light" >

            <div className="container div" >
              <Link className="nav-link" to="/">Quizzical </Link>
              <a href="">
              <img src={'https://icon2.kisspng.com/20180501/eiq/kisspng-university-at-albany-suny-albany-great-danes-men-heart-beat-logo-5ae80c0d308f12.9001985515251568771989.jpg'} ALIGN="left" alt=" UAlbany" width="100" height="100"/>
              <span>University at Albany</span>
              </a>
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

