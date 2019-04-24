import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import BookShow from './BookShow';


class Books extends Component{
  constructor(props){
    super(props);
    this.state = {
      books: [],
      shoes: 'Nike',
      pets: 'Dogs'
    }
  }

  componentWillMount(){
    this.getBooks();
  }

  getBooks = () => {
    axios.get('/books/')
    .then((response) => this.setState({books: response.data}))
    .catch((error) => alert(error.message))
  }

  newBook = (value) => {
    axios.post('/books/', {
      title: "This is a title from react!",
      description: "This is a description from react!"
    })
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error.message))
    window.location.reload();
  }

  destroyBook = (id, e) => {
    console.log(id);
    axios.delete(`/books/${id}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error.message))
    window.location.reload();
  }

  render(){
    return(
      <section className="books-comp">
        <div className="container">
          <section>
            <div>
              <h3>Recently Added</h3>
              <button className="btn green lighten-1" onClick={this.newBook}>Post</button>
            </div>
            <div>
              <ul>
                {/* A .map function will go here for the recently added books */}
                {this.state.books.map((book) =>
                  <li key={book.id}>
                    <Link to={`/book/${book.id}`}>
                      <h5>{book.title}</h5>
                    </Link>
                    <p>{book.description}</p>
                    <button className="btn red lighten-2" onClick={(e) => this.destroyBook(book.id, e)}>Destroy</button>
                  </li>
                )}
              </ul>
            </div>
          </section>
        </div>
      </section>
    )
  }

}

export default Books;
