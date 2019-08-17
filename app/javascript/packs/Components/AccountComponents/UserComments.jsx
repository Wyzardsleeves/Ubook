import React, {Component} from 'react';

const UserComments = (props) => {
  return(
    <div>
      <div>
        <h4>User's Posted Comments</h4>
      </div>
      <div>
        <ul>
          {props.user_comments.map((comment) =>
            <li key={comment.id}>
              <h5>{comment.content}</h5>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default UserComments;
