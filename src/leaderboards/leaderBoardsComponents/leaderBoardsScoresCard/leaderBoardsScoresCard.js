import React from 'react'

import paginateLeaderBoard from '../../leaderBoardsFunctions/paginateLeaderBoard'

import LeaderBoardsSubHeader from '../leaderBoardsSubHeader/leaderBoardsSubHeader'
import LeaderBoardsScoresRowContainer from '../leaderBoardsScoresRow/leaderBoardsScoresRowContainer'
import LeaderBoardsButtonsRow from '../leaderBoardsButtonsRow/leaderBoardsButtonsRow'

import flagIconIndex from '../../../assets/flag_icons/flagIconIndex'

import './leaderBoardsScoresCard.css'

class LeaderBoardsScoresCard extends React.Component {

  state = {
    currentPage: 0,
    headerButtonHover: false,
    leaderBoard: []
  }

  constructor(props) {
    super(props)
    this.buttonRef = React.createRef()
    this.rowsRef = React.createRef()
    this.scrollRef = React.createRef()
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickListen)
    if(this.props.scores) {
      let pagniatedLeaderBoard = paginateLeaderBoard(this.props.pageRowLimit, this.props.scores, this.props.scoresSetName)
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

  onDropDown = () => {
    if(this.state.showScores) requestAnimationFrame(() => { requestAnimationFrame(() => { document.body.scrollTo({ behavior: "smooth", top: 0 }) }) })
    requestAnimationFrame(() => { requestAnimationFrame(() => { this.scrollRef.current.scrollIntoView({ behavior: "smooth", top: this.scrollRef.current.offsetTop }) }) })
    let switchScores = !this.state.showScores
    this.setState({ showScores: switchScores })
  }

  render() {

    let distribScores, top3scores = [ ]

    if(this.state.showScores) {
      if(!!this.state.leaderBoard[this.state.currentPage]) {
        distribScores = this.state.leaderBoard[this.state.currentPage].map((score, index) => {
          let scoreComponent = <LeaderBoardsScoresRowContainer
              blankTop3Card ={ this.state.currentPage === 0 && !score && index < 3 }
              currentPage={ this.state.currentPage }
              cardNumber={ index + 1 }
              countryFlag={ !!score && flagIconIndex[score.country] }
              fromScoresCard={ true }
              key={ score ? score.uid : index }
              nextScore={ !!this.state.leaderBoard[this.state.currentPage][index + 1] }
              prevScore={ !!this.state.leaderBoard[this.state.currentPage][index - 1] }
              score={ !!score && score }
              scoreCount={ this.props.scores.length }
              top3Card ={ this.state.currentPage === 0 && index < 3 }
            />

          if(this.state.currentPage === 0) {
            if(index < 3) {
              top3scores[index] = scoreComponent
              return null
            } else return scoreComponent
          } else return scoreComponent
        })
      }
    }

    return(
      <div
        className={ this.state.showScores ? 'leader_boards_sub_wrapper leader_boards_sub_wrapper_active' : 'leader_boards_sub_wrapper' }
        ref={ this.scrollRef }
      >
        <div
          hover_trigger="headerButtonHover"
          onClick={ this.onDropDown }
          onMouseEnter={ this.onScoresHover }
          onMouseLeave={ this.offScoresHover }
          ref={ this.buttonRef }
        >
          <LeaderBoardsSubHeader
            headerButtonHover={ this.state.headerButtonHover }
            key={ `${this.props.scoresSetName}_header` }
            showScores={ this.state.showScores }
            scoresSetName={ this.props.scoresSetName }
            sub_text={ 'Rating' }
          />
        </div>
        { this.state.showScores &&
        <div className={ this.state.showScores ? 'leader_boards_row_ref' : 'leader_boards_row_ref_hidden' } ref={ this.rowsRef }>
          <div className="leader_board_scores_sub_container">
            { this.state.currentPage === 0 &&
              <div className='leader_boards_top3_container'>
                { top3scores }
              </div>
            }
            { distribScores }
          </div>
          { this.state.showScores &&
            <LeaderBoardsButtonsRow
              currentPage={ this.state.currentPage }
              maxPages={ this.state.leaderBoard.length }
              onChangePage={ this.onChangePage }
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