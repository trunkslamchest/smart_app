import React from 'react'

import './leaderBoardsScoresRow.css'

const LeaderBoardsScoresRow = (props) => {

  const componentClasses = {
    rowLeft: 'leader_boards_scores_row_container_left',
    rowImgFlag: 'leader_boards_scores_row_container_img_flag',
    rowImgAvatar: 'leader_boards_scores_row_container_left_img_avatar',
    rowRight: 'leader_boards_scores_row_container_right',
    rowSpan: "leader_boards_scores_row_container_span",
  }

  return(
    <>
      <div className={ componentClasses.rowLeft }>
        <span>{ props.rank }</span>
        <span>
          <img
            alt={ props.fromScoresCard === 'null' ? 'No Country': props.country }
            className={ componentClasses.rowImgFlag }
            src={ props.countryFlag.image }
            title={ props.fromScoresCard === 'null' ? 'No Country': props.country }
          />
          <img
            alt={ `${props.userName}'s Avatar` }
            className={ componentClasses.rowImgAvatar }
            src={ props.avatar }
            title={ `${props.userName}'s Avatar`}
          />
        </span>
        <span>{ props.userName }</span>
      </div>
      <div className={ componentClasses.rowRight }>
        <span className={ componentClasses.rowSpan }>{ (props.rating * 10).toFixed(2) }</span>
      </div>
    </>
  )
}

export default LeaderBoardsScoresRow