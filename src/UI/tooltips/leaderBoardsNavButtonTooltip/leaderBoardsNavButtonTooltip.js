import React from 'react'

import '../tooltipStyles/leaderBoardsNavButtonTooltip.css'

const LeaderBoardsNavButtonTooltip = (props) => {
  return(
    <div className='leader_boards_nav_button_tooltip_container' >
      <div
        className='leader_boards_nav_button_tooltip_wrapper'
        onMouseEnter={ props.offHover }
      >
        <div className='leader_boards_nav_button_tooltop_arrow'></div>
        <span>{ props.tooltipText }</span>
      </div>
    </div>
  )
}

export default LeaderBoardsNavButtonTooltip