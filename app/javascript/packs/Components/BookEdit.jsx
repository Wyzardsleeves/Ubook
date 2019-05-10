import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import BookShow from './BookShow';


class BookEdit extends Component{
  constructor(props){
    super(props);
    this.state = {
      editTitle: '',
      editDescription: ''
    }
  }

  componentWillMount(){
    //Code might go here later
    console.log(this.props.match.params.id);
    this.getBook();
  }

  goToEdit = () => {
    this.props.history.push(`/book/${this.props.match.params.id}`);
  }

  getBook = () => {
    axios.get(`/books/${this.props.match.params.id}`)
    .then((response) => {this.setState({editTitle: response.data.title, editDescription: response.data.description})})
    .catch((error) => {console.log(error.message)})
  }

  editBook = () => {
    axios.put(`/books/${this.props.match.params.id}`,{
      title: this.refs.editTitle.value,
      description: this.refs.editDescription.value
    })
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error.message))
    this.props.history.push(`/book/${this.props.match.params.id}`)
    //window.location.reload();
  }


  render(){
    return(
      <section className="edit-book-comp">
        <div className="container">
          <section>
            <div>
              <h3><i className="fas fa-edit"></i>Edit Book</h3>
            </div>
            <div>
              <form id="new-book-form" onSubmit={this.editBook}>
                <input defaultValue={this.state.editTitle} type="text" ref="editTitle" placeholder="Edit Book Title" /><br/>
                <input defaultValue={this.state.editDescription} type="text" ref="editDescription" placeholder="Edit Book Description"/><br/>
                <input style={{marginRight: "10px"}} className="btn" type="submit" />
                <button className="btn red lighten-2" onClick={this.goToEdit}>Cancel</button>
              </form>
            </div>
          </section>
        </div>
      </section>
    )
  }

}

export default BookEdit;
