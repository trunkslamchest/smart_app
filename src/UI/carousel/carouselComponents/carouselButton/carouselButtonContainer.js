import React from 'react'

import MakeCarouselButtons from '../../carouselFunctions/makeCarouselButtons'

import './carouselButton.css'

const CarouselButtonContainer = (props) => {



  return(
    <div className='carousel_button_container'>
      <MakeCarouselButtons
        currentPosition={ props.currentPosition }
        buttonCount={ props.buttonCount }
        switchPosition={ props.switchPosition }
      />
    </div>
  )
}

export default CarouselButtonContainer