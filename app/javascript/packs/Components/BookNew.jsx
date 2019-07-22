import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import BookShow from './BookShow';

class BookNew extends Component{
  constructor(props){
    super(props);
    this.state = {
      documentFile: null
    }
  }

  componentWillMount(){
    //Code might go here later
  }

  goToHome = () => {
    this.props.history.push('/');
  }

  newBook = () => {
    const formData = new FormData();
    formData.append('book[title]', this.refs.title.value);
    formData.append('book[description]', this.refs.description.value);
    formData.append('book[document]', this.state.documentFile);

    axios.post('/books/', formData)
    .then((response) => console.log(response.data.document))
    .catch((error) => console.log(error.message))
    this.props.history.push('/');
    location.reload();
  }

  handleFile = (e) => {
    this.setState({documentFile: e.currentTarget.files[0]});
  }

  render(){
    return(
      <section className="new-book-comp">
        <div className="container">
          <section>
            <div>
              <h3><i className="far fa-file"></i>New Book</h3>
            </div>
            <div>
              <form id="new-book-form" onSubmit={this.newBook}>
                <p><i>PDF's only (must be less than 1mb)</i></p>
                <input type="file" onChange={this.handleFile}/>
                <input type="text" ref="title" placeholder="New Book Title" /><br/>
                <input type="text" ref="description" placeholder="New Book Description" /><br/>
                <input style={{marginRight: "10px"}} className="btn" type="submit" />
                <button onClick={this.goToHome} className="btn red lighten-2">Cancel</button>
              </form>
            </div>
          </section>
        </div>
      </section>
    )
  }

}

export default BookNew;
