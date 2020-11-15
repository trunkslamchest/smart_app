import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from '../../utility/paths.js'
import { connect } from 'react-redux'
import {
  getQuestionTotals,
  updateUserQuestions
} from '../../store/actions/actionIndex'

import DashboardIndex from './dashboardContainers/dashboardIndex/dashboardIndex'
import DashboardProfileContainer from './dashboardContainers/dashboardProfile/dashboardProfileContainer'
import DashboardStatsContainer from './dashboardContainers/dashboardStats/dashboardStatsContainer'
import DashboardAchievementsContainer from './dashboardContainers/dashboardAchievements/dashboardAchievementsContainer'
import DashboardSettingsContainer from './dashboardContainers/dashboardSettings/dashboardSettingsContainer'

import DashboardEditProfileContainer from './dashboardContainers/dashboardEditProfile/dashboardEditProfileContainer'
import DashboardDeleteProfile from './dashboardDeleteProfile/dashboardDeleteProfile'

import NavBarContainer from '../../UI/navBar/navBarContainer'

import './dashboardContainer.css'

class Dashboard extends React.Component{

  componentDidMount(){ document.title = "SmartApp™ | Dashboard" }

  render(){

    let routeBoard

    const navButtons = [
      { name: 'profile', text: 'Profile', route: routes['dashboard_profile'] },
      { name: 'stats', text: 'Stats', route: routes['dashboard_stats'] },
      { name: 'achievements', text: 'Achievements', route: routes['dashboard_achievements'] },
      { name: 'settings', text: 'Settings', route: routes['dashboard_settings'] },
    ]

    if(!this.props.auth.loading) {
      if(this.props.auth.status === 'authValid' || this.props.auth.status === 'fail') {
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
              <DashboardAchievementsContainer history={ this.props.history } />
            </Route>
            <Route exact path={ routes.dashboard_settings }>
              <DashboardSettingsContainer history={ this.props.history } />
            </Route>
          </Switch>
      }
    }

    return(
      <>
        <DashboardDeleteProfile history={ this.props.history } />
        <NavBarContainer buttons={ navButtons } />
        <div className='dashboard_wrapper'>
          { routeBoard }
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    questions: state.questions,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetQuestionTotals: () => dispatch(getQuestionTotals()),
    onUpdateUserQuestions: () => dispatch(updateUserQuestions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)