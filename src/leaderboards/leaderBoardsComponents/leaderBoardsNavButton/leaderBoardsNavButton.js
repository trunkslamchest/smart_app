import React from 'react'

import './leaderBoardsNavButton.css'

const LeaderBoardsNavButton = (props) => {
  return(
    <button
      className={ props.buttonClass }
      hover_trigger={ props.hover_trigger }
      onClick={ props.onClickFunction }
      onMouseEnter={ props.onHoverFunction }
      onMouseLeave={ props.offHoverFunction }
      value={ props.value }
    >
      <img
        alt={ props.alt }
        id={ props.id }
        name={ props.name }
        onClick={ props.onClickFunction }
        src={ props.image }
        value={ props.value }
      />
    </button>
  )
}

export default LeaderBoardsNavButton