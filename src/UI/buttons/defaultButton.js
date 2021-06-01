import React from 'react'
import { useEffect, useRef, useState } from 'react'

import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import DefaultMenu from '../menus/defaultMenu'
import DefaultButtonTooltip from '../tooltips/defaultButtonTooltip'

import './buttonStylesIndex.css'

const DefaultButton = (props) =>  {

  const history = useHistory()

  const [hoverState, setHoverState] = useState(false)
  const [tooltipState, setTooltipState] = useState(false)
  const [menuState, setMenuState] = useState(false)

  const componentClasses = {
    buttonContainerClass: props.buttonContainerClass || 'default_button_container',
    buttonActiveClass: `${props.buttonClass}_active`,
    buttonClass: props.enableButton ? hoverState || menuState ? `${props.buttonClass} ${props.buttonClass}_active` : props.buttonClass : `${props.buttonClass} ${props.buttonClass}_disabled`,
  }

  const timerRef = useRef(null);

  useEffect(() => { return () => { clearTimeout(timerRef.current) } }, [])

  const onHover = () => {
    setHoverState(true)
    if(props.tooltipText) timerRef.current = setTimeout(() => { setTooltipState(true) }, 250)
  }

  const offHover = () => {
    setHoverState(false)
    setTooltipState(false)
    if(timerRef.current) clearTimeout(timerRef.current)
  }

  const onClickFunction = (event) => {
    event.preventDefault()
    event.persist()
    if(props.enableButton){
      if(!!props.onSwitchMenu){
        props.offHover()
        props.onSwitchMenu()
      }
      if(props.buttonType === 'menu'){
        let switchMenuState = !menuState
        setMenuState(switchMenuState)
      }
      if(props.buttonType === 'link'){
        let route = JSON.parse(props.params).route
        document.body.scrollTop = 0
        if (history.location.pathname !== route) history.push( route )
      }
      if(!!props.onClickFunction){ props.onClickFunction(event) }
    }

    if(props.tooltipText && timerRef.current) clearTimeout(timerRef.current);
  }

  const onSwitchMenu = () => {
    let switchMenuState = !menuState
    setMenuState(switchMenuState)
  }

  let buttonType
  let buttonIMG = props.image
  let buttonText = <span params={ props.params }>{ props.text }</span>

  if( (hoverState || menuState) || (props.location === props.route && (!props.homeButton || !props.headerButton))){
    buttonIMG = props.imageHover
  }

  if(props.homeButton || props.headerButton) {
    if(hoverState) buttonIMG = props.imageHover
    else buttonIMG = props.image
  }

  let buttonContent =
    <>
      { !!props.text && buttonText }
      { !!props.imageHover &&
        <img
          alt={ props.id }
          id={ `${props.id}_image` }
          name={ `${props.name}Image` }
          params={ props.params }
          src={ buttonIMG }
        />
      }
    </>

  if(props.buttonType === 'NavLink') {
    buttonType =
      <NavLink
        activeClassName={ componentClasses.buttonActiveClass }
        className={ componentClasses.buttonClass }
        id={ props.id }
        name={ props.name }
        onClick={ onClickFunction }
        params={ props.params }
        exact to={ props.route }
        type={ props.type }
      >
        { buttonContent }
      </NavLink>
  } else {
    buttonType =
      <button
        className={ componentClasses.buttonClass }
        id={ props.id }
        name={ props.name }
        params={ props.params }
        onClick={ onClickFunction }
        type={ props.type }
      >
        { buttonContent }
      </button>
  }

  return(
    <div
      className={ componentClasses.buttonContainerClass }
      onMouseEnter={ onHover }
      onMouseLeave={ offHover }
    >
      { buttonType }
      {
        props.enableButton &&
        props.tooltipText &&
        hoverState &&
        !menuState &&
        tooltipState &&
          <DefaultButtonTooltip
            tooltipText={ props.tooltipText }
            tooltipClass={ props.tooltipClass }
          />
      }
      { menuState &&
        <DefaultMenu
          menuButtons={ props.menuButtons }
          menuClass={ 'header_menu' }
          offHover={ offHover }
          onSwitchMenu={ onSwitchMenu }
        />
      }
    </div>
  )
}

export default React.memo(DefaultButton)

// export default React.memo(DefaultButton)

// <DefaultButton
//   enableButton={  }
//   buttonClass={  }
//   id={  }
//   image={  }
//   imageHover={  }
//   name={  }
//   onClickFunction={  }
//   params={  }
//   text={  }
//   tooltipText={  }
//   tooltipClass={  }
//   type={  }
// />
