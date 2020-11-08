import React from 'react'

import LeaderBoardsNavButton from '../leaderBoardsNavButton/leaderBoardsNavButton'

import leaderboardGlyphIndex from '../../../assets/glyphs/leaderboardGlyphIndex'

import './leaderBoardsButtonsRow.css'

const LeaderBoardsButtonsRow = (props) => {

  let leaderBoardNavButtons = [
    {
      alt: 'PreviousPageButton',
      id: 'leaderboard_prev_button',
      image: leaderboardGlyphIndex.leaderboardPrev,
      imageHover: leaderboardGlyphIndex.leaderboardPrevHover,
      name: 'leaderboardPrevButton',
      pageLimit: props.currentPage !== 0,
      tooltipText: 'Previous Page',
      value: -1
    },
    {
      alt: 'NextPageButton',
      id: 'leaderboard_next_button',
      image: leaderboardGlyphIndex.leaderboardNext,
      imageHover: leaderboardGlyphIndex.leaderboardNextHover,
      name: 'leaderboardNextButton',
      pageLimit: props.currentPage !== props.maxPages - 1,
      tooltipText: 'Next Page',
      value: 1
    }
  ]

  const distribLeaderBoardNavButtons = leaderBoardNavButtons.map((button, index) => {
    return(
      <LeaderBoardsNavButton
        alt={ button.alt }
        buttonClass={ button.pageLimit ? 'leader_boards_buttons_row_button' : 'leader_boards_buttons_row_button_disabled' }
        id={ button.id }
        image={ button.image }
        imageHover={ button.imageHover }
        key={ index + button.id }
        name={ button.name }
        onClickFunction={ button.pageLimit ? props.onChangePage : null }
        pageLimit={ button.pageLimit }
        tooltipText={ button.tooltipText }
        value={ button.value }
      />
    )
  })

  return(
    <div className="leader_boards_buttons_row_container">
      { distribLeaderBoardNavButtons }
    </div>
  )
}

export default LeaderBoardsButtonsRow