import React from 'react'

import { connect } from 'react-redux'

import DashboardDeleteProfileFormButtonContainer from './dashboardDeleteProfileFormButtonContainer'

import AuthDeleteDynamicBar from '../../../../UI/loading/dynamicBar/authDeleteDynamicBar/authDeleteDynamicBar'

const DashboardDeleteProfileForm = (props) => {
  return(
    <>
      <div className='alt_header'>
        <h5>Please enter your password to confirm the deletion of your profile</h5>
      </div>
      <form
        id='delete_profile_form'
        name='delete_profile_form'
        className='delete_profile_form'
      >
        <div className='delete_profile_form_div'>
        <input
            type='password'
            label='Password'
            id='password'
            name='password'
            onChange={ props.onChange }
            value={ props.password}
          />
        </div>
        { props.auth.loading && <AuthDeleteDynamicBar /> }

        <DashboardDeleteProfileFormButtonContainer
          onSubmitConfirm={ props.onSubmitConfirm }
          onSubmitCancel={ props.onSubmitCancel }
        />
      </form>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    modal: state.modal,
    user: state.user,
    question: state.question
  }
}

export default connect(mapStateToProps)(DashboardDeleteProfileForm)