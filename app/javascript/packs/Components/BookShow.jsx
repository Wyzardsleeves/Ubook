import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import BookComments from './BookComments';
import BookLikes from './BookLikes';

class BookShow extends Component{
  constructor(props){
    super(props);
    this.state = {
      book: {},
      user: {},
      numPages: null,
      pageNumber: 1,
      widthIndex: null,
    }
  }

  componentWillMount(){
    this.getBook();
  }

  componentDidMount(){
    this.getImageWidth();
  }

  onDocumentLoadSuccess = ({numPages}) => {
    this.setState({numPages});
  }

  getBook = () => {
    axios.get(`/books/${this.props.match.params.id}`)
    .then((response) => this.setState({
      book: response.data.bookInfo,
      user: response.data.user
    }))
    .catch((error) => {console.log(error.message)})
  }

  goToEdit = () => {
    this.props.history.push(`/book/edit/${this.props.match.params.id}`);
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

  toPrint = () => {
    console.log(this.state.user)
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
              <p>{numPages} total pages.</p>
              <NavLink to={`/read/${bookIndex}`}>
                <p className="card blue lighten-1">START READING</p>
              </NavLink><br/>
              <button className="btn orange lighten-2" onClick={this.goToEdit} style={{marginRight: "10px"}}>Update Book</button>
              <button className="btn red lighten-2" onClick={this.destroyConfirm}>Delete Book</button>
              <h5>{this.state.book.description}</h5>
            </div>
          </section>
          <BookComments bookIndex={bookIndex} user={this.state.user}/>
        </div>
      </div>
    )
  }
}

export default BookShow;
