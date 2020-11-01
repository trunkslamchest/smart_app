import React from 'react'
import { connect } from 'react-redux'

import paginateLeaderBoard from '../../leaderBoardsFunctions/paginateLeaderBoard'

import LeaderBoardsHeader from '../../leaderBoardsComponents/leaderBoardsHeader/leaderBoardsHeader'
import LeaderBoardsScoresContainer from '../../leaderBoardsComponents/leaderBoardsScoresContainer/leaderBoardsScoresContainer'

import './leaderBoardsOverallContainer.css'

class LeaderBoardsOverallContainer extends React.Component {

  state = {
    currentPage: 0,
    initPaginate: false,
    leaderBoard: []
  }

  componentDidMount() {
    if(this.props.leaderBoards.overall) {
      let pagniatedLeaderBoard = paginateLeaderBoard(15, this.props.leaderBoards.overall.international)
      this.setState({ leaderBoard: pagniatedLeaderBoard })
    }
  }

  componentDidUpdate() {
    if(this.props.leaderBoards.overall && !this.state.initPaginate) {
      let pagniatedLeaderBoard = paginateLeaderBoard(15, this.props.leaderBoards.overall.international)
      this.setState({ initPaginate: true, leaderBoard: pagniatedLeaderBoard })
    }
  }

  onChangePage = (value) => {
    let page = parseInt(this.state.currentPage)
    page += parseInt(value)
    if(page < 0) page = 0
    if(page > this.state.leaderBoard.length - 1) page = this.state.leaderBoard.length - 1
    this.setState({ currentPage: page })
  }

  render() {
    return(
      <div className="leader_boards_overall_container">
        <LeaderBoardsHeader header_text={ "International" } sub_text={ "Rating" } />
        { this.props.leaderBoards.overall &&
          <LeaderBoardsScoresContainer
            currentPage={ this.state.currentPage }
            history={ this.props.history }
            maxPages={ this.state.leaderBoard.length }
            onChangePage={ this.onChangePage }
            scores={ this.state.leaderBoard }
          />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    leaderBoards: state.leaderBoards
  }
}

export default connect(mapStateToProps)(LeaderBoardsOverallContainer)