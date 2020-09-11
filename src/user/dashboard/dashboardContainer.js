import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import { routes } from '../../utility/paths.js'

import { Route, Switch } from 'react-router-dom'

import DashboardNavBarContainer from './dashboardNavBar/dashboardNavBarContainer'
import DashboardIndex from './dashboardIndex/dashboardIndex'
import DashboardProfileContainer from './dashboardProfile/dashboardProfileContainer'
import DashboardStatsContainer from './dashboardStats/dashboardStatsContainer'
import DashboardVotesContainer from './dashboardVotes/dashboardVotesContainer'
import DashboardCommentsContainer from './dashboardComments/dashboardCommentsContainer'
import DashboardTest from './dashboardTest'

import DashboardEditProfileContainer from './dashboardEditProfile/dashboardEditProfileContainer'
import DashboardDeleteProfile from './dashboardDeleteProfile/dashboardDeleteProfile'

import './dashboardContainer.css'

class Dashboard extends React.Component{

  componentDidMount(){
    this.props.onGetQuestionTotals()
    this.props.onUpdateUserQuestions()
  }

  render(){
    const routeBoard =
    <Switch>
      <Route exact path={ routes.dashboard }>
        <DashboardIndex />
      </Route>
      <Route exact path={ routes.dashboard_profile }>
        <DashboardProfileContainer
          history={this.props.history}
        />
      </Route>
      <Route path={ routes.dashboard_profile_edit }>
        <DashboardEditProfileContainer
          history={this.props.history}
        />
      </Route>
      <Route exact path={ routes.dashboard_stats }>
        <DashboardStatsContainer
          history={this.props.history}
        />
      </Route>
      <Route exact path={ routes.dashboard_votes }>
        <DashboardVotesContainer
          history={this.props.history}
        />
      </Route>
      <Route exact path={ routes.dashboard_comments }>
        <DashboardCommentsContainer
          history={this.props.history}
        />
      </Route>
      <Route path={ routes.dashboard_test }>
        <DashboardTest />
      </Route>
    </Switch>

    const loading =
      <div className='loading_container'>
        <div className='loading_animation_container'>
          <div className='lds-roller'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      </div>

    return(
      <>
        <DashboardDeleteProfile history={this.props.history} />
        <div className='dashboard_wrapper'>
          <DashboardNavBarContainer />
          {this.props.auth.loading ? loading : routeBoard }
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