//BaseComponent
import React, {Component} from 'react';
import Books from './Books';
import BookShow from './BookShow';
import BookEdit from './BookEdit';
import BookNew from './BookNew';
import SubNavBar from './SubNavBar';
import BookRead from './BookRead';
import User from './AccountComponents/User';
import axios from 'axios';

//router
import {Switch, Route} from 'react-router-dom'


class ClientHome extends Component{
  constructor(props){
    super(props);
    this.state = {
      current_user: {}
    }
  }

  componentWillMount(){
    this.getCurrentUser();
  }

  getCurrentUser = () => {
    axios.get('/accounts/')
    .then((response) => this.setState({current_user: response.data.current_user}))
    .catch((error) => console.log(error.message))
  }

  render(){
    return(
      <div>
        <SubNavBar />
        <Switch>
          <Route exact strict path="/" component={Books} />
          <Route path="/book/new/" component={BookNew} exact strict />
          <Route path="/book/edit/:id" component={BookEdit} exact strict />
          <Route path="/read/:id/" component={BookRead} exact />
          <Route path="/book/:id/" component={BookShow} exact />
          <Route path="/user/" component={User} />
        </Switch>
      </div>
    )
  }
}

export default ClientHome;
