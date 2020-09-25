import React from 'react'

import { connect } from 'react-redux'

import DashboardDeleteProfileFormButtonContainer from './dashboardDeleteProfileFormButtonContainer/dashboardDeleteProfileFormButtonContainer'
import DashboardDeleteProfileFormInput from './dashboardDeleteProfileFormInput/dashboardDeleteProfileFormInput'
import DashboardDeleteProfileFormErrorItem from './dashboardDeleteProfileFormErrorItem/dashboardDeleteProfileFormErrorItem'


import BaseDynamicBar from '../../../../UI/loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../../../UI/loading/smallLoadingSpinner/smallLoadingSpinner'

import './dashboardDeleteProfileForm.css'

const DashboardDeleteProfileForm = (props) => {

  let distribPasswordErrors

  const loading =
    <div className='loading_wrapper'>
      <SmallLoadingSpinner />
      <BaseDynamicBar modalType={ 'auth' } barType={ 'authDeleteUser' } />
    </div>

  if(!props.form.valid) {
    if(props.form.password.errors){
      distribPasswordErrors = props.form.password.errors.map(error => {
        return <DashboardDeleteProfileFormErrorItem
          key={ props.form.password.errors.indexOf(error) }
          error={ error }
        />
      })
    }
  }

  return(
    <>
      <div className='delete_profile_sub_header'>
        <h5>Please enter your password to confirm the deletion of your profile</h5>
      </div>
      <form
        id='delete_profile_form'
        name='delete_profile_form'
        className='delete_profile_form'
      >
        <div className='delete_profile_div'>
          <DashboardDeleteProfileFormInput
            disabled={ !props.enableInput }
            id='password'
            label='Password'
            name='password'
            onChange={ props.onChange }
            type='password'
            value={ props.password }
          />
          { !props.form.valid && props.form.password.errors.length ? <div className='delete_profile_error_container'>{ distribPasswordErrors }</div> : <br /> }
        </div>
        { props.auth.loading && loading }
        <DashboardDeleteProfileFormButtonContainer
          enableSubmitButton={ props.enableSubmitButton }
          onSubmitConfirm={ props.onSubmitConfirm }
          onSubmitCancel={ props.onSubmitCancel }
        />
      </form>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(DashboardDeleteProfileForm)