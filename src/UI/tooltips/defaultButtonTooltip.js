import React from 'react'

import './tooltipStyles/addCommentButtonTooltip.css'
import './tooltipStyles/catButtonTooltip.css'
import './tooltipStyles/completedButtonTooltip.css'
import './tooltipStyles/containerProfileHeaderTooltip.css'
import './tooltipStyles/dashboardFormButtonTooltip.css'
import './tooltipStyles/dashboardStatsViewQuestionButtonTooltip.css'
import './tooltipStyles/defaultButtonTooltip.css'
import './tooltipStyles/diffButtonTooltip.css'
import './tooltipStyles/editCommentButtonTooltip.css'
import './tooltipStyles/gameModesButtonTooltip.css'
import './tooltipStyles/leaderBoardsNavButtonTooltip.css'
import './tooltipStyles/navBarTooltip.css'
import './tooltipStyles/nextQuestionButtonTooltip.css'
import './tooltipStyles/modalButtonTooltip.css'

const DefaultButtonTooltip = (props) => {
  return(
    <div className={ `${props.tooltipClass}_container` }>
      <div className={ `${props.tooltipClass}_wrapper` }>
        <div className={ `${props.tooltipClass}_arrow` }></div>
        <div className={ `${props.tooltipClass}_text` }>
          { props.tooltipText.map((tooltip, index) => { return <span key={ index }>{ tooltip }</span> })}
        </div>
      </div>
    </div>
  )
}

export default DefaultButtonTooltip