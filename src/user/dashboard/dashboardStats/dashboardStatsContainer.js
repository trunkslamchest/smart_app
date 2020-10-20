import React, { useEffect } from 'react'

import DashboardStatsTotal from './dashboardStatsTotal/dashboardStatsTotal'
import DashboardStatsDifficultyContainer from './dashboardStatsDifficulty/dashboardStatsDifficultyContainer'
import DashboardStatsCategoryContainer from './dashboardStatsCategory/dashboardStatsCategoryContainer'
import StatsLegend from '../../../UI/statsLegend/statsLegend'

import './dashboardStats.css'

const DashboardStatsContainer = (props) => {

  useEffect(() => { document.title = "SmartApp™ | Dashboard | Stats" }, [])

  return(
    <div className="stats_wrapper">
      <div className="stats_sub_header">
        <h3>Overall</h3>
      </div>
      <DashboardStatsTotal />
      <h6>Click on a Difficulty or Category to view your stats</h6>
      <DashboardStatsDifficultyContainer />
      <DashboardStatsCategoryContainer />
      <StatsLegend />
    </div>
  )
}

export default DashboardStatsContainer