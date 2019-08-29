import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import BookShow from './BookShow';
import SubNavBar from './SubNavBar';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import userIcon from './assets/images/template.png';

class Books extends Component{
  constructor(props){
    super(props);
    this.state = {
      recentBooks: [],
      likedBooks: [],
      popularBooks: [],
      searchText: '',
      searchResults: [],
      toggleSearch: 'b',
      searchType: '',
      keepDefault: 'Book'
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
    if(words && words.length > num){
      newWords = words.slice(0, num) + "...";
      return newWords;
    }else{
      return words;
    }
  }

  getSearchResult = () => {
    if(this.state.toggleSearch == "b"){
      axios.get(`/search?b=${this.refs.searchBookBar.value}`)
      .then((response) => this.setState({
        searchText: this.refs.searchBookBar.value,
        searchResults: response.data
      }))
      .catch((error) => console.log(error.message))
    }
    else if(this.state.toggleSearch == "u"){
      axios.get(`/search?u=${this.refs.searchUserBar.value}`)
      .then((response) => this.setState({
        searchText: this.refs.searchUserBar.value,
        searchResults: response.data
      }))
      .catch((error) => console.log(error.message))
    }
  }

  setSearchType = (change) => {
    if(change.value == "User"){
      this.setState({toggleSearch: "u", keepDefault: change.value, searchText: ''})
    }
    else if(change.value == "Book"){
      this.setState({toggleSearch: "b", keepDefault: change.value, searchText: ''})
    }
  }

  render(){
    //---------- Dropdown Stuff --------------
    const options = ["Book", "User"];
    const defaultOption = this.state.toggleSearch;
    //----------------------------------------
    return(
      <section className="books-comp">
        <div className="container">
          <section className="search-bar">
            <div className="search-type">
              <Dropdown
                options={options}
                onChange={this.setSearchType}
                value={this.state.keepDefault} />
            </div>
            <div className="search-field">
              {this.state.toggleSearch == "b" &&
                <form onChange={this.getSearchResult} action={`/search`}>
                    <input type="text" ref="searchBookBar" placeholder="Search by Title" />
                </form>
              }
              {this.state.toggleSearch == "u" &&
                <form onChange={this.getSearchResult} action={`/search`}>
                    <input type="text" ref="searchUserBar" placeholder="Search by Username" />
                </form>
              }
            </div>
          </section>
          <div className="search-result">
            {this.state.searchText && this.state.toggleSearch == "b" &&
              <div>
                <h3>Showing Book results for "{this.state.searchText}"</h3>
                <ul>
                  {this.state.searchResults.map((book) =>
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
            }
            {this.state.searchText && this.state.toggleSearch == "u" &&
              <div>
                <h3>Showing User results for "{this.state.searchText}"</h3>
                <ul>
                  {this.state.searchResults.map((user) =>
                    <li key={user.id} className="user-card">
                      <Link to={`/user/${user.id}/books/`}>
                        <div className="card-panel">
                          <div className="user-image">
                            <img src={userIcon} />
                          </div>
                          <div className="user-content">
                            <h5>{user.username}</h5>
                            <p>{user.bio}</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            }
            {this.state.searchResults.length < 1 && this.state.searchText &&
              <h5>No results to show......</h5>
            }
          </div>
          {!this.state.searchText &&
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
