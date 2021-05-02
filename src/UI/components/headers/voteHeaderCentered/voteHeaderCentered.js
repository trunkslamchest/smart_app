import React from 'react'

import './voteHeaderCentered.css'

const VoteHeaderCentered = (props) => {

  return(
    <div className='vote_header_centered'>
      <div className='vote_header_centered_text'>
        <h1>{ !!props.header_text && props.header_text }</h1>
        { !!props.sub_text && <h2>{ props.sub_text }</h2> }
      </div>
    </div>
  )
}

export default VoteHeaderCentered