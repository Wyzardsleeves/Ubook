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

  goToEdit = () => {
    this.props.history.push(`/book/edit/${this.props.match.params.id}`);
  }

  destroyConfirm = () => {
    let c = window.confirm("Are you sure you want to delete this book?");
    if(c){
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

  render(){
    return(
      <div className="container">
        <h3>This is the Show page for a book</h3>
        <h5>{this.state.book.title}</h5>
        <h5>{this.state.book.description}</h5>
        <button className="btn orange lighten-2" onClick={this.goToEdit} style={{marginRight: "10px"}}>Update {this.state.book.title}</button>
        <button className="btn red lighten-2" onClick={this.destroyConfirm}>Delete {this.state.book.title}</button>
      </div>
    )
  }
}

export default BookShow;
