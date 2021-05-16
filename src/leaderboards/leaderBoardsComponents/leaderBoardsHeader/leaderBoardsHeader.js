import React from 'react'

import './leaderBoardsHeader.css'

const LeaderBoardsHeader = (props) => {
  return (
    <div className="leader_boards_header">
      <h3>{ props.header_text }</h3>
      <h4>{ props.sub_text }</h4>
    </div>
  )
}

export default LeaderBoardsHeader