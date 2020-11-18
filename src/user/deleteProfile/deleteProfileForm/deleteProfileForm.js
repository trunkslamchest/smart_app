import React from 'react'
import { connect } from 'react-redux'

import makeDeleteProfileFormButtons from '../../userFunctions/makeDeleteProfileFormButtons'

import DeleteProfileFormInput from './deleteProfileFormInput/deleteProfileFormInput'
import DeleteProfileFormErrorItem from './deleteProfileFormErrorItem/deleteProfileFormErrorItem'

import ModalSubHeader from '../../../UI/components/subHeaders/modalSubHeader/modalSubHeader'
import DefaultButtonsContainer from '../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import BaseDynamicBar from '../../../UI/loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../../UI/loading/smallLoadingSpinner/smallLoadingSpinner'

import glyphIndex from '../../../assets/glyphs/glyphIndex'

import './deleteProfileForm.css'

const DeleteProfileForm = (props) => {

  let distribPasswordErrors,
      distribAuthErrors


  const loading =
    <div className='loading_wrapper'>
      <SmallLoadingSpinner />
      <BaseDynamicBar modalType={ 'auth' } barType={ 'authDeleteUser' } />
    </div>

  if(props.auth.status === 'fail'){
    distribAuthErrors = props.auth.errors.map(error => {
      return <DeleteProfileFormErrorItem
        key={ props.auth.errors.indexOf(error) }
        error={ error }
      />
    })
  }

  if(!props.form.valid && props.form.password.errors) {
    distribPasswordErrors = props.form.password.errors.map(error => {
      return <DeleteProfileFormErrorItem
        key={ props.form.password.errors.indexOf(error) }
        error={ error }
      />
    })
  }

  let deleteProfileFormButtons = makeDeleteProfileFormButtons(glyphIndex, props.onSubmitConfirm, props.onSubmitCancel)

  return(
    <>
      <ModalSubHeader sub_header_text='Please enter your password to confirm the deletion of your profile' />
      <form
        id='delete_profile_form'
        name='delete_profile_form'
        className='delete_profile_form'
      >
        <div className='delete_profile_div'>
          <DeleteProfileFormInput
            disabled={ !props.enableInput }
            id='password'
            label='Password'
            name='password'
            onChange={ props.onChange }
            type='password'
            value={ props.password }
          />
          { !props.form.valid && props.form.password.errors.length && <div className='delete_profile_error_container'>{ distribPasswordErrors }</div> }
          { props.auth.status === 'fail' && props.auth.errors.length && <div className='log_in_error_container'>{ distribAuthErrors }</div> }
        </div>
        { props.auth.loading && loading }
          <DefaultButtonsContainer
            buttons={ deleteProfileFormButtons }
            buttonClass={ 'modal_button' }
            containerClass={ 'modal_button_container' }
            enableButton={ props.enableButton }
            tooltipClass={ 'modal_button_tooltip' }
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

export default connect(mapStateToProps)(DeleteProfileForm)