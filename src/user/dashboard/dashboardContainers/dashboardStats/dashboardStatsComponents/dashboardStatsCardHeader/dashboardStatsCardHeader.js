import React from 'react'

import './dashboardStatsCardHeader.css'

const DashboardStatsCardHeader = (props) => {
  return(
    <div className="stats_card_header_card_container">
      <div className="stats_card_header_card_wrapper">
        <h4>{ props.header_text }</h4>
        <span>
          { props.span_text }
          { !!props.arrow_img && props.arrow_img }
        </span>
      </div>
    </div>
  )
}

export default DashboardStatsCardHeader