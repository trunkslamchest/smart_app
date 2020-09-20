import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import LogInFormInput from './logInFormInput/logInFormInput'
import LogInFormButtonContainer from './logInFormButtonContainer/logInFormButtonContainer'

import ErrorContainer from '../../../error/errorContainer'

class LogInForm extends React.Component {

  // state = {
  //   errors = []
  // }


  render() {

    const distribErrors = this.props.auth.errors.map(error => {
      return <ErrorContainer
        key={ this.props.auth.errors.indexOf(error) }
        error={ error }
      />
    })
    console.log(this.props)

    return(
      <>
        <div className='alt_header'>
          <h3>Log In</h3>
        </div>
        <form
          id='log_in_form'
          name='log_in_form'
          className='log_in_form'
        >
          <div className='log_in_div'>
            <LogInFormInput
              type='text'
              label='Email'
              id='email'
              name='email'
              disabled={ !this.props.enableInput }
              onChange={ this.props.onChange }
              value={ this.props.email }
            />
            <br />
            <LogInFormInput
              type='password'
              label='Password'
              id='password'
              name='password'
              disabled={ !this.props.enableInput }
              onChange={ this.props.onChange }
              value={ this.props.password }
            />
          </div>
          { distribErrors }
          <LogInFormButtonContainer
            enableButton={ this.props.enableButton }
            onSubmit={ this.props.onSubmit }
            onCancel={ this.props.onCancel }
          />
        </form>
      </>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    modal: state.modal,
    user: state.user,
    question: state.question
  }
}

export default connect(mapStateToProps)(LogInForm)