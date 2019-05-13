import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import BookComments from './BookComments'

class BookShow extends Component{
  constructor(props){
    super(props);
    this.state = {
      book: {},
      numPages: null,
      pageNumber: 1,
      widthIndex: null
    }
  }

  componentWillMount(){
    this.getBook();
  }

  componentDidMount(){
    console.log(this.refs);
    let getWidth = this.refs.containwidth.clientWidth;
    this.setState({widthIndex: getWidth}, console.log(this.state.widthIndex));
  }

  onDocumentLoadSuccess = ({numPages}) => {
    this.setState({numPages});
  }

  getBook = () => {
    axios.get(`/books/${this.props.match.params.id}`)
    .then((response) => {this.setState({book: response.data}, console.log(response.data))})
    .catch((error) => {console.log(error.message)})
  }

  goToEdit = () => {
    this.props.history.push(`/book/edit/${this.props.match.params.id}`);
  }

  destroyConfirm = () => {
    let confirm = window.confirm("Are you sure you want to delete this book?");
    if(confirm){
      this.destroyBook();
    }
  }

  destroyBook = () => {
    axios.delete(`/books/${this.props.match.params.id}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error.message))
    this.props.history.push('/');
    location.reload();
  }

  sizeRef = (ele) => {
    console.log(ele.current.clientWidth);
  }

  render(){
    const {pageNumber, numPages} = this.state;
    const bookIndex = this.props.match.params.id;
    return(
      <div className="show-book-comp">
        <div ref="containwidth" className="container">
          <NavLink to={`/book/read`}>
            <h3><i className="fas fa-book"></i>{this.state.book.title}</h3>
          </NavLink>
          <button className="btn orange lighten-2" onClick={this.goToEdit} style={{marginRight: "10px"}}>Update Book</button>
          <button className="btn red lighten-2" onClick={this.destroyConfirm}>Delete Book</button>
          <h5>{this.state.book.description}</h5>
          <div>
            <Document
              file={this.state.book.attachment}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber}
                renderMode="svg"
                width={this.state.widthIndex}
              />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
          </div>
          <BookComments bookIndex={bookIndex} />
        </div>
      </div>
    )
  }
}

export default BookShow;
