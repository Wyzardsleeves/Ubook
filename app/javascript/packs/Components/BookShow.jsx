import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

class BookShow extends Component{
  constructor(props){
    super(props);
    this.state = {
      book: {}
    }
  }

  componentWillMount(){
    console.log(this.props);
    this.getBook();
  }

  getBook = () => {
    axios.get(`/books/${this.props.match.params.id}`)
    .then((response) => {this.setState({book: response.data})})
    .catch((error) => {console.log(error.message)})
  }

  render(){
    return(
      <div className="container">
        <h3>This is the Show page for a book</h3>
        <h5>{this.state.book.title}</h5>
        <h5>{this.state.book.description}</h5>
      </div>
    )
  }
}

export default BookShow;
