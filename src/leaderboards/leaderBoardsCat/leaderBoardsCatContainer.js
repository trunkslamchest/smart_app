import React from 'react'
import { connect } from 'react-redux'

import './leaderBoardsCatContainer.css'

class LeaderBoardsCatContainer extends React.Component {

  render() {
    return(
      <div className="leader_boards_cat_container">
        LeaderBoardsCatContainer_temp
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    leaderBoards: state.leaderBoards
  }
}

export default connect(mapStateToProps)(LeaderBoardsCatContainer)