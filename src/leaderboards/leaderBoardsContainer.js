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

import LeaderBoardsOverallContainer from './leaderBoardsContainers/leaderBoardsOverall/leaderBoardsOverallContainer'
import LeaderBoardsCountriesContainer from './leaderBoardsContainers/leaderBoardsCountries/leaderBoardsCountriesContainer'
import LeaderBoardsCatContainer from './leaderBoardsContainers/leaderBoardsCat/leaderBoardsCatContainer'
import NavBarContainer from '../UI/navBar/navBarContainer'

import './leaderBoardsContainer.css'

const LeaderBoardsContainer = (props) => {
  const navButtons = [
    { name: 'overall', text: 'Overall', route: props.overallRoute },
    { name: 'countries', text: 'Countries', route: props.countriesRoute },
    { name: 'cat', text: 'Categories', route: props.catRoute },
  ]

  const routeBoard =
    <Switch>
      <Route exact path={ props.overallRoute }>
        <LeaderBoardsOverallContainer history={ props.history } />
      </Route>
      <Route exact path={ props.countriesRoute }>
        <LeaderBoardsCountriesContainer history={ props.history } />
      </Route>
      <Route exact path={ props.catRoute }>
        <LeaderBoardsCatContainer history={ props.history } />
      </Route>
    </Switch>

  return(
    // <div className='leader_boards_wrapper'>
    <div className='default_wrapper'>
      <NavBarContainer buttons={ navButtons } />
      { routeBoard }
    </div>
  )
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