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
import LeaderBoardsRegionalContainer from './leaderBoardsContainers/leaderBoardsRegionalContainer'
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
          <LeaderBoardsRegionalContainer
            documentTitle='Regional'
            headerText='Countries'
            pageLimit={ 5 }
            scores={ props.countryLeaderBoards }
          />
        </Route>
        <Route exact path={ props.catRoute }>
          <LeaderBoardsCatContainer
            documentTitle='Category'
            headerText='Categories'
            pageLimit={ 10 }
            scores={ props.catLeaderBoards }
          />
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
    catLeaderBoards: store.leaderBoards.cat.international,
    countryLeaderBoards: store.leaderBoards.overall.regional
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