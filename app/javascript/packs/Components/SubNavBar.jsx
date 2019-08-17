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
          <div className="sec-1 left">
            <NavLink to="/">
              <i className="fas fa-home"></i>
            </NavLink>
          </div>
          <div className="sec-2 right">
            <NavLink to="/book/new/">
              <i className="fas fa-plus"></i>
            </NavLink>
            <NavLink to={`/user/${this.state.current_user.id}/comments/`}>
              <i className="fas fa-user"></i>
            </NavLink>
          </div>
        </div>
      </div>
    )
  }
}

export default SubNavBar;
