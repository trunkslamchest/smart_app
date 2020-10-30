import React from 'react'

import flagIconIndex from '../../../assets/flag_icons/flagIconIndex'

import LeaderBoardsScoresRow from '../leaderBoardsScoresRow/leaderBoardsScoresRow'
import LeaderBoardsButtonsRow from '../leaderBoardsButtonsRow/leaderBoardsButtonsRow'

import './leaderBoardsScoresContainer.css'

const LeaderBoardScoresContainer = (props) => {

  const distribScores = props.scores.map(score => {
    return(
      <LeaderBoardsScoresRow
        countryFlag={ flagIconIndex[score.country] }
        history={ props.history }
        key={ score.uid }
        rank={ props.scores.indexOf(score) + 1 }
        score={ score }
      />
    )
  })

  return (
    <div className="leader_board_scores_container">
      <div className="leader_board_scores_row_container">
        { distribScores }
      </div>
      <LeaderBoardsButtonsRow />
    </div>
  )
}

export default LeaderBoardScoresContainer