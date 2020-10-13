import React from 'react'

import trend_arrow_up from '../../../../assets/trends/trend_arrow_up.png'
import trend_arrow_down from '../../../../assets/trends/trend_arrow_down.png'

import './dashboardStatsLegend.css'

const DashboardStatsLegend = () => {

  const arrow_up =
    <img
      alt='Higher than global average'
      className='trend_arrow_legend'
      src={ trend_arrow_up }
    />

  const arrow_down =
    <img
      alt='Lower than global average'
      className='trend_arrow_legend'
      src={ trend_arrow_down }
    />

  return (
    <div className="dashboard_stats_legend_container">
      <span>{ arrow_up } = Higher than global user average { arrow_down } = Lower than global user average</span>
      <span><span>SmartApp™ Rating</span> = (((1 + QDR + (10 - time) / 10) / 3)) * 10</span>
      <span><span>SmartApp™ Rank</span> is weighed on a scale from 0.25 to 1.0, with rank improvements ratioed to every 0.5 increase.</span>
    </div>
  )
}

export default DashboardStatsLegend