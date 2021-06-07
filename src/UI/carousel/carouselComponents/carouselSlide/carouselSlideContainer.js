import React from 'react'

import './carouselSlide.css'

const CarouselSlideContainer = (props) => {

  const calcSlideClass = (currentSlideState) => {
    if (currentSlideState === 'mount') return 'default_carousel_slide_container mount_default_carousel_slide_container'
    if (currentSlideState === 'mounted') return 'default_carousel_slide_container'
    if (currentSlideState === 'dismount') return 'default_carousel_slide_container dismount_default_carousel_slide_container'
    if (currentSlideState === 'switchSlide') return 'default_carousel_slide_container switch_slide_default_carousel_slide_container'
  }

  return(
    props.currentSlide &&
    <div className={ calcSlideClass(props.currentSlideState) }>
      <div className='default_carousel_slide_img_container'>
        <img
          alt={ props.currentSlide.name }
          id={ props.currentSlide.id }
          name={ props.currentSlide.name }
          src={ props.currentSlide.image }
        />
      </div>
      <div className='default_carousel_slide_desc_container'>
        <div className='default_carousel_slide_desc_wrapper'>
          <div className='default_carousel_slide_desc_headline_container'>
            <h2><span>SmartApp<span>™</span></span> { props.currentSlide.text.headline }</h2>
          </div>
          <div className='default_carousel_slide_desc_text_container'>
              { props.currentSlide.text.desc.map((text, d_index) => {
                return(
                  <p key={ d_index }>
                    { text }
                  </p>
                )
              }) }
            { props.currentSlide.text.highlights &&
              <div className='default_carousel_slide_desc_highlights_container'>
                { props.currentSlide.text.highlights.map((highlight, h_index) => {
                  return(
                    <p key={ h_index }>
                      { highlight }
                    </p>
                  )
                }) }
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarouselSlideContainer