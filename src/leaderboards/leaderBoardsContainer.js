import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
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

  const history = useHistory()

  const onHelp = () => {
    props.onSetHelpHeader('SmartApp™ Leaderboards')
    props.onSetHelpSections(makeLeaderBoardsHelpSections)
    props.onHelpModal(true)
  }

  const onPushLink = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    history.push(buttonParams.route)
  }

  const navBarButtons = makeLeaderBoardsNavButtons(
    leaderBoardNavBarIconIndex,
    onHelp,
    onPushLink,
    { overall: props.overallRoute, countries: props.countriesRoute, categories: props.catRoute }
  )

  const routeBoard =
    <div className="leader_boards_wrapper">
      <Switch>
        <Route exact path={ props.overallRoute }>
          <LeaderBoardsOverallContainer />
        </Route>
        <Route exact path={ props.countriesRoute }>
          <LeaderBoardsCountriesContainer />
        </Route>
        <Route exact path={ props.catRoute }>
          <LeaderBoardsCatContainer />
        </Route>
      </Switch>
    </div>

  return(
    <>
      <DefaultButtonsContainer
        buttons={ navBarButtons }
        buttonClass={ 'nav_bar_button' }
        buttonContainerClass={ 'nav_bar_button_container' }
        buttonRow={ true }
        containerClass={ 'nav_bar_container' }
        enableButton={ true }
        tooltipClass={ 'nav_bar_tooltip' }
      />
      { routeBoard }
    </>
  )
}

const store = (store) => {
  return {
    leaderBoards: store.leaderBoards,
    modal: store.modal
  }
}

const dispatch = (dispatch) => {
  return {
    onHelpModal: (bool) => dispatch(help(bool)),
    onSetHelpHeader: (header) => dispatch(setHelpHeader(header)),
    onSetHelpSections: (sections) => dispatch(setHelpSections(sections))
  }
}

export default connect(store, dispatch)(React.memo(LeaderBoardsContainer, (prevProps, nextProps) => {
  if(prevProps.modal.loading === nextProps.modal.loading) return true
  else return false
}))