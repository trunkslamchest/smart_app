import React from 'react'

const DisplayComments = (props) => {
  return(
    <ul>
      <li>
        <h5>{props.comment.user}</h5>
        <p>{props.comment.comment}</p>
      </li>
    </ul>
  )
}

export default DisplayComments