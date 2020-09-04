import React from 'react'

// import { Route, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

// import { routes } from '../../utility/paths'


class QuickPlayContainer extends React.Component {

  componentDidMount(){

    let questionObj = {
      prop: 'testProp'
    }

    this.props.onGetQuickQuestion(questionObj)
  }


  componentWillUnmount(){
    this.props.onResetGameMode()
  }

  render(){
    return(
      <>
        <h1>quick play template</h1>
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
    play: state.play,
    user: state.user,
    questions: state.questions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onResetGameMode: () => dispatch(actions.resetGameMode()),
    onGetQuickQuestion: (obj) => dispatch(actions.getQuickQuestion(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickPlayContainer)