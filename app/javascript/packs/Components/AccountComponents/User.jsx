import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import UserBooks from './UserBooks';
import UserComments from './UserComments';
import axios from 'axios';

class User extends Component{
  constructor(props){
    super(props);
    this.state = {
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

  render(){
    return(
      <div className="container">
        <div>
          <h3>{this.state.userData.username}'s Profile</h3>
        </div>
        <div>
          <Route path={`${this.props.match.url}/books`} component={() => <UserBooks user_books={this.state.userBooks} />} />
          <Route path={`${this.props.match.url}/comments`} component={() => <UserComments user_comments={this.state.userComments} /> }/>
        </div>
      </div>
    )
  }
}

export default User;
