import React, {Component} from 'react';
import axios from 'axios';

class BookLikes extends Component{
  constructor(props){
    super(props);
    this.state = {
      likes: [],
      user: 0
    }
  }

  componentWillMount(){
    this.getLikes();
  }

  componentDidMount(){

  }

  getLikes = () => {
    axios.get(`/books/${this.props.bookIndex}/book_likes/`)
    .then((response) => {
      this.setState({likes: response.data.data, user: response.data.user});
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

  unLike = (e) => {
    e.preventDefault();
    let likes = this.state.likes;
    let userId = this.state.user.id;
    let bookIndex = this.props.bookIndex;
    let like = likes.find((it) => it.user_id == userId && bookIndex == it.book_id)
    axios.delete(`/books/${this.props.bookIndex}/book_likes/${like.id}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error.message))
    //location.reload(); (might need this)
  }

  render(){

    return(
      <div>
        {!this.state.likes.find((x) => x.user_id == this.state.user.id) &&
          <h6 className="like-button blue lighten-2 white-text" onClick={this.makeLike}><i className="fas fa-thumbs-up"></i> Like</h6>
        }
        {this.state.likes.find((x) => x.user_id == this.state.user.id) &&
          <h6 className="liked-button blue-text" onClick={this.unLike}><i className="fas fa-thumbs-up"></i> Liked</h6>
          /*<h6 className="liked-button blue-text" onClick={this.getLikeId}><i className="fas fa-thumbs-up"></i> Liked</h6>*/
        }
        <i>({this.state.likes.length} total Likes)</i>
      </div>
    )
  }
}

export default BookLikes;
