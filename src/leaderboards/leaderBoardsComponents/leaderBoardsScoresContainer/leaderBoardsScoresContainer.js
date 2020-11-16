import React from 'react'

import paginateLeaderBoard from '../../leaderBoardsFunctions/paginateLeaderBoard'
import LeaderBoardsScoresRow from '../leaderBoardsScoresRow/leaderBoardsScoresRow'
import LeaderBoardsButtonsRow from '../leaderBoardsButtonsRow/leaderBoardsButtonsRow'

import flagIconIndex from '../../../assets/flag_icons/flagIconIndex'

import './leaderBoardsScoresContainer.css'

class LeaderBoardScoresContainer extends React.Component {

  state = {
    currentPage: 0,
    initPaginate: false,
    leaderBoard: []
  }

  componentDidMount() {
    if(this.props.scores) {
      let pagniatedLeaderBoard = paginateLeaderBoard(this.props.pageLimit, this.props.scores)
      this.setState({ leaderBoard: pagniatedLeaderBoard })
    }
  }

  componentDidUpdate() {
    // if(this.props.scores && !this.state.initPaginate) {
    //   let pagniatedLeaderBoard = paginateLeaderBoard(this.props.pageLimit, this.props.scores)
    //   this.setState({ initPaginate: true, leaderBoard: pagniatedLeaderBoard })
    // }
  }

  onChangePage = (value) => {
    let page = parseInt(this.state.currentPage)
    page += parseInt(value)
    if(page < 0) page = 0
    if(page > this.state.leaderBoard.length - 1) page = this.state.leaderBoard.length - 1
    this.setState({ currentPage: page })
  }

  render() {

    let distribScores

    if(!!this.state.leaderBoard[this.state.currentPage]) {
      distribScores = this.state.leaderBoard[this.state.currentPage].map((score, index) => {
        return !!score ?
          <LeaderBoardsScoresRow
            countryFlag={ flagIconIndex[score.country] }
            history={ this.props.history }
            key={ score.uid }
            score={ score }
          />
        :
          <LeaderBoardsScoresRow countryFlag={ null } history={ null } key={ index } score={ null } />
      })
    }

    return (
      <div className="leader_board_scores_container">
        <div className="leader_board_scores_row_container">
          { distribScores }
        </div>
        <LeaderBoardsButtonsRow
          onChangePage={ this.onChangePage }
          currentPage={ this.state.currentPage }
          maxPages={ this.state.leaderBoard.length }
          tooltipClass={ 'leader_boards_nav_button_tooltip' }
        />
      </div>
    )
  }
}

export default LeaderBoardScoresContainer