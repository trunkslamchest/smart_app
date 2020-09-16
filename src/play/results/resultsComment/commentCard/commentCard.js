import React from 'react'

import './commentCard.css'

const commentCard = (props) => {
  return(
    <ul>
      <li>
        <h5>{props.comment.user}</h5>
        <p>{props.comment.comment}</p>
      </li>
    </ul>
  )
}

export default commentCard