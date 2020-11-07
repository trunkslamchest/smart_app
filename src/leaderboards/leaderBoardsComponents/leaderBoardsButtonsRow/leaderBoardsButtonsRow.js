import React from 'react'

import leaderboardGlyphIndex from '../../../assets/glyphs/leaderboardGlyphIndex'

import './leaderBoardsButtonsRow.css'

class LeaderBoardsButtonsRow extends React.Component {

  state={ prevHover: false, nextHover: false }

  componentDidUpdate() {
    if(this.props.currentPage === 0 && this.state.prevHover) this.setState({ prevHover: false })
    if(this.props.currentPage === this.props.maxPages - 1 && this.state.nextHover) this.setState({ nextHover: false })
  }

  onPrevHover = () => { this.setState({ prevHover: true }) }
  offPrevHover = () => { this.setState({ prevHover: false }) }

  onNextHover = () => { this.setState({ nextHover: true }) }
  offNextHover = () => { this.setState({ nextHover: false }) }

  onClickPageFunctions = (event) => {
    let val = event.target.value || event.target.attributes.value.value
    if(this.props.currentPage >= 0 && this.props.currentPage <= this.props.maxPages) this.props.onChangePage(val) 
  }

  render() {

    console.log(this.state)

    let prevButton, nextButton

    if(this.props.currentPage === 0) {
      prevButton = leaderboardGlyphIndex.leaderboardPrevDisabled
    } else {
      if(this.state.prevHover) prevButton = leaderboardGlyphIndex.leaderboardPrevHover
      else prevButton = leaderboardGlyphIndex.leaderboardPrev
    }

    if(this.props.currentPage === this.props.maxPages - 1) {
      nextButton = leaderboardGlyphIndex.leaderboardNextDisabled
    } else {
      if(this.state.nextHover) nextButton = leaderboardGlyphIndex.leaderboardNextHover
      else nextButton = leaderboardGlyphIndex.leaderboardNext
    }

    return(
      <div className="leader_boards_buttons_row_container">
        <button
          className="leader_boards_buttons_row_button"
          disabled={ this.props.currentPage === 0 }
          onClick={ this.onClickPageFunctions }
          onMouseEnter={ this.onPrevHover }
          onMouseLeave={ this.offPrevHover }
          value={ -1 }
        >
          <img
            id='leaderboard_prev_button'
            alt='PreviousPageButton'
            name='leaderboardPrevButton'
            onClick={ this.onClickPageFunctions }
            src={ prevButton }
            value={ -1 }
          />
        </button>
        <button
          className="leader_boards_buttons_row_button"
          disabled={ this.props.currentPage === this.props.maxPages - 1 }
          onClick={ this.onClickPageFunctions }
          onMouseEnter={ this.onNextHover }
          onMouseLeave={ this.offNextHover }
          value={ 1 }
        >
          <img
            id='leaderboard_next_button'
            alt='NextPageButton'
            name='leaderboardNextButton'
            onClick={ this.onClickPageFunctions }
            src={ nextButton }
            value={ 1 }
          />
        </button>
      </div>
    )
  }
}

export default LeaderBoardsButtonsRow