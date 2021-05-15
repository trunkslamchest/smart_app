import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from '../../utility/paths.js'
import { connect } from 'react-redux'
import {
  help,
  setHelpHeader,
  setHelpSections
} from '../../store/actions/actionIndex'

import makeDashboardNavButtons from './dashboardFunctions/makeDashboardNavButtons'
import makeDashboardHelpSections from './dashboardFunctions/makeDashboardHelpSections'

import DashboardIndex from './dashboardContainers/dashboardIndex/dashboardIndex'
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

  useEffect(() => {
    document.title = "SmartApp™ | Dashboard"
    if(localStorage.authValid !== 'true') props.history.push( routes.home )
  }, [props.history])

  const onHelp = () => {
    props.onSetHelpHeader('SmartApp™ Dashboards')
    props.onSetHelpSections(makeDashboardHelpSections)
    props.onHelpModal(true)
  }

  const onPushLink = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    props.history.push(buttonParams.route)
  }

  const navBarButtons = makeDashboardNavButtons(dashboardNavBarIconIndex, onHelp, onPushLink, routes)

  let dashboardBlock

  if(props.auth.status === 'authValid' || props.auth.authType === 'deleteProfile') {
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
            <Route exact path={ routes.dashboard }>
              <DashboardIndex />
            </Route>
            <Route exact path={ routes.dashboard_profile }>
              <DashboardProfileContainer history={ props.history } />
            </Route>
            <Route path={ routes.dashboard_profile_edit }>
              <DashboardEditProfileContainer history={ props.history } />
            </Route>
            <Route exact path={ routes.dashboard_stats }>
              <DashboardStatsContainer
                history={ props.history }
                question_totals={ props.questions.totals }
                user_questions={ props.user.questions.totals }
                user_experience={ props.user.experience }
              />
            </Route>
            <Route exact path={ routes.dashboard_achievements }>
              <UserAchievementsContainer
                all_achievements={ props.achievements }
                from_dashboard={ true }
                history={ props.history }
                user_achievements={ props.user.achievements }
              />
            </Route>
            <Route exact path={ routes.dashboard_settings }>
              <DashboardSettingsContainer
                switchbasicModalContent={ props.switchbasicModalContent }
                history={ props.history }
              />
            </Route>
          </Switch>
        </div>
      </>
    }

  return(
    <>
      { (!props.modal.loading || !props.auth.loading) && dashboardBlock }
    </>
  )
}

const store = (store) => {
  return {
    achievements: store.achievements,
    auth: store.auth,
    modal: store.modal,
    questions: store.questions,
    user: store.user
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