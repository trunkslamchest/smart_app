import React from 'react'
import { useEffect, useRef, useState } from 'react'

import CarouselSlideContainer from './carouselComponents/carouselSlide/carouselSlideContainer'
import CarouselButtonContainer from './carouselComponents/carouselButton/carouselButtonContainer'

import './defaultCarouselContainer.css'

const DefaultCarouselContainer = (props) => {

  const [slideState, setSlideState] = useState("mount")
  const [currentSlide, setCurrentSlide] = useState(null)
  const [currentPosition, setCurrentPosition] = useState(0)

  const { slides } = props

  const startSliderTimerRef = useRef(null)
  const slideInTimerRef = useRef(null)
  const slideOutTimerRef = useRef(null)

  useEffect(() => {
    setCurrentSlide(slides[currentPosition])

    const slideOut = () => {
      setSlideState("dismount")
      clearInterval(slideOutTimerRef.current)
    }

    const slideTimer = () => {
      slideOutTimerRef.current = setInterval(slideOut, 9750)
      let nextPosition = currentPosition < slides.length ? currentPosition + 1 : 0

      setSlideState("mount")
      setCurrentSlide(slides[nextPosition])
      setCurrentPosition(nextPosition)
    }

    startSliderTimerRef.current =  setInterval(slideTimer, 10000)
    slideOutTimerRef.current = setInterval(slideOut, 9750)

    return function cleanup() {
      clearInterval(startSliderTimerRef.current)
      clearTimeout(slideInTimerRef.current)
      clearInterval(slideOutTimerRef.current)
    }
  }, [slides, currentPosition])

  const switchPosition = (position) => {
    clearInterval(startSliderTimerRef.current)
    clearInterval(slideOutTimerRef.current)

    let slideIn = (position) => {
      setSlideState("mount")
      setCurrentSlide(props.slides[position])
      setCurrentPosition(position)
      clearTimeout(slideInTimerRef.current)
    }

    slideInTimerRef.current = setTimeout(function(){ slideIn(position) }, 250)
    setSlideState("dismount")
  }

  return(
    <div className='default_carousel_container'>
      <CarouselSlideContainer
        currentSlideState={ slideState }
        currentSlide={ currentSlide }
      />
      <CarouselButtonContainer
        buttonCount={ props.slides.length }
        currentPosition={ currentPosition }
        switchPosition={ switchPosition }
      />
    </div>
  )
}

export default DefaultCarouselContainer