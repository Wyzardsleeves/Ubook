import React, {Component} from 'react';
import axios from 'axios';

class BookLikes extends Component{
  constructor(props){
    super(props);
    this.state = {
      likes: [],
      keepID: 0
    }
  }

  componentDidMount(){
    this.getLikes();
    console.log(this.state.likes);
  }

  testButton = () => {
    console.log(this.state.likes);
  }

  getUser = () => {
    axios.get('/users/check_for_user')
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error.message));
  }

  getLikes = () => {
    axios.get(`/books/${this.props.bookIndex}/book_likes/`)
    .then((response) => {
      this.setState({likes: response.data});
      console.log(response.data)
    })
    .catch((error) => console.log(error.message))
  }

  makeLike = (e) => {
    e.preventDefault();
    axios.post(`/books/${this.props.bookIndex}/book_likes/`)
    .then((response) => console.log(response))
    .catch((error) => console.log(error.message))
  }

  unLike = (e, id) => {
    e.preventDefault();
    axios.delete(`/books/${this.props.bookIndex}/book_likes/${id}`)
    .then((response) => this.setState({keepID: response.data.id}))
    .catch((error) => console.log(error.message))
    //location.reload(); (might need this)
  }

  render(){
    //let likeID = getIdFunc();

    return(
      <div>
        {!this.state.likes.length &&
          <h6 className="like-button blue lighten-2 white-text" onClick={this.makeLike}><i className="fas fa-thumbs-up"></i> Like</h6>
        }
        {this.state.likes.length &&
          <h6 className="liked-button blue-text" onClick={this.getUser}><i className="fas fa-thumbs-up"></i> Liked</h6>
        }
        <i>({this.state.likes.length} total Likes)</i>
      </div>
    )
  }
}

export default BookLikes;
