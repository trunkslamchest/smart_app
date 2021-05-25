import React from 'react'
import { useEffect } from 'react'

import DashboardHeader from '../../dashboardComponents/dashboardHeader/dashboardHeader'
import DashboardStatsSubContainer from './dashboardStatsSubContainer/dashboardStatsSubContainer'
import UserStatsContainer from '../../../../UI/components/containers/userStatsContainer/userStatsContainer'

import './dashboardStats.css'
import './dashboardStatsResponse.css'

const DashboardStatsContainer = () => {

  useEffect(() => { document.title = "SmartApp™ | Dashboard | Stats" }, [])

  return(
    <>
      <DashboardHeader header_text={ 'Statistics' } />
    <div className='dashboard_stats_container'>
      <UserStatsContainer from_dashboard={ true } />
      <DashboardStatsSubContainer qSet='difficulty' headerText='Difficulties' />
      <div className='divider_medium' />
      <DashboardStatsSubContainer qSet='category' headerText='Categories' />
    </div>
    </>
  )
}

export default DashboardStatsContainer