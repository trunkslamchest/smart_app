import React from 'react'
import { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { routes } from '../../utility/paths.js'
import { connect } from 'react-redux'
import {
  help,
  setHelpHeader,
  setHelpSections
} from '../../store/actions/actionIndex'

import makeDashboardNavButtons from './dashboardFunctions/makeDashboardNavButtons'
import makeDashboardHelpSections from './dashboardFunctions/makeDashboardHelpSections'

import DashboardProfileContainer from './dashboardContainers/dashboardProfile/dashboardProfileContainer'
import DashboardStatsContainer from './dashboardContainers/dashboardStats/dashboardStatsContainer'
import DashboardSettingsContainer from './dashboardContainers/dashboardSettings/dashboardSettingsContainer'
import DashboardEditProfileContainer from './dashboardContainers/dashboardEditProfile/dashboardEditProfileContainer'

import UserAchievementsContainer from '../../UI/components/containers/userAchievementsContainer/userAchievementsContainer'
import DefaultButtonsContainer from '../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import dashboardNavBarIconIndex from '../../assets/nav_bar_icons/dashboardNavBarIconIndex'

import './dashboardContainer.css'
import './dashboardResponse.css'

const Dashboard = (props) => {

  const history = useHistory()

  useEffect(() => {
    document.title = "SmartApp™ | Dashboard"
    if(localStorage.authValid !== 'true') history.push( routes.home )
  }, [history])

  const onHelp = () => {
    props.onSetHelpHeader('SmartApp™ Dashboards')
    props.onSetHelpSections(makeDashboardHelpSections)
    props.onHelpModal(true)
  }

  const onPushLink = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    history.push(buttonParams.route)
  }

  const navBarButtons = makeDashboardNavButtons(dashboardNavBarIconIndex, onHelp, onPushLink, routes)

  let dashboardBlock = <></>

  if(props.authStatus === 'authValid') {
    dashboardBlock =
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
        <div className='dashboard_wrapper'>
          <Switch>
            <Route exact path={ routes.dashboard_profile }>
              <DashboardProfileContainer />
            </Route>
            <Route path={ routes.dashboard_profile_edit }>
              <DashboardEditProfileContainer />
            </Route>
            <Route exact path={ routes.dashboard_stats }>
              <DashboardStatsContainer />
            </Route>
            <Route exact path={ routes.dashboard_achievements }>
              <UserAchievementsContainer from_dashboard={ true } />
            </Route>
            <Route exact path={ routes.dashboard_settings }>
              <DashboardSettingsContainer />
            </Route>
          </Switch>
        </div>
      </>
    }

  return !props.showModal && dashboardBlock
}

const store = (store) => {
  return {
    authStatus: store.auth.status,
    showModal: store.modal.showModal
  }
}

const dispatch = (dispatch) => {
  return {
    onHelpModal: (bool) => dispatch(help(bool)),
    onSetHelpHeader: (header) => dispatch(setHelpHeader(header)),
    onSetHelpSections: (sections) => dispatch(setHelpSections(sections))
  }
}

export default connect(store, dispatch)(Dashboard)