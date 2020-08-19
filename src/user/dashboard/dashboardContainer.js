import React from 'react'

import { routes } from '../../utility/paths.js'

import { Route, Switch } from 'react-router-dom'


import DashboardNavBarContainer from './dashboardNavBar/dashboardNavBarContainer'
import DashboardIndex from './dashboardIndex/dashboardIndex'
import DashboardProfileContainer from './dashboardProfile/dashboardProfileContainer'

import DashboardTest from './dashboardTest'

import DashboardEditProfile from './dashboardEditProfile/dashboardEditProfile'
import DashboardDeleteProfile from './dashboardDeleteProfile/dashboardDeleteProfile'

import './dashboardContainer.css'

export default class Dashboard extends React.Component{

  state = {mounted: false}

  componentDidMount(){this.setState({ mounted: true })}

  componentDidUpdate(){if (this.state.mounted && this.props.user.id && !this.state.loaded){ this.setState({ loaded: true })}}

  render(){
    const routeBoard =
    <Switch>
      <Route exact path={ routes.dashboard }>
        <DashboardIndex
          firstName={this.props.user.first_name}
        />
      </Route>
      <Route exact path={ routes.dashboard_profile }>
        <DashboardProfileContainer
          history={this.props.history}
          user={this.props.user}
        />
      </Route>
      <Route path={ routes.dashboard_profile_edit }>
        <DashboardEditProfile
          history={this.props.history}
          setUser={this.props.setUser}
          user={this.props.user}
        />
      </Route>
      <Route path={ routes.dashboard_profile_delete }>
        <DashboardDeleteProfile
          access={this.props.user.access}
          history={this.props.history}
          logOut={this.props.logOut}
          user_id={this.props.user.id}
          setToken={this.props.setToken}
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
      <div className='dashboard_wrapper'>
        <DashboardNavBarContainer />
        {this.state.loaded ? routeBoard : loading}
      </div>
    )
  }
}
