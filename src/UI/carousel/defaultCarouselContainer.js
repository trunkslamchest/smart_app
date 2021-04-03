import React from 'react'

import CarouselSlideContainer from './carouselComponents/carouselSlide/carouselSlideContainer'
import CarouselButtonContainer from './carouselComponents/carouselButton/carouselButtonContainer'

import './defaultCarouselContainer.css'

class DefaultCarouselContainer extends React.Component {

  state = {
    currentSlideState: "mount",
    currentSlide: null,
    currentPosition: 0
  }

  componentDidMount(){
    this.setState({ currentSlide: this.props.slides[0] })
    this.startSlideTimer = setInterval(this.slideTimer, 10000)
    this.slideOutTimer = setInterval(this.slideOut, 9750)
  }

  switchPosition = (position) => {
    clearInterval(this.startSlideTimer)
    clearInterval(this.slideOutTimer)

    let slideIn = (position) => {
      this.setState({
        currentSlideState: "mount",
        currentSlide: this.props.slides[position],
        currentPosition: position
      })
      clearTimeout(this.slideInTimeout)
    }

    this.slideInTimeout = setTimeout(function(){ slideIn(position) }, 250)
    this.setState({ currentSlideState: "dismount" })
  }

  slideOut = () => {
    this.setState({ currentSlideState: "dismount" })
    clearInterval(this.slideOutTimer)
  }

  slideTimer = () => {
    this.slideOutTimer = setInterval(this.slideOut, 9750)
    let nextPosition = this.state.currentPosition + 1

    if(nextPosition >= this.props.slides.length) { nextPosition = 0 }

    this.setState({
      currentSlideState: "mount",
      currentSlide: this.props.slides[nextPosition],
      currentPosition: nextPosition
    })
  }

  render(){
    return(
      <div className='default_carousel_container'>
        <CarouselSlideContainer
          currentSlideState={ this.state.currentSlideState }
          currentSlide={ this.state.currentSlide }
        />
        <CarouselButtonContainer
          buttonCount={ this.props.slides.length }
          currentPosition={ this.state.currentPosition }
          switchPosition ={ this.switchPosition }
        />
      </div>
    )
  }
}

export default DefaultCarouselContainer