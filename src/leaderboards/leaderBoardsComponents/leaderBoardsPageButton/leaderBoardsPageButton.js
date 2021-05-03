import React from 'react'
import { useEffect, useState, useRef } from 'react'

import DefaultButtonTooltip from '../../../UI/tooltips/defaultButtonTooltip'

// import cookieFunctions from '../../../utility/cookieFunctions'

import './leaderBoardsPageButton.css'

const LeaderBoardsPageButton = (props) => {

  const [hoverState, setHoverState] = useState(false)
  const [tooltipState, setTooltipState] = useState(false)

  const { pageLimit } = props

  const timerRef = useRef(null);

  const switchHoverState = (bool) => { setHoverState(bool) }
  const switchTooltipState = (bool) => { setTooltipState(bool) }

  useEffect(() => {
    if(!pageLimit && hoverState) switchHoverState(false)
    if(!pageLimit && tooltipState) switchTooltipState(false)

    // return function cleanup(){
      // switchHoverState(false)
      // switchTooltipState(false)
      // if(timerRef.current) clearTimeout(timerRef.current);
    // }
  }, [pageLimit, hoverState, tooltipState])

  const onHover = () => {
    switchHoverState(true)
    timerRef.current = setTimeout(() => { switchTooltipState(true) }, 250);
  }

  const offHover = () => {
    switchHoverState(false)
    switchTooltipState(false)
    if(timerRef.current) clearTimeout(timerRef.current);
  }

  const onClickFunction = (event) => {
    // document.cookie = `${props.name}Clicked=true`
    // cookieFunctions('delete', `${props.name}Clicked`)
    if(props.pageLimit) props.onClickFunction(event.target.value || event.target.attributes.value.value)
    if(props.tooltipText && timerRef.current) clearTimeout(timerRef.current);
  }

  // let checkLeaderBoardNavButtonClicked = cookieFunctions('getCookieValue', `${props.name}Clicked`) !== 'true'

  return(
    <div className='leader_boards_buttons_row_button_container'
      onMouseEnter={ props.pageLimit ? onHover : null }
      onMouseLeave={ props.pageLimit ? offHover : null }
    >
      <button
        className={ props.buttonClass }
        id={ props.id }
        name={ props.name }
        onClick={ onClickFunction }
        value={ props.value }
      >
        <img
          alt={ props.alt }
          id={ props.id }
          name={ props.name }
          onClick={ onClickFunction }
          src={ hoverState ? props.imageHover : props.image }
          value={ props.value }
        />
      </button>
      {
        props.tooltipText &&
        hoverState &&
        tooltipState &&
          <DefaultButtonTooltip
            tooltipText={ props.tooltipText }
            tooltipClass={ props.tooltipClass }
          />
      }
    </div>
  )
}

export default LeaderBoardsPageButton