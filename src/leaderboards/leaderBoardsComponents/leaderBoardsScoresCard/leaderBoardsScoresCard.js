import React from 'react'

import paginateLeaderBoard from '../../leaderBoardsFunctions/paginateLeaderBoard'

import LeaderBoardsSubHeader from '../leaderBoardsSubHeader/leaderBoardsSubHeader'
import LeaderBoardsScoresRow from '../leaderBoardsScoresRow/leaderBoardsScoresRow'
import LeaderBoardsButtonsRow from '../leaderBoardsButtonsRow/leaderBoardsButtonsRow'

import flagIconIndex from '../../../assets/flag_icons/flagIconIndex'

import './leaderBoardsScoresCard.css'

class LeaderBoardsScoresCard extends React.Component {

  state = {
    showScores: false,
    headerButtonHover: false,
    currentPage: 0,
    initPaginate: false,
    leaderBoard: []
  }

  constructor(props) {
    super(props)
    this.setButtonRef = this.setButtonRef.bind(this)
    this.setRowsRef = this.setRowsRef.bind(this)
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickListen)

    if(this.props.scores) {
      let pagniatedLeaderBoard = paginateLeaderBoard(this.props.pageLimit, this.props.scores)
      this.setState({ leaderBoard: pagniatedLeaderBoard })
    }
  }

  componentDidUpdate() {
    if(this.props.scores && !this.state.initPaginate) {
      let pagniatedLeaderBoard = paginateLeaderBoard(this.props.pageLimit, this.props.scores)
      this.setState({ initPaginate: true, leaderBoard: pagniatedLeaderBoard })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickListen)
    this.setState({ headerButtonHover: false })
  }

  setButtonRef(node){ this.buttonRef = node }
  setRowsRef(node){ this.rowsRef = node }

  onClickListen = (event) => {
    // console.log(event.target.parentNode.className)

    if(
      (!!this.rowsRef && !this.rowsRef.contains(event.target)) &&
      (!!this.buttonRef && !this.buttonRef.contains(event.target)) &&
      (event.target.className !== "main_container" && event.target.className !== "header" && event.target.className !== "footer")
      // (!!event.target.parentNode.className && (event.target.parentNode.className.split("_")[0] !== 'header' && event.target.parentNode.className.split("_")[0] !== 'footer'))

      // (event.target.nodeName === "DIV" || event.target.nodeName === "H3" || event.target.nodeName === "H4" || event.target.nodeName === "IMG") &&
      // event.target.className !== "main_container" &&
      // event.target.parentNode.className.split("_")[0] === 'leader'
    ) this.setState({ showScores: false })
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

  onDropDown = () => {
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
              history={ this.props.history }
              key={ score.uid }
              score={ score }
            />
          :
            <LeaderBoardsScoresRow countryFlag={ null } history={ null } key={ index } score={ null } />
        })
      }
    }

    return(
      <div className="leader_boards_countries_card" >
        <div
          hover_trigger="headerButtonHover"
          onClick={ this.onDropDown }
          onMouseEnter={ this.onScoresHover }
          onMouseLeave={ this.offScoresHover }
          ref={ this.setButtonRef }
        >
          <LeaderBoardsSubHeader
            scoresSetName={ this.props.scoresSetName }
            headerButtonHover={ this.state.headerButtonHover }
            key={ `${this.props.scoresSetName}_header` }
            showScores={ this.state.showScores }
            sub_text={ 'Rating' }
          />
        </div>
        <div className='leader_boards_row_ref' ref={ this.setRowsRef }>
          { distribScores }
          { this.state.showScores &&
            <LeaderBoardsButtonsRow
              onChangePage={ this.onChangePage }
              currentPage={ this.state.currentPage }
              maxPages={ this.state.leaderBoard.length }
            />
          }
        </div>
      </div>
    )
  }
}

export default LeaderBoardsScoresCard