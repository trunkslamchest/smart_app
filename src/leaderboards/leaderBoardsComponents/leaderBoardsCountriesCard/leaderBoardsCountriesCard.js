import React from 'react'

import LeaderBoardsCountriesHeader from '../leaderBoardsCountriesHeader/leaderBoardsCountriesHeader'
import LeaderBoardsScoresRow from '../leaderBoardsScoresRow/leaderBoardsScoresRow'
import LeaderBoardsButtonsRow from '../leaderBoardsButtonsRow/leaderBoardsButtonsRow'

import flagIconIndex from '../../../assets/flag_icons/flagIconIndex'

import './leaderBoardsCountriesCard.css'

class LeaderBoardsCountriesCard extends React.Component {

  state = { showScores: false, headerButtonHover: false }

  constructor(props) {
    super(props)
    this.setButtonRef = this.setButtonRef.bind(this)
  }

  componentDidMount() { document.addEventListener('click', this.onClickListen) }
  componentWillUnmount() {
    document.removeEventListener('click', this.onClickListen)
    this.setState({ headerButtonHover: false })
  }

  setButtonRef(node){ this.buttonRef = node }

  onClickListen = (event) => {
    if(
      (!!this.buttonRef && !this.buttonRef.contains(event.target)) &&
      (event.target.nodeName === "BUTTON" ||
      event.target.nodeName === "IMG" ||
      event.target.nodeName === "SPAN" ||
      event.target.nodeName === "H3" ||
      event.target.nodeName === "H4" ||
      event.target.nodeName === "DIV") &&
      event.target.className !== "main_container" &&
      event.target.parentNode.className.split("_")[0] === 'leader'
    ) this.setState({ showScores: false })
  }

  onScoresHover = (event) => { event.target.attributes.hover_trigger && this.setState({ [event.target.attributes.hover_trigger.value]: true }) }
  offScoresHover = (event) => { event.target.attributes.hover_trigger && this.setState({ [event.target.attributes.hover_trigger.value]: false }) }

  onDropDown = () => {
    let switchScores = !this.state.showScores
    this.setState({ showScores: switchScores })
  }

  render() {

    let distribScores = <></>

    if(this.state.showScores) {
      distribScores = this.props.scores.map(score => {
        return(
          <LeaderBoardsScoresRow
            countryFlag={ flagIconIndex[score.country] }
            fromCountry={ true }
            history={ this.props.history }
            key={ score.uid }
            rank={ this.props.scores.indexOf(score) + 1 }
            score={ score }
          />
        )
      })
    }

    return(
      <div
        className="leader_boards_countries_card"
        hover_trigger="headerButtonHover"
        onClick={ this.onDropDown }
        onMouseEnter={ this.onScoresHover }
        onMouseLeave={ this.offScoresHover }
        ref={ this.setButtonRef }
      >
        <LeaderBoardsCountriesHeader
          countryName={ this.props.countryName }
          headerButtonHover={ this.state.headerButtonHover }
          key={ `${this.props.countryName}_header` }
          showScores={ this.state.showScores }
          sub_text={ 'Rating' }
        />
        { distribScores }
        { this.state.showScores && <LeaderBoardsButtonsRow /> }
      </div>
    )
  }
}

export default LeaderBoardsCountriesCard