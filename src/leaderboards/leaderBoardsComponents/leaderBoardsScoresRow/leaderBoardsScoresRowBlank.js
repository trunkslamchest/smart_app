import React from 'react'

import './leaderBoardsScoresRowBlank.css'

const LeaderBoardsScoresRowBlank = () => {

  const componentClasses = {
    rowBlank: 'leader_boards_scores_row_container_blank',
    subRowBlank: 'leader_boards_scores_row_sub_container_blank'
  }

  return (
    <div className={ componentClasses.rowBlank }>
      <div className={ componentClasses.subRowBlank }>
        <span>|</span>
      </div>
    </div>
  )
}

export default LeaderBoardsScoresRowBlank