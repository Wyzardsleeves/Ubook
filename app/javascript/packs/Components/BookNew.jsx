import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import BookShow from './BookShow';


class BookNew extends Component{
  constructor(props){
    super(props);
    this.state = {

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
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error.message))
    this.props.history.push('/');
    location.reload();
  }

  render(){
    return(
      <section className="new-book-comp">
        <div className="container">
          <section>
            <div>
              <h3>New Book</h3>
            </div>
            <div>
              <form id="new-book-form" onSubmit={this.newBook}>
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
