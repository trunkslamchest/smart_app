import React from 'react'
import { routes } from '../../../utility/paths'
import { connect } from 'react-redux'
import {
  login,
  signup
} from '../../../store/actions/actionIndex'

import HeaderButton2 from '../headerButton2/headerButton2'

const GuestHeader = (props) => {

  const leaderBoardsFunctions = () => {
    props.history.push( routes.leader_boards + '/overall' )
  }

  const logInButtonFunctions = () => {
    props.onLoginModal(true)
  }

  const signUpButtonFunctions = () => {
    props.onSignupModal(true)
  }

  return(
    <div className='header_nav_links'>

      <HeaderButton2
        name='header_leader_boards_button'
        onClick={ leaderBoardsFunctions }
      >
        Leader Boards
      </HeaderButton2>
      <HeaderButton2
        name='header_log_in_button'
        onClick={ logInButtonFunctions }
      >
        Login
      </HeaderButton2>
      <HeaderButton2
        name='header_sign_up_button'
        onClick={ signUpButtonFunctions }
      >
        Sign Up
      </HeaderButton2>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginModal: (bool) => dispatch(login(bool)),
    onSignupModal: (bool) => dispatch(signup(bool))
  }
}

export default connect(null, mapDispatchToProps)(GuestHeader)