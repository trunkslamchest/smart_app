import React from 'react'
import { useEffect, useRef } from 'react'

import DefaultButtonsContainer from '../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './menuStyles/defaultMenu.css'
import './menuStyles/headerMenu.css'

const DefaultMenu = (props) => {

  const { onSwitchMenu } = props

  const menuRef = useRef(null)

  useEffect(() => {
    const onMouseClick = (event) => { if(menuRef.current && !menuRef.current.contains(event.target)) onSwitchMenu() }
    document.addEventListener('click', onMouseClick)
    return () => { document.removeEventListener('click', onMouseClick) }
  }, [onSwitchMenu])

    return(
      <div
        className={ `${props.menuClass}_container` || "menu_container" }
        ref={ menuRef }
      >
        <div className={ `${props.menuClass}_wrapper` || "menu_wrapper" } >
          <DefaultButtonsContainer
            buttons={ props.menuButtons }
            containerClass={ 'header_menu_buttons_container' }
            enableButton={ true }
            offHover={ props.offHover }
            onSwitchMenu={ props.onSwitchMenu }
          />
        </div>
      </div>
    )
}

export default (DefaultMenu)