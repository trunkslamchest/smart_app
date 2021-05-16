import React from 'react'

import LeaderBoardsPageButton from '../leaderBoardsPageButton/leaderBoardsPageButton'

import leaderboardGlyphIndex from '../../../assets/glyphs/leaderboardGlyphIndex'

import './leaderBoardsButtonsRow.css'

const LeaderBoardsButtonsRow = (props) => {

  let leaderBoardPageButtons = [
    {
      alt: 'PreviousPageButton',
      id: 'leaderboard_prev_button',
      image: leaderboardGlyphIndex.leaderboardPrev,
      imageHover: leaderboardGlyphIndex.leaderboardPrevHover,
      name: 'leaderboardPrevButton',
      pageLimit: props.currentPage !== 0,
      tooltipText: [ 'Previous Page' ],
      value: -1
    },
    {
      alt: 'NextPageButton',
      id: 'leaderboard_next_button',
      image: leaderboardGlyphIndex.leaderboardNext,
      imageHover: leaderboardGlyphIndex.leaderboardNextHover,
      name: 'leaderboardNextButton',
      pageLimit: props.currentPage !== props.maxPages - 1,
      tooltipText: [ 'Next Page' ],
      value: 1
    }
  ]

  const calcButtonClass = (buttons, pageLimit, index) => {
    if(pageLimit){
      if(index === 0) {
        return 'leader_boards_buttons_row_button_left'
      } else if ( index === buttons - 1) {
        return 'leader_boards_buttons_row_button_right'
      } else {
        return 'leader_boards_buttons_row_button_middle'
      }
    } else {
      return 'leader_boards_buttons_row_button_disabled'
    }
  }

  const distribLeaderBoardPageButtons = leaderBoardPageButtons.map((button, index) => {
    return(
      <LeaderBoardsPageButton
        alt={ button.alt }
        buttonClass={ calcButtonClass(leaderBoardPageButtons.length, button.pageLimit, index) }
        id={ button.id }
        image={ button.image }
        imageHover={ button.imageHover }
        key={ index + button.id }
        name={ button.name }
        onClickFunction={ button.pageLimit ? props.onChangePage : null }
        pageLimit={ button.pageLimit }
        tooltipText={ button.tooltipText }
        value={ button.value }
        tooltipClass={ props.tooltipClass }
      />
    )
  })

  return(
    <div className="leader_boards_buttons_row_container">
      { distribLeaderBoardPageButtons }
    </div>
  )
}

export default LeaderBoardsButtonsRow