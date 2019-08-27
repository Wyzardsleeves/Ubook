import React from 'react';

const BookPublished = (props) => {
  console.log(props.publish_stat)
  return(
    <div className="pub-btns">
      {props.publish_stat == 1 &&
        <h6 className="publish-button green-text" onClick={props.publishedFunc}>Unlist</h6>
      }
      {props.publish_stat < 1 &&
        <h6 className="unlist-button green lighten-2 white-text" onClick={props.publishedFunc}>Publish</h6>
      }
    </div>
  )
}

export default BookPublished;
