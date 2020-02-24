import React from 'react';
import {Link} from 'react-router-dom';
import { Document, Page } from 'react-pdf/dist/entry.webpack';

const UserLikedBooks = (props) => {
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
        <h4><i className="fas fa-thumbs-up"></i>{props.user_data.username}'s Liked Books</h4>
      </div>
      <div>
        {props.user_liked_books.length > 0 &&
          <ul>
            {props.user_liked_books.map((like) =>
              <li key={like.id} className="book">
                <div className="card-panel grey lighten-4">
                  <Link to={`/book/${like.id}`}>
                    <div className="book-thumb">
                      <Document className="title-img" file={like.attachment} >
                        <Page pageNumber={1} renderTextLayer={false} width={170} renderAnnotationLayer={false} />
                      </Document>
                    </div>
                    <h5 title={like.title}>{cropLength(like.title, 15)}</h5>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div className="sub-part left"><i className="fas fa-comment"></i><p>{like.commentCount}</p></div>
                          </td>
                          <td>
                            <div className="sub-part right"><i className="fas fa-thumbs-up"></i><p>{like.likeCount}</p></div>
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
        {props.user_liked_books.length == 0 &&
          <h5><i>{props.user_data.username} hasn't liked any books yet.....</i></h5>
        }
      </div>
    </div>
  )
}

export default UserLikedBooks;
