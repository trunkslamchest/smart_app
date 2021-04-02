import React from 'react'

import CarouselSlideContainer from './carouselComponents/carouselSlide/carouselSlideContainer'
import CarouselButtonContainer from './carouselComponents/carouselButton/carouselButtonContainer'

import './defaultCarouselContainer.css'

class DefaultCarouselContainer extends React.Component {

  state = {
    currentSlide: null,
    currentPosition: 0
  }

  componentDidMount(){
    this.setState({ currentSlide: this.props.slides[0] })
    this.startTimer = setInterval(this.timerFunctions, 10000)
  }

  switchPosition = (position) => {
    clearInterval(this.timerInterval)
    this.setState({
      currentSlide: this.props.slides[position],
      currentPosition: position
    })
  }

  timerFunctions = () => {
    let nextPosition = this.state.currentPosition + 1

    if(nextPosition >= this.props.slides.length) { nextPosition = 0 }

    this.setState({
      currentSlide: this.props.slides[nextPosition],
      currentPosition: nextPosition
    })
  }

  render(){

    console.log(this.state.currentPosition)

    return(
      <div className='default_carousel_container'>
        <CarouselSlideContainer
          currentPosition={ this.state.currentPosition }
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