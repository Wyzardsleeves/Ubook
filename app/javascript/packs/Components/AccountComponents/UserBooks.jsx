import React from 'react';
import {Link} from 'react-router-dom';
import { Document, Page } from 'react-pdf/dist/entry.webpack';

const UserBooks = (props) => {
  const cropLength = (words, num) => {
    let newWords = '';
    if(words && words.length > num){
      newWords = words.slice(0, num) + "...";
      return newWords;
    }else{
      return words;
    }
  }

  return(
    <div>
      <div className="user-sub-head">
        <h4><i className="fas fa-book"></i>{props.user_data.username}'s Uploaded Books</h4>
      </div>
      <div>
        {props.user_books.length > 0 &&
          <ul>
            {props.user_books.map((book) =>
              <li key={book.id} className="book">
                <div className="card-panel grey lighten-4">
                  <Link to={`/book/${book.id}`}>
                    <div className="book-thumb">
                      <Document className="title-img" file={book.attachment} >
                        <Page pageNumber={1} renderTextLayer={false} width={170} renderAnnotationLayer={false} />
                      </Document>
                    </div>
                    <h5 title={book.title}>{cropLength(book.title, 15)}</h5>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div className="sub-part left"><i className="fas fa-comment"></i><p>{book.commentCount}</p></div>
                          </td>
                          <td>
                            <div className="sub-part right"><i className="fas fa-thumbs-up"></i><p>{book.likeCount}</p></div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Link>
                </div>
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
