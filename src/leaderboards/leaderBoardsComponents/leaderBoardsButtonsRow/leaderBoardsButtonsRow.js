import React from 'react'

import LeaderBoardsNavButton from '../leaderBoardsNavButton/leaderBoardsNavButton'

import leaderboardGlyphIndex from '../../../assets/glyphs/leaderboardGlyphIndex'

import './leaderBoardsButtonsRow.css'

class LeaderBoardsButtonsRow extends React.Component {

  state={ prevHover: false, nextHover: false }

  componentDidUpdate() {
    if(this.props.currentPage === 0 && this.state.prevHover) this.setState({ prevHover: false })
    if(this.props.currentPage === this.props.maxPages - 1 && this.state.nextHover) this.setState({ nextHover: false })
  }

  onHover = (event) => { this.setState({ [event.target.attributes.hover_trigger.value]: true }) }
  offHover = (event) => { this.setState({ [event.target.attributes.hover_trigger.value]: false }) }

  onClickPageFunctions = (event) => { if(this.props.currentPage >= 0 && this.props.currentPage <= this.props.maxPages) this.props.onChangePage(event.target.value || event.target.attributes.value.value) }

  render() {

    let leaderBoardNavButtons = [
      {
        alt: 'PreviousPageButton',
        hover_trigger: 'prevHover',
        id: 'leaderboard_prev_button',
        image: this.state.prevHover ? leaderboardGlyphIndex.leaderboardPrevHover : leaderboardGlyphIndex.leaderboardPrev,
        name: 'leaderboardPrevButton',
        onHoverFunction: this.onHover,
        offHoverFunction: this.offHover,
        pageLimit: this.props.currentPage !== 0,
        value: -1
      },
      {
        alt: 'NextPageButton',
        hover_trigger: 'nextHover',
        id: 'leaderboard_next_button',
        image: this.state.nextHover ? leaderboardGlyphIndex.leaderboardNextHover : leaderboardGlyphIndex.leaderboardNext,
        name: 'leaderboardNextButton',
        onHoverFunction: this.onHover,
        offHoverFunction: this.offHover,
        pageLimit: this.props.currentPage !== this.props.maxPages - 1,
        value: 1
      }
    ]

    const distribLeaderBoardNavButtons = leaderBoardNavButtons.map((button, index) => {
      return(
        <LeaderBoardsNavButton
          alt={ button.alt }
          buttonClass={ button.pageLimit ? 'leader_boards_buttons_row_button' : 'leader_boards_buttons_row_button_disabled' }
          hover_trigger={ button.hover_trigger }
          id={ button.id }
          image={ button.image }
          key={ index }
          name={ button.name }
          onClickFunction={ button.pageLimit ? this.onClickPageFunctions : null }
          onHoverFunction={ button.pageLimit ? button.onHoverFunction : null }
          offHoverFunction={ button.pageLimit ? button.offHoverFunction : null }
          value={ button.value }
        />
      )
    })

    return(
      <div className="leader_boards_buttons_row_container">
        { distribLeaderBoardNavButtons }
      </div>
    )
  }
}

export default LeaderBoardsButtonsRow