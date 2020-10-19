import React from 'react'

import { Route, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import { getQuestionTotals, updateUserQuestions } from '../../store/actions/actionIndex'

import { routes } from '../../utility/paths.js'

import DashboardNavBarContainer from './dashboardNavBar/dashboardNavBarContainer'
import DashboardIndex from './dashboardIndex/dashboardIndex'
import DashboardProfileContainer from './dashboardProfile/dashboardProfileContainer'
import DashboardStatsContainer from './dashboardStats/dashboardStatsContainer'
import DashboardAchievementsContainer from './dashboardAchievements/dashboardAchievementsContainer'
import DashboardSettingsContainer from './dashboardSettings/dashboardSettingsContainer'

import DashboardEditProfileContainer from './dashboardEditProfile/dashboardEditProfileContainer'
import DashboardDeleteProfile from './dashboardDeleteProfile/dashboardDeleteProfile'

import './dashboardContainer.css'

class Dashboard extends React.Component{

  componentDidMount(){ document.title = "SmartApp™ | Dashboard" }

  render(){

    let routeBoard = <></>

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
              <DashboardStatsContainer history={ this.props.history } />
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
        <div className='dashboard_wrapper'>
          <DashboardNavBarContainer />
          { routeBoard }
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
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