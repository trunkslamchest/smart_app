import React from 'react'

import trend_arrow_up from '../../assets/trends/trend_arrow_up.png'
import trend_arrow_down from '../../assets/trends/trend_arrow_down.png'

import './statsLegend.css'

const StatsLegend = () => {

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
    <div className="stats_legend_container">
      <span>{ arrow_up } = Better than global user average { arrow_down } = Worse than global user average</span>
      <span>SmartApp™ Rating is calculated by (((1 + QDR + ((10 - time) / 10)) / 3)) * 10</span>
      <span>SmartApp™ Rank is weighed on a scale from 0.25 to 1.0, with rank improvements ratioed to every 0.5 increase.</span>
    </div>
  )
}

export default StatsLegend