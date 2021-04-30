import React, { useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import DefaultMenu from '../menus/defaultMenu'
import DefaultButtonTooltip from '../tooltips/defaultButtonTooltip'

import './buttonStylesIndex.css'

const DefaultButton = (props) =>  {

  const [hoverState, setHoverState] = useState(false)
  const [tooltipState, setTooltipState] = useState(false)
  const [menuState, setMenuState] = useState(false)

  const location = useLocation()
  const timerRef = useRef(null);

  const switchHoverState = (bool) => { setHoverState(bool) }
  const switchTooltipState = (bool) => { setTooltipState(bool) }
  const switchMenuState = (bool) => { setMenuState(bool) }

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

    event.preventDefault()
    event.persist()
    if(props.enableButton){
      if(!!props.onSwitchMenu){
        props.offHover()
        props.onSwitchMenu()
      }
      if(props.buttonType === 'menu'){
        let switchMenu = !menuState
        switchMenuState(switchMenu)
      }
      if(props.buttonType === 'link'){
        document.body.scrollTop = 0
        if (location.pathname !== props.route) props.history.push( props.route )
      }
      if(!!props.onClickFunction){ props.onClickFunction(event) }
    }

    if(props.tooltipText && timerRef.current) clearTimeout(timerRef.current);

  }

  const onSwitchMenu = () => {
    let switchMenu = !menuState
    switchMenuState(switchMenu)
  }


  let buttonType
  let buttonClass
  let buttonContent =
    <>
      { !!props.text && <span params={ props.params }>{ props.text }</span> }
      { !!props.imageHover &&
        <img
          alt={ props.id }
          id={ `${props.id}_image` }
          name={ `${props.name}Image` }
          // params={ this.props.params }
          src={ hoverState || menuState || props.location === props.route ? props.imageHover : props.image }
        />
      }
    </>

  if(props.enableButton)
    if(hoverState || menuState) buttonClass = `${props.buttonClass}_active`
    else buttonClass = props.buttonClass
  else buttonClass = `${props.buttonClass}_disabled`

  if(props.buttonType === 'NavLink') {
    buttonType =
      <NavLink
        activeClassName={ `${props.buttonClass}_active` }
        className={ buttonClass }
        id={ props.id }
        name={ props.name }
        params={ props.params }
        to={ props.route }
        type={ props.type }
      >
        { buttonContent }
      </NavLink>
  } else if (props.buttonType === 'link') {
    let route = JSON.parse(props.params).route
    // console.log(location.pathname, )
    if (location.pathname !== route) {
      buttonType =
      <a
        // href={ this.props.auth.status !== 'authValid' ? this.props.route : undefined }
        href={ JSON.parse(props.params).route }
        // onClick={ onClickFunction }
        rel='noopener noreferrer'
      >
        <button
          className={ buttonClass }
          id={ props.id }
          name={ props.name }
          params={ props.params }
          type={ props.buttonType }
        >
          { buttonContent }
        </button>
      </a>
    } else {
      buttonType =
        <button
          className={ buttonClass }
          id={ props.id }
          name={ props.name }
          params={ props.params }
          type={ props.buttonType }
        >
          { buttonContent }
        </button>
    }


  // props.history.push( props.route )
    
    // let route = JSON.parse(this.props.params).route
    // console.log(route)
    // buttonType =
    // <a
    //   // href={ this.props.auth.status !== 'authValid' ? this.props.route : undefined }
    //   href={ JSON.parse(props.params).route }
    //   // onClick={ onClickFunction }
    //   rel='noopener noreferrer'
    // >
    //   <button
    //     className={ buttonClass }
    //     id={ props.id }
    //     name={ props.name }
    //     params={ props.params }
    //     type={ props.buttonType }
    //   >
    //     { buttonContent }
    //   </button>
    // </a>
  } else {
    buttonType =
      <button
        className={ buttonClass }
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
      className={ props.buttonContainerClass || 'default_button_container' }
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

export default DefaultButton

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


// this.props.enableButton
// this.props.buttonClass
// this.props.id
// this.props.name
// this.props.params
// this.props.onClickFunction
// this.props.type
// this.props.text
// this.props.image
// this.props.imageHover
// this.props.tooltipText
// this.props.tooltipClass
