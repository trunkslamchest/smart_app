import React from 'react'
import { connect } from 'react-redux'

import { routes } from '../../../utility/paths.js'

import ResultsNavBarButton from './resultsNavBarButton/resultsNavBarButton'

import './resultsNavBarContainer.css'

const ResultsNavBarContainer = (props) => {

  const buttons = [
    { name: 'results', text: 'Results', route: routes[props.play.gameMode] + '/results/stats' },
    { name: 'discuss', text: 'Discuss', route: routes[props.play.gameMode] + '/results/discuss' }
  ]

  const distribButtons = buttons.map(button =>
    <ResultsNavBarButton
      key={ buttons.indexOf(button) }
      link={ button.route }
      name={`results_${button.name}_button`}
    >
      { button.text }
    </ResultsNavBarButton>
  )

  return(
    <div className='results_navbar'>
      <ul>
        { distribButtons }
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    play: state.play
  }
}

export default connect(mapStateToProps)(ResultsNavBarContainer)