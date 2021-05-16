import React from 'react'
import { useState } from 'react'
import useOnMount from '../../../utility/hooks/useOnMount'

import paginateLeaderBoard from '../../leaderBoardsFunctions/paginateLeaderBoard'
import LeaderBoardsScoresRow from '../leaderBoardsScoresRow/leaderBoardsScoresRow'
import LeaderBoardsButtonsRow from '../leaderBoardsButtonsRow/leaderBoardsButtonsRow'

import flagIconIndex from '../../../assets/flag_icons/flagIconIndex'

import './leaderBoardsScoresContainer.css'

const LeaderBoardScoresContainer = (props) => {

  const [currentPage, setCurrentPage] = useState(0)
  const [leaderBoard, setLeaderboard] = useState([])

  const { scores, pageLimit } = props

  let distribScores

  useOnMount(() => {
    let pagniatedLeaderBoard = paginateLeaderBoard(pageLimit, scores)
    setLeaderboard(pagniatedLeaderBoard)
  }, [scores, pageLimit, leaderBoard, paginateLeaderBoard])

  const onChangePage = (value) => {
    let page = parseInt(currentPage)
    page += parseInt(value)
    if(page < 0) page = 0
    if(page > leaderBoard.length - 1) page = leaderBoard.length - 1
    setCurrentPage(page)
  }

  if(!!leaderBoard[currentPage]) {
    distribScores = leaderBoard[currentPage].map((score, index) => {
      return !!score ?
        <LeaderBoardsScoresRow
          countryFlag={ flagIconIndex[score.country] }
          history={ props.history }
          key={ score.uid }
          score={ score }
        />
      :
        <LeaderBoardsScoresRow countryFlag={ null } history={ null } key={ index } score={ null } />
    })
  }

  return (
    <div className="leader_board_scores_container">
      <div className="leader_board_scores_row_container">
        { distribScores }
      </div>
      <LeaderBoardsButtonsRow
        onChangePage={ onChangePage }
        currentPage={ currentPage }
        maxPages={ leaderBoard.length }
        tooltipClass={ 'leader_boards_nav_button_tooltip' }
      />
    </div>
  )
}

export default LeaderBoardScoresContainer