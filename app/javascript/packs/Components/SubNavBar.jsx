import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

class SubNavBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      current_user: {}
    }
  }

  componentWillMount(){
    this.getCurrentUser();
  }

  getCurrentUser = () => {
    axios.get('/accounts/')
    .then((response) => this.setState({current_user: response.data.current_user}))
    .catch((error) => alert(error.message))
  }

  render(){
    return(
      <div className="sub-nav-bar">
        <div className="container">
          <div className="sec-1 ">
            <NavLink to="/">
              <i className="fas fa-home"></i><h5>Home</h5>
            </NavLink>
          </div>
          <div className="sec-2 ">
            <NavLink to="/book/new/">
              <i className="fas fa-plus"></i><h5>New Book</h5>
            </NavLink>
            <NavLink to={`/user/${this.state.current_user.id}/books/`}>
              <i className="fas fa-user"></i><h5>{this.state.current_user.username}</h5>
            </NavLink>
          </div>
        </div>
      </div>
    )
  }
}

export default SubNavBar;
