import React from 'react';
import {NavLink} from 'react-router-dom';

const BookCommentReplies = (props) => (
  <div className="reply-indent" >
    {props.children.map((reply) =>
      <div key={reply.id}>
        <li>
          <section className="card book-comment">
            <div className="card-content ">
              <div className="edit-input-content" id={`content-show-${reply.id}-val`}>
                <p className="left"><i>Posted by <NavLink to={`/user/${reply.user_id}/books`}>{reply.creator}</NavLink></i>{reply.content}</p>
                <p className="right" id={`content-show-${reply.id}-val`}>{reply.created_at != reply.updated_at && <i>Edited</i>}</p><br/>
                <input className="btn btn-small blue lighten-2" type="button" value="Reply" onClick={(e) => props.newReply(e, reply.id)} style={{marginRight: "8px"}} />
                <input className="btn btn-small orange lighten-2" type="button" value="Edit" onClick={(e) => props.newEdit(e, reply)} style={{marginRight: "8px"}} />
                <input className="btn btn-small red lighten-2" type="button" value="Delete" onClick={(e) => props.deleteButton(e, reply.id)} />
              </div>
              <div className='edit-input-togg' id={`edit-input-togg-${reply.id}`} >
                <form onSubmit={(e) => props.editComment(e, reply.id)}>
                  <input type="text" id={`edit-input-show-${reply.id}-val`} defaultValue={`${reply.content}`}/>
                  <input className="btn btn-small blue lighten-2" type="button" value="Submit" style={{marginRight: "8px"}} onClick={(e) => props.editComment(e, reply.id)} />
                  <input className="btn btn-small red lighten-2" type="button" value="Cancel" onClick={(e) => props.cancelEdit(e, reply)} />
                </form>
              </div>
            </div>
          </section>
          <section className="card reply-button" id={`reply-input-show-${reply.id}`}>
            <div className="card-content ">
              <form id={`reply-input-show-${reply.id}-form`} onSubmit={(e) => props.replyButton(e, reply.id)} >
                <input type="text" id={`reply-input-show-${reply.id}-val`} name={"replyInputField" + reply.id} defaultValue={`@${reply.creator} `} />
                <input className="btn btn-small blue lighten-2" type="button" value="Post Reply" onClick={(e) => props.replyButton(e, reply.id)} style={{marginRight: "8px"}} />
                <input className="btn btn-small red lighten-2" type="button" value="Cancel" onClick={(e) => props.cancelReply(e, reply.id)} />
              </form>
            </div>
          </section>
        </li>
        {reply.children &&
          <BookCommentReplies
            children={reply.children}
            replyButton={props.replyButton}
            deleteButton={props.deleteButton}
            newReply={props.newReply}
            cancelReply={props.cancelReply}
            //new props
            newEdit={props.newEdit}
            cancelEdit={props.cancelEdit}
            editComment={props.editComment}
          />
        }
      </div>
    )}
  </div>
)

export default BookCommentReplies;
