import React from 'react';
import {Route} from 'react-router-dom';
import UserBooks from './UserBooks';
import UserComments from './UserComments';

const User = ({match}) => {
  return(
    <div className="container">
      <div>
        <h3>User Details</h3>
      </div>
      <div>
        <Route path={match.url + "/:id/books"} component={UserBooks} />
        <Route path={match.url + "/:id/comments"} component={UserComments} />
      </div>
    </div>
  )
}

export default User;

/*

*/
