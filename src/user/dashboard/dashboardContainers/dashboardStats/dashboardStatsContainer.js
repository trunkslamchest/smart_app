import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'

import DashboardHeader from '../../dashboardComponents/dashboardHeader/dashboardHeader'
import DashboardStatsSubContainer from './dashboardStatsSubContainer/dashboardStatsSubContainer'
import UserStatsContainer from '../../../../UI/components/containers/userStatsContainer/userStatsContainer'

import './dashboardStats.css'
import './dashboardStatsResponse.css'

const DashboardStatsContainer = (props) => {

  useEffect(() => { document.title = "SmartApp™ | Dashboard | Stats" }, [])

  const componentClasses = {
    statsContainer: 'dashboard_stats_container',
    noAnswersContainer: 'dashboard_stats_no_answers_container'
  }

  let statsBlock =
    <div className={ componentClasses.noAnswersContainer }>
      <h3>You have not answered any questions yet</h3>
    </div>

  if(!!props.userTotals.all.answered)
    statsBlock =
      <div className={ componentClasses.statsContainer }>
        <UserStatsContainer from_dashboard={ true } />
        <DashboardStatsSubContainer headerText='Difficulties' qSet='difficulty' userTotals={ props.userTotals } />
        <DashboardStatsSubContainer headerText='Categories' qSet='category' userTotals={ props.userTotals } />
      </div>

  return (
    <>
      <DashboardHeader header_text={ 'Statistics' } />
      { statsBlock }
    </>
  )
}

const store = (store) => {
  return {
    userTotals: store.user.questions.totals
  }
}

export default connect(store)(DashboardStatsContainer)