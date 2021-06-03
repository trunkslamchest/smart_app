import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../utility/paths'

import LeaderBoardsScoresRow from './leaderBoardsScoresRow'
import LeaderBoardsScoresRowBlank from './leaderBoardsScoresRowBlank'
import LeaderBoardsScoresRowTop3Card from './leaderBoardsScoresRowTop3Card'

import calcRowContainerClass from '../../leaderBoardsFunctions/calcRowContainerClass'

import './leaderBoardsScoresRowContainer.css'

const LeaderBoardsScoresRowContainer = (props) => {

  const history = useHistory()

  const onClickRowFunctions = () => { props.score.user_name && history.push(routes.user_profile + '/' + props.score.user_name) }

  let scoresRowBlock = <></>
  let buttonContent = <></>

  // if(props.currentPage === 0 && props.scoreCount > 3) scoresRowBlock = <LeaderBoardsScoresRowBlank />
  if(props.currentPage > 0) scoresRowBlock = <LeaderBoardsScoresRowBlank />

  if(props.score || props.top3Card) {
      buttonContent =
        <LeaderBoardsScoresRow
          avatar={ props.score.avatar }
          country={ props.score.country }
          countryFlag={ props.countryFlag }
          fromScoreCard={ props.score.fromScoresCard }
          rank={ props.score.rank }
          rating={ props.score.rating }
          userName={ props.score.user_name }
        />

      if(props.top3Card || props.blankTop3Card) {
        buttonContent =
          <LeaderBoardsScoresRowTop3Card
            avatar={ props.score.avatar }
            blankTop3Card={ props.blankTop3Card }
            cardNumber={ props.cardNumber }
            country={ props.score.country }
            countryFlag={ props.countryFlag }
            fromScoreCard={ props.score.fromScoresCard }
            rank={ props.score.rank }
            rating={ props.score.rating }
            userName={ props.score.user_name }
          />
      }

    scoresRowBlock =
      <button
        className={ calcRowContainerClass(props.prevScore, props.nextScore, props.cardNumber, props.currentPage, !!props.score) }
        onClick={ onClickRowFunctions }
      >
        { buttonContent }
      </button>
  }

  return scoresRowBlock
}

export default LeaderBoardsScoresRowContainer