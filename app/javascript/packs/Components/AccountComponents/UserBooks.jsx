import React, {Component} from 'react';
import axios from 'axios';

const UserBooks = (props) => {
  return(
    <div>
      <div>
        <h4>User's Uploaded Books</h4>
      </div>
      <div>
        {props.user_books.length > 0 &&
          <ul>
            {props.user_books.map((book) =>
              <li key={book.id}>
                <h5>{book.title}</h5>
              </li>
            )}
          </ul>
        }
        {props.user_books.length == 0 &&
          <h5><i>No books have been uploaded by this user yet.....</i></h5>
        }
      </div>
    </div>
  )
}

export default UserBooks;
