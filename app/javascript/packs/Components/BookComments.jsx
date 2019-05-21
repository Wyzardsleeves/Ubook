import React, {Component} from 'react';
import axios from 'axios';
import BookShow from './BookShow';

class BookComments extends Component{
  constructor(props){
    super(props);
    this.state = {
      book_comments: [],
    }
  }

  componentWillMount(){
    this.getBookComments();
  }

  getBookComments = () => {
    axios.get(`/books/${this.props.bookIndex}/book_comments/`)
    .then((response) => {this.setState({book_comments: response.data}, console.log(response.data))})
    .catch((error) => {console.log(error.message)})
  }

  postComment = (e) => {
    e.preventDefault();
    axios.post(`/books/${this.props.bookIndex}/book_comments/`, {
      content: this.refs.commentField.value,
    })
    .then((response) => {console.log(response.data)})
    .catch((error) => console.log(error.message));
    location.reload();
  }

  deleteComment = (e, id) => {
    console.log(id);
    axios.delete(`/books/${this.props.bookIndex}/book_comments/${id}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error.message));
    location.reload();
  }

  render(){
    return(
      <div>
        <h4><i className="fas fa-comments"></i>{this.state.book_comments.length} Comment(s)</h4>
        <form onSubmit={this.postComment}>
          <input type="text" placeholder="Type comment here..... " ref="commentField" />
          <button type="submit" className="btn btn-small">Post Comment</button>
        </form>
        {this.state.book_comments.length &&
          <ul>
            {this.state.book_comments.map((bComments) =>
              <li key={bComments.id}>
                <section className="card book-comment">
                  <div className="card-content ">
                    <p className="left"><i>Posted by {bComments.user_id}</i> {bComments.content}</p>
                    <p className="right">Votes: {bComments.votes}</p><br/>
                    <input className="btn btn-small red lighten-2" type="button" value="Delete" onClick={(e) => this.deleteComment(e, bComments.id)} />
                  </div>
                </section>
              </li>
            )}
          </ul>
        }
        {!this.state.book_comments.length &&
          <p><i>No comments yet.....</i></p>
        }
      </div>
    )
  }
}

export default BookComments;
