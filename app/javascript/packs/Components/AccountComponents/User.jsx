import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import UserBooks from './UserBooks';
import UserComments from './UserComments';
import axios from 'axios';

class User extends Component{
  constructor(props){
    super(props);
    this.state = {
      selected: 'books',
      userData: {},
      userBooks: [],
      userComments: []
    }
  }

  componentWillMount(){
    this.getUserInfo(this.props.match.params.id);
  }

  getUserInfo = (id) => {
    axios.get(`/accounts/${id}`)
    .then((response) => this.setState({
      userData: response.data.user_data,
      userBooks: response.data.user_books,
      userComments: response.data.user_comments
    }))
    .catch((error) => console.log(error.message))
  }

  setSelected = (e, pass) => {
    e.preventDefault();
    this.setState({selected: pass})
  }

  render(){
    return(
      <div className="container">
        <div>
          <h3>{this.state.userData.username}'s Profile</h3>
          <h6>{this.state.userData.bio}</h6>
        </div>
        <div className="user-pages">
          <ul className="user-page">
            <li onClick={(e) => this.setSelected(e, "books")}>
              <Link to={`${this.props.match.url}/books/`} >
                {this.state.selected == "books" &&
                  <h5 style={{borderBottom: "3px solid orange"}}>Books</h5>
                }
                {this.state.selected != "books" &&
                  <h5 style={{paddingBottom: "3px"}}>Books</h5>
                }
              </Link>
            </li>
            <li onClick={(e) => this.setSelected(e, "comments")}>
              <Link to={`${this.props.match.url}/comments/`} >
                {this.state.selected == "comments" &&
                  <h5 style={{borderBottom: "3px solid orange"}}>Comments</h5>
                }
                {this.state.selected != "comments" &&
                  <h5 style={{paddingBottom: "3px"}}>Comments</h5>
                }
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Route path={`${this.props.match.url}/books`} component={() => <UserBooks user_books={this.state.userBooks} user_data={this.state.userData} />} />
          <Route path={`${this.props.match.url}/comments`} component={() => <UserComments user_comments={this.state.userComments} user_data={this.state.userData} /> }/>
        </div>
      </div>
    )
  }
}

export default User;
