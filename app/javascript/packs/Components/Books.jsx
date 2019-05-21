import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import BookShow from './BookShow';
import SubNavBar from './SubNavBar';
import { Document, Page } from 'react-pdf/dist/entry.webpack';


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

  cropLength = (words, num) => {
    let newWords = '';
    if(words.length > num){
      newWords = words.slice(0, num) + "...";
      return newWords;
    }else{
      return words;
    }
  }

  render(){
    return(
      <section className="books-comp">
        <div className="container">
          <section>
            <div>
              <h3>Recently Uploaded</h3>
            </div>
            <div>
              <ul>
                {/* A .map function will go here for the recently added books */}
                {this.state.books.map((book) =>
                  <li key={book.id} className="book">
                    <div className="card-panel grey lighten-4">
                      <Link to={`/book/${book.id}`}>
                        <div className="book-thumb">
                          <Document className="title-img" file={book.attachment} onLoadSuccess={this.onDocumentLoadSuccess}>
                            <Page pageNumber={1} renderTextLayer={false} width={170} />
                          </Document>
                        </div>
                          <h5 title={book.title}>{this.cropLength(book.title, 15)}</h5>
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="sub-part left"><i className="fas fa-comment"></i><p>{book.commentCount}</p></div>
                                </td>
                                <td>
                                  <div className="sub-part right"><i className="fas fa-eye"></i><p>{"Num"}</p></div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                      </Link>
                    </div>
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
