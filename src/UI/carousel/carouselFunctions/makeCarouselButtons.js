import React from 'react'

const makeCarouselButtons = (props) => {

  let buttons = []

  const onClickFunctions = (event) => {
    let currentPosition = parseInt(event.target.attributes.position.value)
    if( currentPosition !== props.currentPosition){ props.switchPosition(parseInt(currentPosition)) }
  }

  for(let i = 0; i < props.buttonCount; i++){
    buttons.push(
      <button
        className={ props.currentPosition === i ? 'carousel_button_selected' : 'carousel_button_unselected' }
        id={ `button_${i}` }
        key={ i }
        name={ `button${ i }` }
        onClick={ onClickFunctions }
        position={ i }
      >
        { i }
      </button>
    )

  }

  return buttons
}

export default makeCarouselButtons