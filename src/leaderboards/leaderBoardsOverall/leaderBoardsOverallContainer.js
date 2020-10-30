import React from 'react'
import { connect } from 'react-redux'

import './leaderBoardsOverallContainer.css'

class LeaderBoardsOverallContainer extends React.Component {

  render() {
    return(
      <div className="leader_boards_overall_container">
        LeaderBoardsOverallContainer_temp
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