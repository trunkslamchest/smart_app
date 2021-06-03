import React from 'react'

import './resultsStatsSubCard.css'

const ResultsStatsSubCard = (props) => {
  return(
    <div className={ props.cardClass }>
      <h2>{ props.headerText }</h2>
      <div className={ props.subTextClass }>
        <h5>{ props.subHeaderText }</h5>
        { !!props.trendArrows && props.trendArrows }
      </div>
    </div>
  )
}

export default ResultsStatsSubCard