import React, {Component} from 'react';
import axios from 'axios';

class UserBooks extends Component{

  constructor(props){
    super(props);
    this.state = {
      userBookList: []
    }
  }

  componentWillMount(){
    this.getUserBookList(this.props.match.params.id);
  }

  getUserBookList = (id) => {
    axios.get(`/accounts/${id}`)
    .then((response) => this.setState({userBookList: response.data.user_books}))
    .catch((error) => console.log(error.message))
  }

  render(){
    return(
      <div>
        <div>
          <h4>User's Uploaded Books</h4>
        </div>
        <div>
          {this.state.userBookList.length > 0 &&
            <ul>
              {this.state.userBookList.map((book) =>
                <li key={book.id}>
                  <h5>{book.title}</h5>
                </li>
              )}
            </ul>
          }
          {this.state.userBookList.length == 0 &&
            <h5><i>No books have been uploaded by this user yet.....</i></h5>
          }
        </div>
      </div>
    )
  }
}

export default UserBooks;
