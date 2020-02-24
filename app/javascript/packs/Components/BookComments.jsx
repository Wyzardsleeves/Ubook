import React, {Component} from 'react';
import axios from 'axios';
import BookShow from './BookShow';
import BookCommentReplies from './BookCommentReplies';
import {NavLink} from 'react-router-dom';

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
    $(window).keydown(function(event){
      if(event.keyCode == 13) {
        event.preventDefault();
        return false;
      }
    });
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

  /* ------- comment edit ----------- */
  newEdit = (e, passed) => {
    e.preventDefault();
    let passedID = passed.id;
    let passedContent = passed.content;
    let editInputField = document.getElementById(`edit-input-togg-${passedID}`);
    let gettingEditted = document.getElementById(`content-show-${passedID}-val`);
    editInputField.style.display = 'block';
    gettingEditted.style.display = 'none';
  }

  cancelEdit = (e, passed) => {
    e.preventDefault();
    let passedID = passed.id;
    let passedContent = passed.content;
    let editInputField = document.getElementById(`edit-input-togg-${passedID}`);
    let gettingEditted = document.getElementById(`content-show-${passedID}-val`);
    editInputField.style.display = 'none';
    gettingEditted.style.display = 'block';
  }

  editComment = (e, passedID) => {
    e.preventDefault();
    let content = document.getElementById(`edit-input-show-${passedID}-val`);
    axios.put(`/books/${this.props.bookIndex}/book_comments/${passedID}`, {
      content: content.value,
    })
    .then((response) => (response.data))
    .catch((error) => console.log(error.message))
    location.reload();
  }
  /* -------------------------------- */


  render(){
    return(
      <div>
        <h4><i className="fas fa-comments"></i>{this.props.commentCount} Comment(s)</h4>
        <form onSubmit={this.postComment}>
          <input type="text" placeholder={`Posting as ${this.props.user.username}`} ref="commentField" name="commentField" />
          <button type="submit" className="btn btn-small">Post Comment</button>
        </form>
        {this.state.book_comments.length > 0 &&
          <ul>
            {this.state.book_comments.map((bComment) =>
              <div key={bComment.id} className="comment-grey">
                <div>
                  <li>
                    <section className="card book-comment">
                      <div className="card-content ">
                        <div className="edit-input-content" id={`content-show-${bComment.id}-val`}>
                          <p className="left"><i>Posted by <NavLink to={`/user/${bComment.user_id}/books`}>{bComment.creator}</NavLink></i>{bComment.content}</p>
                          <p className="right" id={`content-show-${bComment.id}-val`}>{bComment.created_at != bComment.updated_at && <i>Edited</i>}</p><br/>
                          <input className="btn btn-small blue lighten-2" type="button" value="Reply" onClick={(e) => this.newReply(e, bComment.id)} style={{marginRight: "8px"}} />
                          <input className="btn btn-small orange lighten-2" type="button" value="Edit" onClick={(e) => this.newEdit(e, bComment)} style={{marginRight: "8px"}} />
                          <input className="btn btn-small red lighten-2" type="button" value="Delete" onClick={(e) => this.deleteComment(e, bComment.id)} />
                        </div>
                        <div className='edit-input-togg' id={`edit-input-togg-${bComment.id}`} >
                          <form onSubmit={(e) => this.editComment(e, bComment.id)}>
                            <input type="text" id={`edit-input-show-${bComment.id}-val`} defaultValue={`${bComment.content}`}/>
                            <input className="btn btn-small blue lighten-2" type="button" value="Submit" style={{marginRight: "8px"}} onClick={(e) => this.editComment(e, bComment.id)} />
                            <input className="btn btn-small red lighten-2" type="button" value="Cancel" onClick={(e) => this.cancelEdit(e, bComment)} />
                          </form>
                        </div>
                      </div>
                    </section>
                    <section className="card reply-button" id={`reply-input-show-${bComment.id}`}>
                      <div className="card-content ">
                        <form id={`reply-input-show-${bComment.id}-form`} onSubmit={(e) => this.postReply(e, bComment.id)}>
                          <input type="text" id={`reply-input-show-${bComment.id}-val`} name={"replyInputField" + bComment.id} defaultValue={`@${bComment.creator} `}/>
                          <input className="btn btn-small blue lighten-2" type="button" value="Post Reply" onClick={(e) => this.postReply(e, bComment.id)} style={{marginRight: "8px"}}/>
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
                    // new props
                    newEdit={this.newEdit}
                    editComment={this.editComment}
                    cancelEdit={this.cancelEdit}
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
