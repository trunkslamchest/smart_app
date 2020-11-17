import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  getOverallLeaderBoards,
  getCatLeaderBoards,
  clearLeaderBoards,
  updateLeaderBoardsStatus,
  updateLeaderBoardsLoadingStatus,
  help
} from '../store/actions/actionIndex'

import makeLeaderBoardsNavButtons from './leaderBoardsFunctions/makeLeaderBoardsNavButtons'
import makeLeaderBoardsHelpSections from './leaderBoardsFunctions/makeLeaderBoardsHelpSections'

import LeaderBoardsOverallContainer from './leaderBoardsContainers/leaderBoardsOverallContainer'
import LeaderBoardsCountriesContainer from './leaderBoardsContainers/leaderBoardsCountriesContainer'
import LeaderBoardsCatContainer from './leaderBoardsContainers/leaderBoardsCatContainer'
import DefaultButtonsContainer from '../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import Help from '../help/help'

import leaderBoardNavBarIconIndex from '../assets/nav_bar_icons/leaderBoardNavBarIconIndex'

import './leaderBoardsContainer.css'

const LeaderBoardsContainer = (props) => {

  const onHelp = () => { props.onHelpModal(true) }

  const leaderBoardsHelpSections = makeLeaderBoardsHelpSections

  const navBarButtons = makeLeaderBoardsNavButtons(leaderBoardNavBarIconIndex, onHelp, { overall: props.overallRoute, countries: props.countriesRoute, categories: props.catRoute })

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
      { props.modal.help && <Help headerText={ 'SmartApp™ Leaderboards'} helpType={ 'leaderBoards' } helpSections = { leaderBoardsHelpSections } history={ props.history } /> }
      <DefaultButtonsContainer
        buttons={ navBarButtons }
        buttonClass={ 'nav_bar_button' }
        containerClass={ 'nav_bar_container' }
        enableButton={ true }
        history={ props.history }
        tooltipClass={ 'nav_bar_tooltip' }
      />
      { routeBoard }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    leaderBoards: state.leaderBoards,
    modal: state.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetOverallLeaderBoards: () => dispatch(getOverallLeaderBoards()),
    onGetCatLeaderBoards: () => dispatch(getCatLeaderBoards()),
    onClearLeaderBoards: () => dispatch(clearLeaderBoards()),
    onUpdateLeaderBoardsStatus: (status) => dispatch(updateLeaderBoardsStatus(status)),
    onUpdateLeaderBoardsLoadingStatus: (status) => dispatch(updateLeaderBoardsLoadingStatus(status)),
    onHelpModal: (bool) => dispatch(help(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoardsContainer)