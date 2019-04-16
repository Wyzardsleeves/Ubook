import React, {Component} from 'react';

class Books extends Component{
  constructor(props){
    super(props);
    this.state = {
      shoes: 'Nike',
      pets: 'Dogs'
    }
  }

  componentWillMount(){

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
              </ul>
            </div>
          </section>
        </div>
      </section>
    )
  }

}

export default Books;
