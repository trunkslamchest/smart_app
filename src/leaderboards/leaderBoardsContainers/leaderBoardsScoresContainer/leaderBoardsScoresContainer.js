import React from 'react'
import { useState } from 'react'
import useOnMount from '../../../utility/hooks/useOnMount'

import paginateLeaderBoard from '../../leaderBoardsFunctions/paginateLeaderBoard'
import LeaderBoardsScoresRowContainer from '../../leaderBoardsComponents/leaderBoardsScoresRow/leaderBoardsScoresRowContainer'
import LeaderBoardsButtonsRow from '../../leaderBoardsComponents/leaderBoardsButtonsRow/leaderBoardsButtonsRow'

import flagIconIndex from '../../../assets/flag_icons/flagIconIndex'

import './leaderBoardsScoresContainer.css'

const LeaderBoardScoresContainer = (props) => {

  const [currentPage, setCurrentPage] = useState(0)
  const [leaderBoard, setLeaderboard] = useState([])

  const { scores, pageRowLimit } = props

  let distribScores, top3scores = [ ]

  useOnMount(() => {
    let pagniatedLeaderBoard = paginateLeaderBoard(pageRowLimit, scores)
    setLeaderboard(pagniatedLeaderBoard)
  }, [scores, pageRowLimit, leaderBoard, paginateLeaderBoard])

  const onChangePage = (value) => {
    let page = parseInt(currentPage)
    page += parseInt(value)
    if(page < 0) page = 0
    if(page > leaderBoard.length - 1) page = leaderBoard.length - 1
    setCurrentPage(page)
  }

  if(!!leaderBoard[currentPage]) {
    distribScores = leaderBoard[currentPage].map((score, index) => {
      let scoreComponent = <LeaderBoardsScoresRowContainer
          blankTop3Card ={ currentPage === 0 && !score && index < 3 }
          currentPage={ currentPage }
          cardNumber={ index + 1 }
          countryFlag={ !!score && flagIconIndex[score.country] }
          fromScoresCard={ true }
          key={ score ? score.uid : index }
          nextScore={ !!leaderBoard[currentPage][index + 1] }
          prevScore={ !!leaderBoard[currentPage][index - 1] }
          score={ !!score && score }
          scoreCount={ leaderBoard.length }
          top3Card ={ currentPage === 0 && index < 3 }
        />

      if(currentPage === 0) {
        if(index < 3) {
          top3scores[index] = scoreComponent
          return null
        } else return scoreComponent
      } else return scoreComponent
    })
  }

  return (
    <div className="leader_board_scores_container">
      <div className="leader_board_scores_sub_container">
        { currentPage === 0 &&
          <div className='leader_boards_top3_container'>
            { top3scores }
          </div>
        }
        { distribScores }
      </div>
      <LeaderBoardsButtonsRow
        currentPage={ currentPage }
        maxPages={ leaderBoard.length }
        onChangePage={ onChangePage }
        tooltipClass={ 'leader_boards_nav_button_tooltip' }
      />
    </div>
  )
}

export default LeaderBoardScoresContainer