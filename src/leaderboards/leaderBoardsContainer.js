import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  help,
  setHelpHeader,
  setHelpSections
} from '../store/actions/actionIndex'

import makeLeaderBoardsNavButtons from './leaderBoardsFunctions/makeLeaderBoardsNavButtons'
import makeLeaderBoardsHelpSections from './leaderBoardsFunctions/makeLeaderBoardsHelpSections'

import LeaderBoardsOverallContainer from './leaderBoardsContainers/leaderBoardsOverallContainer'
import LeaderBoardsCountriesContainer from './leaderBoardsContainers/leaderBoardsCountriesContainer'
import LeaderBoardsCatContainer from './leaderBoardsContainers/leaderBoardsCatContainer'
import DefaultButtonsContainer from '../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import leaderBoardNavBarIconIndex from '../assets/nav_bar_icons/leaderBoardNavBarIconIndex'

import './leaderBoardsContainer.css'
import './leaderBoardsResponse.css'

const LeaderBoardsContainer = (props) => {

  const onHelp = () => {
    props.onSetHelpHeader('SmartApp™ Leaderboards')
    props.onSetHelpSections(makeLeaderBoardsHelpSections)
    props.onHelpModal(true)
  }

  const onPushLink = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    props.history.push(buttonParams.route)
  }

  const navBarButtons = makeLeaderBoardsNavButtons(leaderBoardNavBarIconIndex, onHelp, onPushLink, { overall: props.overallRoute, countries: props.countriesRoute, categories: props.catRoute })

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
        buttonRow={ true }
        containerClass={ 'nav_bar_container' }
        enableButton={ true }
        history={ props.history }
        tooltipClass={ 'nav_bar_tooltip' }
      />
      { routeBoard }
    </>
  )
}

const store = (store) => {
  return {
    leaderBoards: store.leaderBoards
  }
}

const dispatch = (dispatch) => {
  return {
    onHelpModal: (bool) => dispatch(help(bool)),
    onSetHelpHeader: (header) => dispatch(setHelpHeader(header)),
    onSetHelpSections: (sections) => dispatch(setHelpSections(sections))
  }
}

export default connect(store, dispatch)(LeaderBoardsContainer)