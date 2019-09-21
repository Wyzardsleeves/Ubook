import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import BookComments from './BookComments';
import BookLikes from './BookLikes';
import BookPublished from './BookPublished';

class BookShow extends Component{
  constructor(props){
    super(props);
    this.state = {
      book: {},
      user: {},
      commentCount: null,
      numPages: null,
      pageNumber: 1,
      widthIndex: null,
    }
  }

  componentWillMount(){
    this.getBook();
    this.checkForNotifications();
  }

  componentDidMount(){
    this.getImageWidth();
  }

  checkForNotifications = () => {
    console.log("Checking notifications from BookShow!");
  }

  onDocumentLoadSuccess = ({numPages}) => {
    this.setState({numPages});
  }

  getBook = () => {
    axios.get(`/books/${this.props.match.params.id}`)
    .then((response) => this.setState({
      book: response.data.bookInfo,
      user: response.data.user,
      commentCount: response.data.commentCount,
    }))
    .catch((error) => {console.log(error.message)})
  }

  goToEdit = () => {
    this.props.history.push(`/book/${this.props.match.params.id}/edit`);
  }

  getImageWidth = () => {
    this.setState({widthIndex: this.refs.bookContain.clientWidth});
  }

  destroyConfirm = () => {
    let confirm = window.confirm("Are you sure you want to delete this book?");
    if(confirm){
      this.destroyBook();
    }
  }

  publishedFunc = () => {
    console.log('This is a print out from the BooksShow Component');
    let published = this.state.book.published;
    if(published){
      axios.put(`/books/${this.props.match.params.id}`,{
        published: 0
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.message))
    }
    else{
      axios.put(`/books/${this.props.match.params.id}`,{
        published: 1
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.message))
    }
    location.reload();
    //this.props.history.push(`/book/${this.props.match.params.id}`)
  }

  destroyBook = () => {
    axios.delete(`/books/${this.props.match.params.id}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error.message))
    this.props.history.push('/');
    location.reload();
  }

  render(){
    const {pageNumber, numPages} = this.state;
    const bookIndex = this.props.match.params.id;
    return(
      <div className="show-book-comp">
        <div className="container">
          <h3><i className="fas fa-book"></i>{this.state.book.title}</h3>
          <section className="card-panel grey lighten-4">
            <section className="book-show-image" ref="bookContain">
              <Document file={this.state.book.attachment} onLoadSuccess={this.onDocumentLoadSuccess}>
                <Page pageNumber={1} renderTextLayer={false} width={this.state.widthIndex} renderAnnotationLayer={false} />
              </Document>
            </section>
            <div className="book-show-info">
              <BookLikes bookIndex={bookIndex} />
              <BookPublished
                publish_stat={this.state.book.published}
                publishedFunc={this.publishedFunc}
              />
              <div>
                <div className="book-user">
                  <p>Uploaded by <strong><NavLink to={`/user/${this.state.book.user_id}/books`}>{this.state.book.creator}</NavLink></strong> with {numPages} pages.</p>
                </div>
                <div className="book-data">
                  <h6><i className="fas fa-theater-masks"></i>{this.state.book.rating}</h6>
                  <h6><i className="fas fa-boxes"></i>{this.state.book.category}</h6>
                </div>
              </div>
              <div className="button">
                <NavLink to={`/read/${bookIndex}`}>
                  <p className="card blue lighten-1">START READING</p>
                </NavLink><br/>
              </div>
              <button className="btn orange lighten-2" onClick={this.goToEdit} style={{marginRight: "10px"}}>Update Book</button>
              <button className="btn red lighten-2" onClick={this.destroyConfirm}>Delete Book</button>
              <h5>{this.state.book.description}</h5>
            </div>
          </section>
          <BookComments
            bookIndex={bookIndex}
            user={this.state.user}
            commentCount={this.state.commentCount} />
        </div>
      </div>
    )
  }
}

export default BookShow;
