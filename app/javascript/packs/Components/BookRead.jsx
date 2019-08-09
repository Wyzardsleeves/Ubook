import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import Select from 'react-select';

class BookRead extends Component{
  constructor(props){
    super(props);
    this.state = {
      book: {},
      numPages: null,
      pageNumber: 1,
      widthIndex: null,
      pageSet: 1,
    }
  }

  componentWillMount(){
    this.getBook();
  }

  componentDidMount(){
    let containWidth = this.refs.bookContain.clientWidth;
    this.setState({widthIndex: containWidth});
  }

  onDocumentLoadSuccess = ({numPages}) => {
    this.setState({numPages});
  }

  getBook = () => {
    axios.get(`/books/${this.props.match.params.id}`)
    .then((response) => {this.setState({book: response.data.bookInfo})})
    .catch((error) => {console.log(error.message)})
  }

  getPrevPage = () => {
    let num = this.state.pageNumber;
    if(num > 1){
      this.setState({pageNumber: this.state.pageNumber - 1});
    }else{
      alert("Already at first page!");
    }
  }

  getFirstPage = () => {
    this.setState({pageNumber: 1});
    window.scrollTo(0, 0);
  }

  getNextPage = () => {
    let num = this.state.pageNumber;
    let last = this.state.numPages;
    if(num < last){
      this.setState({pageNumber: this.state.pageNumber + 1});
    }else{
      alert("Already at last page");
    }
  }

  getLastPage = () => {
    this.setState({pageNumber: this.state.numPages});
    window.scrollTo(0, 0);
  }

  handleNumChange = (e) => {
    this.setState({pageNumber: event.target.value});
  }

  setCurrentPage = () => {
    let eleValue = document.getElementsByClassName('input-field')[0];
    eleValue.value = this.state.pageNumber;
  }

  setValue = (e) => {
    let index = Number(event.target.value);
    let numPages = this.state.numPages;
    if(index > this.state.numPages){
      let eleValue = document.getElementsByClassName('input-field')[0];
      eleValue.value = numPages;
      this.setState({pageNumber: numPages});
      alert("Inserted number is too high!");
    }
    else if(index){
      this.setState({pageNumber: index});
    }
  }

  render(){
    const {pageNumber, numPages} = this.state;

    return(
      <div>
        <section className="control-buttons">
          <table>
            <tbody>
              <tr>
                <td width="15%">
                  <div className="controls-left">
                    <i onClick={this.getPrevPage} className="fas fa-angle-left"></i>
                  </div>
                </td>
                <td width="50%">
                  <div className="controls-center">
                    <i onClick={this.getFirstPage} className="fas fa-angle-double-left"></i>
                    <NavLink to={`/book/${this.props.match.params.id}/`}>
                      <i className="fas fa-book"></i>
                    </NavLink>
                    <NavLink to={'/'}>
                      <i className="fas fa-home"></i>
                    </NavLink>
                    <div className="page-change-form">
                      <h5>Go To Page: </h5>
                      <form onChange={this.setValue} >
                        <input
                          defaultValue={this.state.pageNumber}
                          className="input-field"
                          type="number"
                          min="1"
                          max={numPages}
                        />
                      </form>
                      <h5> of {numPages}</h5>
                    </div>
                    <i onClick={this.getLastPage} className="fas fa-angle-double-right"></i>
                  </div>
                </td>
                <td width="15%">
                  <div className="controls-right right">
                    <i onClick={this.getNextPage} className="fas fa-angle-right"></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section ref="bookContain">
          <Document
            file={this.state.book.attachment}
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber}
              renderMode="svg"
              width={this.state.widthIndex}
            />
          </Document>
        </section>
        <section className="control-buttons">
          <table>
            <tbody>
              <tr>
                <td>
                  <div className="controls-left">
                    <i onClick={this.getPrevPage} className="fas fa-angle-left"></i>
                  </div>
                </td>
                <td>
                  <div className="controls-center">
                    <i onClick={this.getFirstPage} className="fas fa-angle-double-left"></i>
                    <NavLink to={'/'}>
                      <i className="fas fa-home"></i>
                    </NavLink>
                    <NavLink to={`/book/${this.props.match.params.id}/`}>
                      <i className="fas fa-book"></i>
                    </NavLink>
                    <div className="page-change-bot">
                      <h5>Page {pageNumber} of {numPages}</h5>
                    </div>
                    <i onClick={this.getLastPage} className="fas fa-angle-double-right"></i>
                  </div>
                </td>
                <td>
                  <div className="controls-right right">
                    <i onClick={this.getNextPage} className="fas fa-angle-right"></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    )
  }
}

export default BookRead;
