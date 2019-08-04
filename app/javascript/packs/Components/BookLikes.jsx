import React, {Component} from 'react';
import axios from 'axios';

class BookLikes extends Component{
  constructor(props){
    super(props);
    this.state = {
      likes: [],
      user: null
    }
  }

  componentWillMount(){
    this.getLikes();
  }

  getLikes = () => {
    axios.get(`/books/${this.props.bookIndex}/book_likes/`)
    .then((response) => {this.setState({likes: response.data.data, user: response.data.user})})
    .catch((error) => console.log(error.message))
  }

  makeLike = (e) => {
    e.preventDefault();
    axios.post(`/books/${this.props.bookIndex}/book_likes/`)
    .then((response) => console.log(response))
    .catch((error) => console.log(error.message))
    location.reload();
  }

  unLike = (e) => {
    e.preventDefault();
    let likes = this.state.likes;
    let userId = this.state.user.id;
    let bookIndex = this.props.bookIndex;
    let like = likes.find((it) => it.user_id == userId && bookIndex == it.book_id)
    axios.delete(`/books/${this.props.bookIndex}/book_likes/${like.id}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error.message))
    location.reload();
  }

  loginToLike = () => {
    alert("Must be logged in to like a book!");
  }



  render(){
    let likes = this.state.likes;

    const LikesSec = () => (
      <div>
        {!likes.find((x) => x.user_id == this.state.user.id) &&
          <h6 className="like-button blue lighten-2 white-text" onClick={this.makeLike}>{this.state.likes.length} <i className="fas fa-thumbs-up"></i> Like</h6>
        }
        {likes.find((x) => x.user_id == this.state.user.id) &&
          <h6 className="liked-button blue-text" onClick={this.unLike}>{this.state.likes.length} <i className="fas fa-thumbs-up"></i> Liked</h6>
        }
      </div>
    )

    return(
      <div>
        {this.state.user &&
          <LikesSec />
        }
        {!this.state.user &&
          <h6 className="like-button blue lighten-2 white-text" onClick={this.loginToLike}>{this.state.likes.length}<i className="fas fa-thumbs-up"></i> Like</h6>
        }
      </div>
    )
  }
}

export default BookLikes;
