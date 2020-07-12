import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom'
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import Navbar from './components/Navbar'

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn : false,
      username: null
    }

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    localStorage.setItem('backendURL', 'http://ayushjainrksh-supply-chain.glitch.me');

    var elem = document.querySelector(".sidenav");
    //eslint-disable-next-line
    var instance = M.Sidenav.init(elem, {
        edge: "left",
        inDuration: 250
    });

    this.setState({loggedIn: localStorage.getItem('loggedIn'), username: localStorage.getItem('username')})
  }
  
  updateUser(userObject) {
    this.setState(userObject);
  }
  
  getUser() {
    axios.get(`${localStorage.getItem('backendURL')}/isloggedin`).then(response => {
      if (response.data.user) {
        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }
  
  render() {
    return(
      <div>
        <nav className="teal">
          <div className="nav-wrapper">
            <NavLink to="/" style={{width: "75%"}} className="brand-logo"><span>SupplyChain</span><span><i className="navIcons material-icons">airport_shuttle</i></span></NavLink>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>  {this.state.loggedIn &&
                    <div style={{margin: "0 20px"}}>
                      <span className="new badge red userSpan" data-badge-caption="">
                        {this.state.username.substr(0, this.state.username.indexOf('@'))}
                      </span>
                    </div>
                    }
              </li>
              <li>
                <NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/">
                    <i className="large material-icons left">home</i>
                    Home
                </NavLink>
              </li>
              <li>
                <NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/about">
                  <i className="large material-icons left">info_outline</i>
                  About
                </NavLink>
              </li>
              {this.state.loggedIn && 
              <li>
                <NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/create">
                  <i className="large material-icons left">create</i>
                  Create
                </NavLink>
              </li>
              }
              {this.state.loggedIn && 
              <li>
                <NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/logout">
                  <i className="large material-icons left">exit_to_app</i>
                  Logout
                </NavLink>
              </li>
              }
              {!this.state.loggedIn &&
              <li><NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/register">
                <i className="large material-icons left">person_add</i>
                Register</NavLink></li>
              }
              {!this.state.loggedIn &&       
              <li><NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/login">
                <i className="large material-icons left">input</i>
                Login</NavLink></li>
              }
            </ul>
            <ul id="slide-out" className="sidenav">
            <li>  {this.state.loggedIn &&
                    <div style={{margin: "0 20px"}}>
                      <span className="new badge red userSpan" data-badge-caption="">
                        {this.state.username.substr(0, this.state.username.indexOf('@'))}
                      </span>
                    </div>
                    }
              </li>
              <li><NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/">
                <i className="large material-icons left">home</i>
                Home</NavLink></li>
              <li><NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/about">
                <i className="large material-icons left">info_outline</i>
                About</NavLink></li>
              {this.state.loggedIn && 
              <li><NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/create">
                <i className="large material-icons left">create</i>
                Create</NavLink></li>
              }
              {this.state.loggedIn && 
              <li><NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/logout">
                <i className="large material-icons left">exit_to_app</i>
                Logout</NavLink></li>
              }
              {!this.state.loggedIn &&
              <li><NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/register">
                <i className="large material-icons left">person_add</i>
                Register</NavLink></li>
              }
              {!this.state.loggedIn &&       
              <li><NavLink exact  activeStyle={{backgroundColor:"#008580"}} to="/login">
                <i className="large material-icons left">input</i>
                Login</NavLink></li>
              }
            </ul>
            <a href="#!" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          </div>
        </nav>
        <main><Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} username={this.state.username}/></main>

        <footer className="page-footer teal">
          {/* <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Footer Content</h5>
                <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Links</h5>
                <ul>
                  <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
                </ul>
              </div>
            </div>
          </div> */}
          <div className="footer-copyright">
            <div className="container white-text">
            Copyright © {new Date().getFullYear()}  Made with <span role="img" aria-label="Heart">❤️</span> by AJ
            <a className="white-text right" href="https://ayushja.in" target="_blank" rel="noopener noreferrer">ayushja.in</a>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default App;
