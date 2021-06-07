import React from 'react'
import { useEffect, useRef, useState } from 'react'

import CarouselSlideContainer from './carouselComponents/carouselSlide/carouselSlideContainer'
import CarouselButtonContainer from './carouselComponents/carouselButton/carouselButtonContainer'

import './defaultCarouselContainer.css'
import './defaultCarouselContainerResponse.css'

const DefaultCarouselContainer = (props) => {

  const [currentPosition, setCurrentPosition] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(null)
  const [slideState, setSlideState] = useState("mount")
  const [stopTimer, setStopTimer] = useState(false)

  const { slides } = props

  const startSliderTimerRef = useRef(null)
  const slideInTimerRef = useRef(null)
  const slideDisplayTimerRef = useRef(null)
  const slideOutTimerRef = useRef(null)
  const switchSlideTimerRef = useRef(null)
  const manualSwitchSlideTimerRef = useRef(null)

  useEffect(() => {

    if(!stopTimer) {
      setCurrentSlide(slides[currentPosition])
      startSliderTimerRef.current = setTimeout(function(){ slideIn() }, 100)

      const slideIn = () => {
        setSlideState("mount")
        slideDisplayTimerRef.current = setTimeout( function(){ slideDisplay() }, 500)
      }

      const slideDisplay = () => {
        setSlideState("mounted")
        slideOutTimerRef.current = setTimeout(function(){ slideOut()}, 10000)
      }

      const slideOut = () => {
        setSlideState("dismount")
        switchSlideTimerRef.current = setTimeout(function(){ switchSlide() }, 250)
      }

      const switchSlide = () => {
        setSlideState("switchSlide")
        let nextPosition = currentPosition < slides.length - 1 ? currentPosition + 1 : 0
        setCurrentSlide(slides[nextPosition])
        setCurrentPosition(nextPosition)
        slideInTimerRef.current = setTimeout(function(){ slideIn() }, 100)
      }
    }

    return function cleanup() {
      clearTimeout(startSliderTimerRef.current)
      clearTimeout(slideInTimerRef.current)
      clearTimeout(slideDisplayTimerRef.current)
      clearTimeout(slideOutTimerRef.current)
      clearTimeout(switchSlideTimerRef.current)
    }
  }, [stopTimer, slides, currentPosition])

  const switchPosition = (position) => {

    setStopTimer(true)
    clearTimeout(startSliderTimerRef.current)
    clearTimeout(slideInTimerRef.current)
    clearTimeout(slideDisplayTimerRef.current)
    clearTimeout(slideOutTimerRef.current)
    clearTimeout(switchSlideTimerRef.current)

    let slideIn = (position) => {
      setSlideState("mount")
      setCurrentSlide(props.slides[position])
      setCurrentPosition(position)
    }

    manualSwitchSlideTimerRef.current = setTimeout(function(){ slideIn(position) }, 250)
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

export default React.memo(DefaultCarouselContainer)