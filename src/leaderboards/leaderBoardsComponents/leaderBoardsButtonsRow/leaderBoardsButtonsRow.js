import React from 'react'

import './leaderBoardsButtonsRow.css'

const LeaderBoardsButtonsRow = (props) => {


  return(
    <div className="leader_boards_buttons_row_container">
      <button
        className="leader_boards_buttons_row_button"
      >
        Previous Page
      </button>
      <button
        className="leader_boards_buttons_row_button"
      >
        Next Page
      </button>
    </div>
  )
}

export default LeaderBoardsButtonsRow