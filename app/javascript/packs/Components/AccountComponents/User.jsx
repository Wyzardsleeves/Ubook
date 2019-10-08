import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import UserBooks from './UserBooks';
import UserComments from './UserComments';
import UserLikedBooks from './UserLikedBooks';
import axios from 'axios';
import {Helmet} from 'react-helmet';

class User extends Component{
  constructor(props){
    super(props);
    this.state = {
      selected: 'books',
      userData: {},
      userBooks: [],
      userComments: [],
      UserLikedBooks: []
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
      userComments: response.data.user_comments,
      UserLikedBooks: response.data.user_liked_books
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
        <Helmet>
          <title>{`${this.state.userData.username}'s profile`}</title>
          <meta name="description" content={`Books from ${this.state.userData.username}. Click to read on Ubook!`} />
        </Helmet>
        <div className="user-head">
          <h3><i className="fas fa-user-circle"></i>{this.state.userData.username}'s Profile</h3>
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
            <li onClick={(e) => this.setSelected(e, "liked_books")}>
              <Link to={`${this.props.match.url}/liked_books/`} >
                {this.state.selected == "liked_books" &&
                  <h5 style={{borderBottom: "3px solid orange"}}>Liked Books</h5>
                }
                {this.state.selected != "liked_books" &&
                  <h5 style={{paddingBottom: "3px"}}>Liked Books</h5>
                }
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Route path={`${this.props.match.url}/books`} component={() => <UserBooks user_books={this.state.userBooks} user_data={this.state.userData} />} />
          <Route path={`${this.props.match.url}/comments`} component={() => <UserComments user_comments={this.state.userComments} user_data={this.state.userData} /> }/>
          <Route path={`${this.props.match.url}/liked_books`} component={() => <UserLikedBooks user_liked_books={this.state.UserLikedBooks} user_data={this.state.userData} /> }/>
        </div>
      </div>
    )
  }
}

export default User;
