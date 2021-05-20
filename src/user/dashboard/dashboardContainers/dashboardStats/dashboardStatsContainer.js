import React from 'react'
import { useEffect } from 'react'

import DashboardHeader from '../../dashboardComponents/dashboardHeader/dashboardHeader'
import DashboardStatsDifficultyContainer from './dashboardStatsDifficulty/dashboardStatsDifficultyContainer'
import DashboardStatsCategoryContainer from './dashboardStatsCategory/dashboardStatsCategoryContainer'

import UserStatsContainer from '../../../../UI/components/containers/userStatsContainer/userStatsContainer'

import './dashboardStats.css'
import './dashboardStatsResponse.css'

const DashboardStatsContainer = (props) => {

  useEffect(() => { document.title = "SmartApp™ | Dashboard | Stats" }, [])

  return(
    <div className='dashboard_stats_container'>
      <DashboardHeader header_text={ 'Statistics' } />
      <UserStatsContainer
        from_dashboard={ true }
        question_totals={ props.question_totals }
        user_questions={ props.user_questions }
        user_experience={ props.user_experience }
      />
      <DashboardStatsDifficultyContainer />
      <div className='divider_medium' />
      <DashboardStatsCategoryContainer />
    </div>
  )
}

export default DashboardStatsContainer