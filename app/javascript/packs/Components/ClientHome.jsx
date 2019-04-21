//BaseComponent
import React, {Component} from 'react';
import Books from './Books'
import BookShow from './BookShow'

//router
import {Switch, Route} from 'react-router-dom'

class ClientHome extends Component{
  render(){
    return(
      //Switch funcion is here
      <Switch>
        <Route exact path="/" component={Books} />
        <Route path="/book/:id" component={BookShow} />
      </Switch>
    )
  }
}

export default ClientHome;
