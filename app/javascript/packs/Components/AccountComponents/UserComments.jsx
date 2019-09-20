import React from 'react';

const UserComments = (props) => {
  return(
    <div>
      <div className="user-sub-head">
        <h4><i className="fas fa-comments"></i>{props.user_data.username}'s Posted Comments</h4>
      </div>
      <div>
        <ul>
          {props.user_comments.map((comment) =>
            <li key={comment.id}>
              <h6>{comment.content}</h6>
            </li>
          )}
          {props.user_comments.length == 0 &&
            <h5><i>{props.user_data.username} does not have any comments.....</i></h5>
          }
        </ul>
      </div>
    </div>
  )
}

export default UserComments;
