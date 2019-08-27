import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import BookShow from './BookShow';
import SubNavBar from './SubNavBar';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class Books extends Component{
  constructor(props){
    super(props);
    this.state = {
      recentBooks: [],
      likedBooks: [],
      popularBooks: [],
      searchBook: '',
      searchResults: [],
      toggleSearch: 'b',
      searchType: ''
    }
  }

  componentWillMount(){
    this.getBooks();
    this.checkForNotifications();
  }

  checkForNotifications = () => {
    console.log("This is a hypothetical notification!");
  }


  getBooks = () => {
    axios.get('/books/')
    .then((response) => this.setState({
      popularBooks: response.data.mostPopular,
      recentBooks: response.data.recentBooks,
      likedBooks: response.data.likedByUser,
    }))
    .catch((error) => alert(error.message))
  }

  destroyBook = (id, e) => {
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

  searchBook = () => {
    axios.get(`/search?b=${this.refs.searchBook.value}`)
    .then((response) => this.setState({
      searchBook: this.refs.searchBook.value,
      searchResults: response.data
    }))
    .catch((error) => alert(error.message))
  }

  changeSearchType = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  }

  setSearchType = (change) => {
    if(change.value == "User"){
      this.setState({toggleSearch: "u"})
    }
    else if(change.value == "Book"){
      this.setState({toggleSearch: "b"})
    }
  }

  render(){

    //---------- Dropdown Stuff --------------
    const options = ["Book", "User"]
    const defaultOption = options[0]

    //----------------------------------------

    return(
      <section className="books-comp">
        <div className="container">
          <section className="search-bar">
            <div className="search-type">
              <Dropdown
                options={options}
                onChange={this.setSearchType}
                value={defaultOption} />
            </div>
            <div className="search-field">
              {this.state.toggleSearch == "b" &&
                <form onChange={this.searchBook} action={`/search`}>
                    <input type="text" ref="searchBook" placeholder="Search by Title" />
                </form>
              }
              {this.state.toggleSearch == "u" &&
                <form onChange={this.searchBook} action={`/search`}>
                    <input type="text" ref="searchBook" placeholder="Search by Username" />
                </form>
              }
            </div>
            {this.state.searchBook &&
              <div>
                <h3>Showing results for "{this.state.searchBook}"</h3>
                <ul>
                  {this.state.searchResults.map((book) =>
                    <li key={book.id}>
                      <h5>{book.title}</h5>
                      <p>{book.description}</p>
                    </li>
                  )}
                </ul>
              </div>
            }
            {this.state.searchResults.length < 1 && this.state.searchBook &&
              <h5>No results to show......</h5>
            }
          </section>
          {!this.state.searchBook &&
            <div>
            <section>
              <div>
                <h3>Most Popular</h3>
              </div>
              <div>
                <ul>
                  {this.state.popularBooks.map((book) =>
                    <li key={book.id} className="book">
                      <div className="card-panel grey lighten-4">
                        <Link to={`/book/${book.id}`}>
                          <div className="book-thumb">
                            <Document className="title-img" file={book.attachment} onLoadSuccess={this.onDocumentLoadSuccess}>
                              <Page pageNumber={1} renderTextLayer={false} width={170} renderAnnotationLayer={false} />
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
                                    <div className="sub-part right"><i className="fas fa-thumbs-up"></i><p>{book.likeCount}</p></div>
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
            <section>
              <div>
                <h3>Recently Uploaded</h3>
              </div>
              <div>
                <ul>
                  {this.state.recentBooks.map((book) =>
                    <li key={book.id} className="book">
                      <div className="card-panel grey lighten-4">
                        <Link to={`/book/${book.id}`}>
                          <div className="book-thumb">
                            <Document className="title-img" file={book.attachment} onLoadSuccess={this.onDocumentLoadSuccess}>
                              <Page pageNumber={1} renderTextLayer={false} width={170} renderAnnotationLayer={false} />
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
                                    <div className="sub-part right"><i className="fas fa-thumbs-up"></i><p>{book.likeCount}</p></div>
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
            <section>
              <div>
                <h3>Books that you Liked</h3>
              </div>
              <div>
                <ul>
                  {this.state.likedBooks.map((book) =>
                    <li key={book.id} className="book">
                      <div className="card-panel grey lighten-4">
                        <Link to={`/book/${book.id}`}>
                          <div className="book-thumb">
                            <Document className="title-img" file={book.attachment} onLoadSuccess={this.onDocumentLoadSuccess}>
                              <Page pageNumber={1} renderTextLayer={false} width={170} renderAnnotationLayer={false} />
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
                                    <div className="sub-part right"><i className="fas fa-thumbs-up"></i><p>{book.likeCount}</p></div>
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
          }
        </div>
      </section>
    )
  }

}

export default Books;
