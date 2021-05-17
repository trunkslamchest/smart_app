import React from 'react'

import calcButtonClass from '../../leaderBoardsFunctions/calcButtonClass'
import makeLeaderBoardsPageButtons from '../../leaderBoardsFunctions/makeLeaderBoardsPageButtons'
import LeaderBoardsPageButton from '../leaderBoardsPageButton/leaderBoardsPageButton'

import leaderboardGlyphIndex from '../../../assets/glyphs/leaderboardGlyphIndex'

import './leaderBoardsButtonsRow.css'

const LeaderBoardsButtonsRow = (props) => {

  let leaderBoardPageButtons = makeLeaderBoardsPageButtons(leaderboardGlyphIndex, props.currentPage, props.maxPages)

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