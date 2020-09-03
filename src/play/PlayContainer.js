import React from 'react'

import { Route, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
// import * as actionTypes from '../store/actions/actionTypes'

import { routes } from '../utility/paths'

import QuickPlayContainer from './quickPlay/quickPlayContainer'
import ByDifficultyContainer from './byDifficulty/byDifficultyContainer'
import ByCategoryContainer from './byCategory/byCategoryContainer'


class PlayContainer extends React.Component {

  render(){
    return(
      <>
        <Switch>
          <Route path={ routes.quick_play }>
            <QuickPlayContainer />
          </Route>
          <Route path={ routes.by_diff }>
            <ByDifficultyContainer />
          </Route>
          <Route path={ routes.by_cat }>
            <ByCategoryContainer />
          </Route>
        </Switch>
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayContainer)