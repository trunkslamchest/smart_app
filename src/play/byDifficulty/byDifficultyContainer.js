import React from 'react'

// import { Route, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
// import * as actionTypes from '../../store/actions/actionTypes'

// import { routes } from '../../utility/paths'


class ByDifficultyContainer extends React.Component {

  render(){
    return(
      <>
        <h1>by difficulty template</h1>
        {/* <Switch>
          <Route path={ routes.quick_play }>

          </Route>
          <Route path={ routes.by_diff }>

          </Route>

          <Route path={ routes.by_cat }>

          </Route>
        </Switch> */}
      </>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    questions: state.questions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ByDifficultyContainer)