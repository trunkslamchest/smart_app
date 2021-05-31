import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../utility/paths'

import './leaderBoardsScoresRow.css'

const LeaderBoardsScoresRow = (props) => {

  const history = useHistory()

  const componentClasses = {
    buttonContainer: !props.prevScore ? 'leader_boards_scores_row leader_boards_scores_row_top' : !props.nextScore ? 'leader_boards_scores_row leader_boards_scores_row_bottom' : 'leader_boards_scores_row',
    rowLeft: 'leader_boards_scores_row_left',
    rowRight: 'leader_boards_scores_row_right',
    rowImgFlag: 'leader_boards_scores_row_img_flag',
    rowImgAvatar: 'leader_boards_scores_row_img_avatar',
    rowSpan: props.fromCountry ? "leader_boards_scores_row_country_span" : "leader_boards_scores_row_span",
    rowBlank: 'leader_boards_scores_row_blank',
    subRowBlank: 'leader_boards_scores_row_sub_blank',
    subRowBlankSpan: 'leader_boards_scores_row_sub_blank_span',
  }

  const onClickRowFunctions = () => { history.push(routes.user_profile + '/' + props.score.user_name) }

  let scoresRowBlock =
    <div className={ componentClasses.rowBlank }>
      <div className={ componentClasses.subRowBlank }>
        <span className={ componentClasses.subRowBlankSpan }>|</span>
      </div>
    </div>

  if(props.score) {
    scoresRowBlock =
      <button
        className={ componentClasses.buttonContainer }
        onClick={ onClickRowFunctions }
      >
        <div className={ componentClasses.rowLeft }>
          <span>{ props.score.rank }</span>
          <span>
            <img
              alt={ props.score.fromScoresCard === 'null' ? 'No Country': props.score.country }
              className={ componentClasses.rowImgFlag }
              src={ props.countryFlag.image }
              title={ props.score.fromScoresCard === 'null' ? 'No Country': props.score.country }
            />
            <img
              alt={ `${props.score.user_name}'s Avatar` }
              className={ componentClasses.rowImgAvatar }
              src={ props.score.avatar }
              title={ `${props.score.user_name}'s Avatar`}
            />
          </span>
          <span>
            { props.score.user_name }
          </span>
        </div>
        <div className={ componentClasses.rowRight }>
          <span className={ componentClasses.rowSpan }>
            { (props.score.rating * 10).toFixed(2) }
          </span>
        </div>
      </button>
  }

  return scoresRowBlock
}

export default LeaderBoardsScoresRow