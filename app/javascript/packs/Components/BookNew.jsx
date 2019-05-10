import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import BookShow from './BookShow';
import ActiveStorageProvider from 'react-activestorage-provider'

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
    axios.post('/books/', {
      title: this.refs.title.value,
      description: this.refs.description.value
    })
    .then((response) => console.log(response.data.document))
    .catch((error) => console.log(error.message))
    this.props.history.push('/');
    location.reload();
  }

  handleFile = (e) => {
    this.setState({documentFile: e.currentTarget.files[0]});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('book[title]', this.refs.title.value);
    formData.append('book[description]', this.refs.description.value);
    formData.append('book[document]', this.state.documentFile);
    $.ajax({
      url: '/books',
      method: 'POST',
      data: formData,
      contentType: false,
      processData: false
    })
    .then((response) => console.log(response.message))
    .then((response) => console.log(response.responseJSON))
  }

  render(){
    return(
      <section className="new-book-comp">
        <div className="container">
          {/*-------------- Begin Active Storage Provider ----------- }
          <ActiveStorageProvider
            endpoint={{
              path: '/books',
              model: 'Book',
              attribute: 'document',
              method: 'POST',
            }}
            onSubmit={(book) => this.setState({ document: book.document })}
            render={
              ({ handleUpload, uploads, ready }) => (
              <div>
                <input
                  type="file"
                  disabled={!ready}
                  onChange={e => handleUpload(e.currentTarget.files)}
                />

                {uploads.map(upload => {
                  switch (upload.state) {
                    case 'waiting':
                      return <p key={upload.id}>Waiting to upload {upload.file.name}</p>
                    case 'uploading':
                      return (
                        <p key={upload.id}>
                          Uploading {upload.file.name}: {upload.progress}%
                        </p>
                      )
                    case 'error':
                      return (
                        <p key={upload.id}>
                          Error uploading {upload.file.name}: {upload.error}
                        </p>
                      )
                    case 'finished':
                      return (
                        <p key={upload.id}>Finished uploading {upload.file.name}</p>
                      )
                  }
                })}
              </div>
            )}
          />
        { --------------- end ---------------- */}
          <section>
            <div>
              <h3><i className="far fa-file"></i>New Book</h3>
            </div>
            <div>
              <form id="new-book-form" onSubmit={this.handleSubmit}>
                <input type="file" onChange={this.handleFile}/>
                <input type="text" ref="title" placeholder="New Book Title" /><br/>
                <input type="text" ref="description" placeholder="New Book Description"/><br/>
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
