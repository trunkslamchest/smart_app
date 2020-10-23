import React from 'react'
import { connect } from 'react-redux'

import { routes } from '../../../utility/paths.js'

import ResultsNavBarButton from './resultsNavBarButton/resultsNavBarButton'

import './resultsNavBarContainer.css'

const ResultsNavBarContainer = (props) => {

  let staticRoute

  if(props.staticResults) staticRoute = routes.static_results + '/' + props.diff + '/' + props.cat + '/' + props.qid

  const buttons = [
    { name: 'results', text: 'Results', route: props.staticResults ? staticRoute + '/stats' : routes[props.play.gameMode] + '/results/stats' },
    { name: 'discuss', text: 'Discuss', route: props.staticResults ? staticRoute + '/discuss' : routes[props.play.gameMode] + '/results/discuss' }
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
    <div className='results_navbar_container'>
      { distribButtons }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    play: state.play
  }
}

export default connect(mapStateToProps)(ResultsNavBarContainer)