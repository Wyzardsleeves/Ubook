import React, {Component} from 'react';
import axios from 'axios';

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

  render(){
    return(
      <section className="books-comp">
        <div className="container">
          <section>
            <div>
              <h3>Recently Added</h3>
            </div>
            <div>
              <ul>
                {/* A .map function will go here for the recently added books */}
                {this.state.books.map((book) =>
                  <li key={book.id}>
                    <h5>{book.title}</h5>
                    <p>{book.description}</p>
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
