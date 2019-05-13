import React, {Component} from 'react';

class BookRead extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentWillMount(){

  }

  render(){
    return(
      <div>
        <section className="control-buttons">
          <div className="left">
            <i className="fas fa-angle-left"></i>
          </div>
          <div className="right">
            <i className="fas fa-angle-right"></i>
          </div>
        </section>
        <div>
          <h2>
            -- Book Space Here --
          </h2>
        </div>
      </div>
    )
  }
}

export default BookRead;
