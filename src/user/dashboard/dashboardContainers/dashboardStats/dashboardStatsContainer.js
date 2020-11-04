import React, { useEffect } from 'react'

import DashboardHeader from '../../dashboardComponents/dashboardHeader/dashboardHeader'
import DashboardStatsTotal from './dashboardStatsTotal/dashboardStatsTotal'
import DashboardStatsDifficultyContainer from './dashboardStatsDifficulty/dashboardStatsDifficultyContainer'
import DashboardStatsCategoryContainer from './dashboardStatsCategory/dashboardStatsCategoryContainer'
import StatsLegend from '../../../../UI/statsLegend/statsLegend'

import './dashboardStats.css'

const DashboardStatsContainer = (props) => {

  useEffect(() => { document.title = "SmartApp™ | Dashboard | Stats" }, [])

  return(
    <div className='dashboard_stats_container'>
      <DashboardHeader header_text={ 'Overall' } />
      <DashboardStatsTotal />
      <h6>Click on a Difficulty or Category to view your answers</h6>
      <DashboardStatsDifficultyContainer history={ props.history } />
      <DashboardStatsCategoryContainer history={ props.history } />
      <StatsLegend />
    </div>
  )
}

export default DashboardStatsContainer