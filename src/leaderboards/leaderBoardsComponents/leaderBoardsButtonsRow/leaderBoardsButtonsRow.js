import React from 'react'

import './leaderBoardsButtonsRow.css'

const LeaderBoardsButtonsRow = (props) => {

  const onClickPageFunctions = (event) => { if(props.currentPage >= 0 && props.currentPage <= props.maxPages) props.onChangePage(event.target.value) }

  return(
    <div className="leader_boards_buttons_row_container">
      <button
        className="leader_boards_buttons_row_button"
        disabled={ props.currentPage === 0 }
        onClick={ onClickPageFunctions }
        value={ -1 }
      >
        Previous Page
      </button>
      <button
        className="leader_boards_buttons_row_button"
        disabled={ props.currentPage === props.maxPages - 1 }
        onClick={ onClickPageFunctions }
        value={ 1 }
      >
        Next Page
      </button>
    </div>
  )
}

export default LeaderBoardsButtonsRow