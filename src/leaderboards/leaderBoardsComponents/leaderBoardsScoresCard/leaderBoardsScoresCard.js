import React from 'react'

import paginateLeaderBoard from '../../leaderBoardsFunctions/paginateLeaderBoard'

import LeaderBoardsSubHeader from '../leaderBoardsSubHeader/leaderBoardsSubHeader'
import LeaderBoardsScoresRow from '../leaderBoardsScoresRow/leaderBoardsScoresRow'
import LeaderBoardsButtonsRow from '../leaderBoardsButtonsRow/leaderBoardsButtonsRow'

import flagIconIndex from '../../../assets/flag_icons/flagIconIndex'

import './leaderBoardsScoresCard.css'

class LeaderBoardsScoresCard extends React.Component {

  state = {
    currentPage: 0,
    headerButtonHover: false,
    leaderBoard: [],
  }

  constructor(props) {
    super(props)
    this.buttonRef = React.createRef()
    this.rowsRef = React.createRef()
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickListen)
    if(this.props.scores) {
      let pagniatedLeaderBoard = paginateLeaderBoard(this.props.pageLimit, this.props.scores)
      this.setState({ leaderBoard: pagniatedLeaderBoard })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickListen)
    this.setState({ currentPage: 0, headerButtonHover: false, leaderBoard: [], showScores: false })
  }

  onClickListen = (event) => {
    if(
      (!!this.rowsRef.current && !this.rowsRef.current.contains(event.target)) &&
      (!!this.buttonRef.current && !this.buttonRef.current.contains(event.target)) &&
      (event.target.className !== "main_container" && event.target.className !== "header" && event.target.className !== "footer")
    ) {
      this.setState({ showScores: false })
    }
  }

  onChangePage = (value) => {
    let page = parseInt(this.state.currentPage)
    page += parseInt(value)
    if(page < 0) page = 0
    if(page > this.state.leaderBoard.length - 1) page = this.state.leaderBoard.length - 1
    this.setState({ currentPage: page })
  }

  onScoresHover = (event) => { event.target.attributes.hover_trigger && this.setState({ [event.target.attributes.hover_trigger.value]: true }) }
  offScoresHover = (event) => { event.target.attributes.hover_trigger && this.setState({ [event.target.attributes.hover_trigger.value]: false }) }

  scrollToSection = () => { this.buttonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) }

  onDropDown = () => {
    if(this.state.showScores) document.body.scrollTop = 0
    else this.scrollToSection()
    let switchScores = !this.state.showScores
    this.setState({ showScores: switchScores })
  }

  render() {

    let distribScores

    if(this.state.showScores) {
      if(!!this.state.leaderBoard[this.state.currentPage]) {
        distribScores = this.state.leaderBoard[this.state.currentPage].map((score, index) => {
          return !!score ?
            <LeaderBoardsScoresRow
              countryFlag={ flagIconIndex[score.country] }
              fromScoresCard={ true }
              key={ score.uid }
              prevScore={ !!this.state.leaderBoard[this.state.currentPage][index - 1] }
              nextScore={ !!this.state.leaderBoard[this.state.currentPage][index + 1] }
              score={ score }
            />
          :
            <LeaderBoardsScoresRow countryFlag={ null } key={ index } score={ null } />
        })
      }
    }

    return(
      <div className={ this.state.showScores ? 'leader_boards_sub_wrapper leader_boards_sub_wrapper_active' : 'leader_boards_sub_wrapper' }>
        <div
          hover_trigger="headerButtonHover"
          onClick={ this.onDropDown }
          onMouseEnter={ this.onScoresHover }
          onMouseLeave={ this.offScoresHover }
          ref={ this.buttonRef }
        >
          <LeaderBoardsSubHeader
            scoresSetName={ this.props.scoresSetName }
            headerButtonHover={ this.state.headerButtonHover }
            key={ `${this.props.scoresSetName}_header` }
            showScores={ this.state.showScores }
            sub_text={ 'Rating' }
          />
        </div>
        { this.state.showScores &&
        <div className={ this.state.showScores ? 'leader_boards_row_ref' : 'leader_boards_row_ref_hidden' } ref={ this.rowsRef }>
          <div className='leader_boards_scores_card_wrapper'>
            { distribScores }
          </div>
          { this.state.showScores &&
            <LeaderBoardsButtonsRow
              onChangePage={ this.onChangePage }
              currentPage={ this.state.currentPage }
              maxPages={ this.state.leaderBoard.length }
              tooltipClass={ 'leader_boards_nav_button_tooltip' }
            />
          }
        </div>
       }
      </div>
    )
  }
}

export default LeaderBoardsScoresCard