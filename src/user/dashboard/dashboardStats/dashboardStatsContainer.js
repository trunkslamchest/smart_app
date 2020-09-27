import React, { useEffect } from 'react'

import DashboardStatsTotal from './dashboardStatsTotal/dashboardStatsTotal'
import DashboardStatsDifficultyContainer from './dashboardStatsDifficulty/dashboardStatsDifficultyContainer'
import DashboardStatsCategoryContainer from './dashboardStatsCategory/dashboardStatsCategoryContainer'

import './dashboardStats.css'

const DashboardStatsContainer = (props) => {

  useEffect(() => { document.title = "SmartApp™ | Dashboard | Stats" }, [])

  return(
    <div className={ "stats_wrapper"}>
      <DashboardStatsTotal />
      <DashboardStatsDifficultyContainer />
      <DashboardStatsCategoryContainer />
    </div>
  )
}

export default DashboardStatsContainer