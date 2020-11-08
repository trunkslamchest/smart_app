import React from 'react'

import LeaderBoardsNavButtonTooltip from '../../../UI/tooltips/leaderBoardsNavButtonTooltip/leaderBoardsNavButtonTooltip'

import cookieFunctions from '../../../utility/cookieFunctions'

import './leaderBoardsNavButton.css'

class LeaderBoardsNavButton extends React.Component {

  state = { hover: false, showTooltip: false }

  componentDidUpdate() {
    if(!this.props.pageLimit && this.state.showTooltip) this.setState({ showTooltip: false })
    if(!this.props.pageLimit && this.state.hover) this.setState({ hover: false })
  }

  componentWillUnmount(){
    this.setState({ hover: false, showTooltip: false })
    clearTimeout(this.toolTipTimeout)
  }

  onHover = () => {
    this.setState({ hover: true })
    this.toolTipTimeout = setTimeout(() => { this.setState({ showTooltip: true })}, 250)
  }

  offHover = () => {
    this.setState({ hover: false, showTooltip: false })
    clearTimeout(this.toolTipTimeout)
  }

  onClickFunction = (event) => {
    document.cookie = `${this.props.name}Clicked=true`
    // cookieFunctions('delete', `${this.props.name}Clicked`)
    if(this.props.pageLimit) this.props.onClickFunction(event.target.value || event.target.attributes.value.value)
  }

  render() {

    let checkLeaderBoardNavButtonClicked = cookieFunctions('getCookieValue', `${this.props.name}Clicked`) !== 'true'

    return(
      <div className='leader_boards_buttons_row_button_container'
        onMouseEnter={ this.props.pageLimit ? this.onHover : null }
        onMouseLeave={ this.props.pageLimit ? this.offHover : null }
      >
        <button
          className={ this.props.buttonClass }
          id={ this.props.id }
          name={ this.props.name }
          onClick={ this.onClickFunction }
          value={ this.props.value }
        >
          <img
            alt={ this.props.alt }
            id={ this.props.id }
            name={ this.props.name }
            onClick={ this.onClickFunction }
            src={ this.state.hover ? this.props.imageHover : this.props.image }
            value={ this.props.value }
          />
        </button>
        {
          this.props.tooltipText &&
          this.state.showTooltip &&
          this.state.hover &&
          checkLeaderBoardNavButtonClicked &&
            <LeaderBoardsNavButtonTooltip
              offHover={ this.offHover }
              tooltipText={ this.props.tooltipText }
            />
        }
      </div>
    )
  }
}

export default LeaderBoardsNavButton