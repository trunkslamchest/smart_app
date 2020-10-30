import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  getOverallLeaderBoards,
  getCatLeaderBoards,
  clearLeaderBoards,
  updateLeaderBoardsStatus,
  updateLeaderBoardsLoadingStatus
} from '../store/actions/actionIndex'

import LeaderBoardsOverallContainer from './leaderBoardsOverall/leaderBoardsOverallContainer'
import LeaderBoardsCatContainer from './leaderBoardsCat/leaderBoardsCatContainer'
import NavBarContainer from '../UI/navBar/navBarContainer'

import './leaderBoardsContainer.css'

class LeaderBoardsContainer extends React.Component {

  render() {

    const navButtons = [
      { name: 'overall', text: 'Overall', route: this.props.overallRoute },
      { name: 'cat', text: 'Categories', route: this.props.catRoute },
    ]

    const routeBoard =
      <Switch>
        <Route exact path={ this.props.overallRoute }>
          <LeaderBoardsOverallContainer history={ this.props.history } />
        </Route>
        <Route exact path={ this.props.catRoute }>
          <LeaderBoardsCatContainer history={ this.props.history } />
        </Route>
      </Switch>

    return(
      <div className='leader_boards_wrapper'>
        <NavBarContainer buttons={ navButtons } />
        { routeBoard }
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
    onGetOverallLeaderBoards: () => dispatch(getOverallLeaderBoards()),
    onGetCatLeaderBoards: () => dispatch(getCatLeaderBoards()),
    onClearLeaderBoards: () => dispatch(clearLeaderBoards()),
    onUpdateLeaderBoardsStatus: (status) => dispatch(updateLeaderBoardsStatus(status)),
    onUpdateLeaderBoardsLoadingStatus: (status) => dispatch(updateLeaderBoardsLoadingStatus(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoardsContainer)