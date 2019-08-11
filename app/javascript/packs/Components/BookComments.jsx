import React, {Component} from 'react';
import axios from 'axios';
import BookShow from './BookShow';
import BookCommentReplies from './BookCommentReplies';

class BookComments extends Component{
  constructor(props){
    super(props);
    this.state = {
      book_comments: [],
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount(){
    this.getBookComments();
  }
  //Modal Stuff
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  //----------- end modal

  getBookComments = () => {
    axios.get(`/books/${this.props.bookIndex}/book_comments/`)
    .then((response) => {
      this.setState({
        book_comments: response.data
      });
    })
    .catch((error) => {
      console.log(error.message)
    })
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

  postReply = (e, passedID) => {
    e.preventDefault();
    let expandInputVal = document.getElementById(`reply-input-show-${passedID}-val`);
    let expandInputForm = document.getElementById(`reply-input-show-${passedID}-form`);
    axios.post(`/books/${this.props.bookIndex}/book_comments/`, {
      parent_id: passedID,
      content: expandInputVal.value
    })
    .then((response) => {console.log(response.data)})
    .catch((error) => console.log(error.message));
    expandInputForm.reset();
    location.reload();
  }

  newReply = (e, passedID) => {
    e.preventDefault();
    let expandInput = document.getElementById(`reply-input-show-${passedID}`);
    let expandInputVal = document.getElementById(`reply-input-show-${passedID}-val`);
    expandInput.style.display = "block";
    expandInput.style.marginLeft = "2rem";
    expandInputVal.focus();

  }

  cancelReply = (e, passedID) => {
    e.preventDefault();
    let expandInput = document.getElementById(`reply-input-show-${passedID}`);
    let expandInputVal = document.getElementById(`reply-input-show-${passedID}-val`);
    let expandInputForm = document.getElementById(`reply-input-show-${passedID}-form`);
    expandInput.style.display = "none";
    expandInputForm.reset();
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
          <input type="text" placeholder={`Posting as ${this.props.user.username}`} ref="commentField" name="commentField" />
          <button type="submit" className="btn btn-small">Post Comment</button>
        </form>
        {this.state.book_comments.length &&
          <ul>
            {this.state.book_comments.map((bComment) =>
              <div key={bComment.id} className="comment-grey">
                <div>
                  <li>
                    <section className="card book-comment">
                      <div className="card-content ">
                        <p className="left"><i>Posted by {bComment.user_id}</i> {bComment.content}</p>
                        <p className="right">Votes: {bComment.votes}</p><br/>
                        <input className="btn btn-small blue lighten-2" type="button" value="Reply" onClick={(e) => this.newReply(e, bComment.id)} />
                        <input className="btn btn-small red lighten-2" type="button" value="Delete" onClick={(e) => this.deleteComment(e, bComment.id)} />
                      </div>
                    </section>
                    <section className="card reply-button" id={`reply-input-show-${bComment.id}`}>
                      <div className="card-content ">
                        <form id={`reply-input-show-${bComment.id}-form`}>
                          <input type="text" id={`reply-input-show-${bComment.id}-val`} name={"replyInputField" + bComment.id} />
                          <input className="btn btn-small blue lighten-2" type="button" value="Post Reply" onClick={(e) => this.postReply(e, bComment.id)} />
                          <input className="btn btn-small red lighten-2" type="button" value="Cancel" onClick={(e) => this.cancelReply(e, bComment.id)} />
                        </form>
                      </div>
                    </section>
                  </li>
                </div>
                {bComment.children.length > 0 &&
                  <BookCommentReplies
                    children={bComment.children}
                    replyButton={this.postReply}
                    deleteButton={this.deleteComment}
                    newReply={this.newReply}
                    cancelReply={this.cancelReply}
                  />
                }
              </div>
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
