import React from 'react'
import { connect } from 'react-redux'

import LeaderBoardsHeader from '../leaderBoardsComponents/leaderBoardsHeader/leaderBoardsHeader'
import LeaderBoardsScoresContainer from '../leaderBoardsComponents/leaderBoardsScoresContainer/leaderBoardsScoresContainer'

import './leaderBoardsOverallContainer.css'

class LeaderBoardsOverallContainer extends React.Component {

  render() {
    return(
      <div className="leader_boards_overall_container">
        <LeaderBoardsHeader header_text={ "International" } sub_text={ "Rating"} />
        { this.props.leaderBoards.overall && <LeaderBoardsScoresContainer history={ this.props.history } scores={ this.props.leaderBoards.overall.international } /> }
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