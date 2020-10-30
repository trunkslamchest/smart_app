import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions/actionIndex'


import './leaderBoardsContainer.css'

class LeaderBoardsContainer extends React.Component {

  render() {
    return(
      <div className='leader_boards_wrapper'>
        leader_boards_container_temp
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    leaderBoards: state.leaderBoards
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetOverallLeaderBoards: () => dispatch(actions.getOverallLeaderBoards()),
    onGetCatLeaderBoards: () => dispatch(actions.getCatLeaderBoards()),
    onClearLeaderBoards: () => dispatch(actions.clearLeaderBoards()),
    onUpdateLeaderBoardsStatus: (status) => dispatch(actions.updateLeaderBoardsStatus(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoardsContainer)