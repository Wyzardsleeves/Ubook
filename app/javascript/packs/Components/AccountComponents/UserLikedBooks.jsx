import React from 'react';

const UserLikedBooks = (props) => {
  let days_ago = (like_time) => {
    d = new Date(milliseconds);
    d - like_time
  }
  return(
    <div>
      <div className="user-sub-head">
        <h4><i className="fas fa-thumbs-up"></i>{props.user_data.username}'s Liked Books</h4>
      </div>
      <div>
        {props.user_liked_books.length > 0 &&
          <ul>
            {props.user_liked_books.map((like) =>
              <li key={like.id}>
                <h5>{like.title}</h5>
                <p>{like.description}</p>
              </li>
            )}
          </ul>
        }
        {props.user_liked_books.length == 0 &&
          <h5><i>{props.user_data.username} hasn't liked any books yet.....</i></h5>
        }
      </div>
    </div>
  )
}

export default UserLikedBooks;
