import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import BookShow from './BookShow';
import Dropdown from 'react-dropdown';



class BookEdit extends Component{
  constructor(props){
    super(props);
    this.state = {
      editTitle: '',
      editDescription: '',
      editCategory: '',
      editRating: ''
    }
  }

  componentWillMount(){
    this.getBook();
  }

  goToEdit = () => {
    this.props.history.push(`/book/${this.props.match.params.id}`);
  }

  getBook = () => {
    axios.get(`/books/${this.props.match.params.id}`)
    .then((response) => {
      this.setState({
        editTitle: response.data.bookInfo.title,
        editDescription: response.data.bookInfo.description,
        editCategory: response.data.bookInfo.category,
        editRating: response.data.bookInfo.rating
      })
    })
    .catch((error) => {console.log(error.message)})
  }

  editBook = () => {
    axios.put(`/books/${this.props.match.params.id}`,{
      title: this.refs.editTitle.value,
      description: this.refs.editDescription.value,
      category: this.state.editCategory,
      rating: this.state.editRating
    })
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error.message))
    this.props.history.push(`/book/${this.props.match.params.id}`)
    //window.location.reload();
  }

  setCategory = (e) => {
    this.setState({editCategory: e.value})
  }

  setRating = (e) => {
    this.setState({editRating: e.value})
  }


  render(){
    const category_options = ["Eduction", "Children", "Romance", "Nonfiction", "Teen and Young Adult", "Biography/Memior", "Mystery/Thriller", "Science Fiction", "Fantasy", "Comics and Graphic Novels", "Manga", "Parenting and Relationships", "History", "Cook Books", "Manuals"];
    const rating_options = ["Everyone", "Teen", "Mature", "Adults Only"];
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
                {/* here */}
                <section className="book-sub-data">
                  <div className="book-rating">
                    <p>Rating: </p>
                    <Dropdown
                      options={rating_options}
                      onChange={this.setRating}
                      value={this.state.editRating} />
                  </div>
                  <div className="book-category">
                    <p>Category: </p>
                    <Dropdown
                      options={category_options}
                      onChange={this.setCategory}
                      value={this.state.editCategory} />
                  </div>
                </section>
                {/* end */}
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
