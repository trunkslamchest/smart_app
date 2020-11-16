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

import makeLeaderBoardsNavButtons from './leaderBoardsFunctions/makeLeaderBoardsNavButtons'

import LeaderBoardsOverallContainer from './leaderBoardsContainers/leaderBoardsOverallContainer'
import LeaderBoardsCountriesContainer from './leaderBoardsContainers/leaderBoardsCountriesContainer'
import LeaderBoardsCatContainer from './leaderBoardsContainers/leaderBoardsCatContainer'
import DefaultButtonsContainer from '../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './leaderBoardsContainer.css'

const LeaderBoardsContainer = (props) => {

  const navBarButtons = makeLeaderBoardsNavButtons({ overall: props.overallRoute, countries: props.countriesRoute, categories: props.catRoute })

  const routeBoard =
    <div className="leader_boards_wrapper">
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
    </div>

  return(
    <>
      <DefaultButtonsContainer
        buttons={ navBarButtons }
        buttonClass={ 'nav_bar_button' }
        containerClass={ 'nav_bar_container' }
        enableButton={ true }
        tooltipClass={ 'nav_bar_tooltip' }
      />
      { routeBoard }
    </>
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