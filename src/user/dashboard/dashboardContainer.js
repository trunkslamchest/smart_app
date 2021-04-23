import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from '../../utility/paths.js'
import { connect } from 'react-redux'
import {
  getQuestionTotals,
  updateUserQuestions,
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

class Dashboard extends React.Component{

  componentDidMount(){ document.title = "SmartApp™ | Dashboard" }

  render(){

    let routeBoard

    const onHelp = () => {
      this.props.onSetHelpHeader('SmartApp™ Dashboards')
      this.props.onSetHelpSections(makeDashboardHelpSections)
      this.props.onHelpModal(true)
    }

    const navBarButtons = makeDashboardNavButtons(dashboardNavBarIconIndex, onHelp, routes)

    // if(!this.props.auth.loading) {
      if(this.props.auth.status === 'authValid' || this.props.auth.authType === 'deleteProfile') {
        routeBoard =
          <Switch>
            <Route exact path={ routes.dashboard }>
              <DashboardIndex />
            </Route>
            <Route exact path={ routes.dashboard_profile }>
              <DashboardProfileContainer history={ this.props.history } />
            </Route>
            <Route path={ routes.dashboard_profile_edit }>
              <DashboardEditProfileContainer history={ this.props.history } />
            </Route>
            <Route exact path={ routes.dashboard_stats }>
              <DashboardStatsContainer
                question_totals={ this.props.questions.totals }
                user_questions={ this.props.user.questions.totals }
                user_experience={ this.props.user.experience }
                history={ this.props.history }
              />
            </Route>
            <Route exact path={ routes.dashboard_achievements }>
              <UserAchievementsContainer
                all_achievements={ this.props.achievements }
                from_dashboard={ true }
                history={ this.props.history }
                user_achievements={ this.props.user.achievements }
              />
            </Route>
            <Route exact path={ routes.dashboard_settings }>
              <DashboardSettingsContainer history={ this.props.history } />
            </Route>
          </Switch>
      }
    // }

    return(
      <>
        <DefaultButtonsContainer
          buttons={ navBarButtons }
          buttonClass={ 'nav_bar_button' }
          buttonRow={ true }
          containerClass={ 'nav_bar_container' }
          enableButton={ true }
          tooltipClass={ 'nav_bar_tooltip' }
        />
        <div className='dashboard_wrapper'>
          { routeBoard }
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    achievements: state.achievements,
    auth: state.auth,
    questions: state.questions,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetQuestionTotals: () => dispatch(getQuestionTotals()),
    onUpdateUserQuestions: () => dispatch(updateUserQuestions()),
    onHelpModal: (bool) => dispatch(help(bool)),
    onSetHelpHeader: (header) => dispatch(setHelpHeader(header)),
    onSetHelpSections: (sections) => dispatch(setHelpSections(sections))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)