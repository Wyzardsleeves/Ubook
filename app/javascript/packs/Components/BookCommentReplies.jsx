import React from 'react';

const BookCommentReplies = (props) => (
  <div className="reply-indent" >
    {props.children.map((reply) =>
      <div key={reply.id}>
        <li>
          <section className="card book-comment">
            <div className="card-content ">
              <p className="left"><i>Posted by {reply.user_id}</i> {reply.content}</p>
              <p className="right">Votes: {reply.votes}</p><br/>
              <input className="btn btn-small blue lighten-2" type="button" value="Reply" onClick={(e) => props.newReply(e, reply.id)} />
              <input className="btn btn-small red lighten-2" type="button" value="Delete" onClick={(e) => props.deleteButton(e, reply.id)} />
            </div>
          </section>
          <section className="card reply-button" id={`reply-input-show-${reply.id}`}>
            <div className="card-content ">
              <form id={`reply-input-show-${reply.id}-form`}>
                <input type="text" id={`reply-input-show-${reply.id}-val`} name={"replyInputField" + reply.id} />
                <input className="btn btn-small blue lighten-2" type="button" value="Post Reply" onClick={(e) => props.replyButton(e, reply.id)} />
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
          />
        }
      </div>
    )}
  </div>
)

export default BookCommentReplies;
