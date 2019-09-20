import React from 'react';

const UserBooks = (props) => {
  return(
    <div>
      <div className="user-sub-head">
        <h4><i className="fas fa-book"></i>{props.user_data.username}'s Uploaded Books</h4>
      </div>
      <div>
        {props.user_books.length > 0 &&
          <ul>
            {props.user_books.map((book) =>
              <li key={book.id}>
                <h5>{book.title}</h5>
                <p>{book.description}</p>
              </li>
            )}
          </ul>
        }
        {props.user_books.length == 0 &&
          <h5><i>No books have been uploaded by {props.user_data.username} yet.....</i></h5>
        }
      </div>
    </div>
  )
}

export default UserBooks;
