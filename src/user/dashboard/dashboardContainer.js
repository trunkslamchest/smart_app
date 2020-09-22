import React from 'react'

import { Route, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import { routes } from '../../utility/paths.js'

import DashboardNavBarContainer from './dashboardNavBar/dashboardNavBarContainer'
import DashboardIndex from './dashboardIndex/dashboardIndex'
import DashboardProfileContainer from './dashboardProfile/dashboardProfileContainer'
import DashboardStatsContainer from './dashboardStats/dashboardStatsContainer'
import DashboardVotesContainer from './dashboardVotes/dashboardVotesContainer'
import DashboardCommentsContainer from './dashboardComments/dashboardCommentsContainer'

import DashboardEditProfileContainer from './dashboardEditProfile/dashboardEditProfileContainer'
import DashboardDeleteProfile from './dashboardDeleteProfile/dashboardDeleteProfile'

import './dashboardContainer.css'

class Dashboard extends React.Component{

  componentDidMount(){
    document.title = "SmartApp™ | Dashboard "
  }

  render(){

    let routeBoard = <></>

    if(this.props.auth.status === 'authValid') {
      routeBoard =
      <>
        <DashboardNavBarContainer />
        <Switch>
          <Route exact path={ routes.dashboard }>
            <DashboardIndex />
          </Route>
          <Route exact path={ routes.dashboard_profile }>
            <DashboardProfileContainer history={this.props.history} />
          </Route>
          <Route path={ routes.dashboard_profile_edit }>
            <DashboardEditProfileContainer history={this.props.history} />
          </Route>
          <Route exact path={ routes.dashboard_stats }>
            <DashboardStatsContainer history={this.props.history} />
          </Route>
          <Route exact path={ routes.dashboard_votes }>
            <DashboardVotesContainer history={this.props.history} />
          </Route>
          <Route exact path={ routes.dashboard_comments }>
            <DashboardCommentsContainer history={this.props.history} />
          </Route>
        </Switch>
      </>
    }

    return(
      <>
        <DashboardDeleteProfile history={this.props.history} />
        <div className='dashboard_wrapper'>
          { routeBoard }
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user,
    questions: state.questions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetQuestionTotals: () => dispatch(actions.getQuestionTotals()),
    onUpdateUserQuestions: () => dispatch(actions.updateUserQuestions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)