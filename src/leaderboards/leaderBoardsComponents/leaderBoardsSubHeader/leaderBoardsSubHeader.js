import React from 'react'

import menu_arrow_grey_down from '../../../assets/menu_arrows/menu_arrow_grey_down.png'
// import menu_arrow_white_down from '../../../assets/menu_arrows/menu_arrow_white_down.png'
import menu_arrow_grey_left from '../../../assets/menu_arrows/menu_arrow_grey_left.png'
import menu_arrow_white_left from '../../../assets/menu_arrows/menu_arrow_white_left.png'

import './leaderBoardsSubHeader.css'

const LeaderBoardsSubHeader = (props) => {

  // const arrow_white_down = <img alt='open' className='menu_arrow' src={ menu_arrow_white_down } />
  const arrow_grey_down = <img alt='open' className='header_button_menu_arrow' hover_trigger="headerButtonHover" src={ menu_arrow_grey_down } />
  const arrow_grey_left = <img alt='closed' className='header_button_menu_arrow' hover_trigger="headerButtonHover" src={ menu_arrow_grey_left } />
  const arrow_white_left = <img alt='closed' className='header_button_menu_arrow' hover_trigger="headerButtonHover" src={ menu_arrow_white_left } />

  let header_menu_arrow = arrow_white_left

  if(props.headerButtonHover ) header_menu_arrow = arrow_grey_left
  if(props.showScores) header_menu_arrow = arrow_grey_down

  return(
    <div
      className={ props.showScores ? "leader_boards_sub_header_active" : "leader_boards_sub_header"}
      hover_trigger="headerButtonHover"
    >
      <h3>{ props.scoresSetName }</h3>
      <div className={ props.showScores ? "leader_boards_sub_header_right_active" : "leader_boards_sub_header_right"}>
        <h4>{ props.sub_text }</h4>
        { header_menu_arrow }
      </div>
    </div>
  )
}

export default LeaderBoardsSubHeader