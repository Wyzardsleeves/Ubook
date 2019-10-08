import React from 'react';
import {Link} from 'react-router-dom';

const UserComments = (props) => {
  return(
    <div>
      <div className="user-sub-head">
        <h4><i className="fas fa-comments"></i>{props.user_data.username}'s Posted Comments</h4>
      </div>
      <div className="user-comments">
        <ul>
          {props.user_comments.map((comment) =>
            <li key={comment.id}>
              <section>
                <div className="card-panel">
                  <div>
                    <h6>
                      <i>Commented on </i>
                      <Link to={`/book/${comment.book_data.id}`}>
                        <strong>{comment.book_data.title}</strong>
                      </Link>
                    </h6>
                    <i>at {comment.book_data.created_at}</i>
                  </div>
                  <div className="user-comment-content">
                    <i className="fas fa-quote-left"></i>
                    <h6>{comment.content}</h6>
                    <i className="fas fa-quote-right"></i>
                  </div>
                  <div>
                    {/* Foot stuff for the comment here */}
                  </div>
                </div>
              </section>
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
