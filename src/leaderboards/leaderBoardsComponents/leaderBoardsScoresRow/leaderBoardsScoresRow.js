import React from 'react'
import { routes } from '../../../utility/paths'

import './leaderBoardsScoresRow.css'

const LeaderBoardsScoresRow = (props) => {

  const onClickRowFunctions = () => { props.history.push(routes.user_profile + '/' + props.score.user_name) }

  let scoresRowBlock

  if(props.score) {
    scoresRowBlock =
    <button
      className='leader_boards_scores_row'
      onClick={ onClickRowFunctions }
    >
      <div className='leader_boards_scores_row_left'>
        <span>{ props.score.rank }</span>
        <span>
          <img
            alt={ props.score.fromScoresCard === 'null' ? 'No Country': props.score.country }
            className='leader_boards_scores_row_img_flag'
            src={ props.countryFlag.image }
            title={ props.score.fromScoresCard === 'null' ? 'No Country': props.score.country }
          />
          <img
            alt={ `${props.score.user_name}'s Avatar` }
            className='leader_boards_scores_row_img_avatar'
            src={ props.score.avatar }
            title={ `${props.score.user_name}'s Avatar`}
          />
        </span>
        <span>
          { props.score.user_name }
        </span>

      </div>
      <div className='leader_boards_scores_row_right'>
        <span className={ props.fromCountry ? "leader_boards_scores_row_country_span" : "leader_boards_scores_row_span" }>
          { (props.score.rating * 10).toFixed(2) }
        </span>
      </div>
    </button>
  } else {
    scoresRowBlock =
    <div className='leader_boards_scores_row_blank'>
      <div className='leader_boards_scores_row_sub_blank'>
        <span className='leader_boards_scores_row_sub_blank_span'>|</span>
      </div>
    </div>
  }

  return(<>{ scoresRowBlock }</>)
}

export default LeaderBoardsScoresRow