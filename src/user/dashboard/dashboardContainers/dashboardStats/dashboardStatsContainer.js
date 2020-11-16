import React, { useEffect } from 'react'

import DashboardHeader from '../../dashboardComponents/dashboardHeader/dashboardHeader'
import DashboardStatsDifficultyContainer from './dashboardStatsDifficulty/dashboardStatsDifficultyContainer'
import DashboardStatsCategoryContainer from './dashboardStatsCategory/dashboardStatsCategoryContainer'
import StatsLegend from '../../../../UI/statsLegend/statsLegend'

import UserStatsContainer from '../../../../UI/components/containers/userStatsContainer/userStatsContainer'

import './dashboardStats.css'

const DashboardStatsContainer = (props) => {

  useEffect(() => { document.title = "SmartApp™ | Dashboard | Stats" }, [])

  return(
    <div className='dashboard_stats_container'>
      <DashboardHeader header_text={ 'Overall' } />
      <UserStatsContainer
        from_dashboard={ true }
        question_totals={ props.question_totals }
        user_questions={ props.user_questions }
        user_experience={ props.user_experience }
        history={ props.history }
      />
      <h6>Click on a Difficulty or Category to view your answers</h6>
      <DashboardStatsDifficultyContainer history={ props.history } />
      <DashboardStatsCategoryContainer history={ props.history } />
      <StatsLegend />
    </div>
  )
}

export default DashboardStatsContainer