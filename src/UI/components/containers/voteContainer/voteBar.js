import React from 'react'
import { useEffect, useState } from 'react'

import './voteBar.css'

const VoteBar = (props) => {

  const [voteBarWidth, setVoteBarWidth] = useState(0)

  const { voteTotalPercent } = props

  const startAnimation = (callback) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        callback();
      });
    });
  }

  useEffect(() => {
    startAnimation(() => {
      setVoteBarWidth(voteTotalPercent)
    });
  }, [voteTotalPercent])

  return(
    <div className='vote_bar_container'>
      <div
        className='vote_bar'
        style={{
          width: `${voteBarWidth}%`,
          transition: 'width 1s ease-in-out 0s'
        }}
      />
      <span>{ props.voteTotalPercent }%</span>
    </div>
  )
}

export default VoteBar