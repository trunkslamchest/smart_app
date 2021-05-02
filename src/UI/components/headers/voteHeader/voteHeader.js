import React from 'react'

import './voteHeader.css'

const VoteHeader = (props) => {

  return(
    <div className='vote_header_container'>
      <div className='vote_header_wrapper'>
        <div className='vote_header_left'>
          <h1>{ !!props.header_text && props.header_text }</h1>
        </div>
          { !!props.sub_text &&
            <div className='vote_header_right'>
              <h2>{ props.sub_text }</h2>
            </div>
          }
      </div>
    </div>
  )
}

export default VoteHeader