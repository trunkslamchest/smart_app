import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../store/actions/actionIndex'

import { fetch } from '../utility/paths'

import userFunctions from '../utility/userFunctions'
import questionFunctions from '../utility/questionFunctions'


class DevTest extends React.Component {

  state={
    users: [],
    questions: []
  }

  componentDidMount(){
    userFunctions('get', fetch.get.users )
    .then(res => {
      this.setState({
        users: Object.entries(res)
      })
    })

    questionFunctions('get', fetch.get.questions )
    .then(res => {
      this.setState({
        questions: Object.entries(res)
      })
    })
  }

  render(){

    console.log(this.state)

    return(
      <div>test</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DevTest)