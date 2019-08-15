import React, {Component} from 'react';
import axios from 'axios';

class UserComments extends Component{
  constructor(props){
    super(props);
    this.state = {
      user_comments: []
    }
  }

  componentWillMount(){
    this.getUserComments(this.props.match.params.id);
  }

  getUserComments = (id) => {
    axios.get(`/accounts/${id}`)
    .then((response) => this.setState({user_comments: response.data.user_comments}))
    .catch((error) => console.log(error.message))
  }

  render(){
    return(
      <div>
        <div>
          <h4>User's Posted Comments</h4>
        </div>
        <div>
          <ul>
            {this.state.user_comments.map((comment) =>
              <li key={comment.id}>
                <h5>{comment.content}</h5>
              </li>
            )}
          </ul>

        </div>
      </div>
    )
  }
}

export default UserComments;
