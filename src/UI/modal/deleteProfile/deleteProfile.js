import React from 'react'
import { connect } from 'react-redux'
import {
  authStart,
  clearAuthErrors,
  authUpdateStatus,
  deleteProfile
} from '../../../store/actions/actionIndex'

import makeDeleteProfileFormInputs from './deleteProfileFunctions/makeDeleteProfileFormInputs'
import makeDeleteProfileButtons from './deleteProfileFunctions/makeDeleteProfileButtons'
import makeDeleteProfileFormButtons from './deleteProfileFunctions/makeDeleteProfileFormButtons'

import validateDeleteProfile from '../../../utility/validation/validateDeleteProfile'

import BaseDynamicBar from '../../loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../loading/smallLoadingSpinner/smallLoadingSpinner'

import ModalHeaderCentered from '../../components/headers/modalHeaderCentered/modalHeaderCentered'
import Modal from '../../modal/modal'
import DefaultForm from '../../forms/defaultForm'
import DefaultButtonsContainer from '../../buttons/defaultButtonsContainer/defaultButtonsContainer'

import glyphIndex from '../../../assets/glyphs/glyphIndex'

import './deleteProfile.css'
import './deleteProfileResponse.css'

class DeleteProfile extends React.Component {

  state = {
    enableConfirmButton: true,
    enableSubmitButton: true,
    enableInput: true,
    errors: {},
    form: { valid: false, pending: false },
    password: '',
    showForm: false,
    validationLoading: false
  }

  componentDidUpdate() {
    if(this.props.authStatus === 'fail' && !!this.props.authErrors.length && !Object.values(this.state.errors).length){
      let password = []
      this.props.authErrors.forEach(error => password.push(error) )
      this.setState({ errors: { password: password }, validationLoading: false, enableSubmitButton: true, enableInput: true })
      this.props.onAuthUpdateStatus('authValid')
    }
  }

  onConfirm = () => { this.setState({ showForm: true, enableConfirmButton: false }) }
  onCancel = () => { this.props.onDeleteProfileModal(false) }
  onChange = (event) => { this.setState({ [event.target.id]: event.target.value }) }

  onSubmitConfirm = (event) => {
    event.preventDefault()
    if(!!this.props.authErrors.length) this.props.onClearAuthErrors()
    this.setState({ errors: {}, form: { valid: false, pending: true }, validationLoading: true, enableSubmitButton: false, enableInput: false })
    let authCheck = validateDeleteProfile(this.state.password)
    this.setState({ form: authCheck })
    if(authCheck.valid) this.onValidateDeleteProfile()
    else {
      this.setState({
        validationLoading: false,
        enableSubmitButton: true,
        enableInput: true
      })
    }
  }

  onValidateDeleteProfile = () => {
    if(!this.state.form.pending) {
      this.props.onAuthStart('deleteProfile', {
        id: this.props.authId,
        email: this.props.userEmail,
        password: this.state.password
      })
    }
  }

  onSubmitCancel = () => {
    this.setState({ showForm: false, validationLoading: false, enableSubmitButton: true, enableInput: true, form: { valid: true } })
    this.props.onClearAuthErrors()
    this.props.onDeleteProfileModal(false)
  }

  render(){

    const loading =
      <div className='loading_wrapper'>
        <SmallLoadingSpinner />
        <BaseDynamicBar modalType={ 'auth' } barType={ 'deleteProfile' } />
      </div>

    const deleteProfileButtons = makeDeleteProfileButtons(glyphIndex, this.onConfirm, this.onCancel)
    const deleteProfileFormInputs = makeDeleteProfileFormInputs(this.onChange, this.state.password)
    const deleteProfileFormButtons = makeDeleteProfileFormButtons(glyphIndex, this.onSubmitConfirm, this.onSubmitCancel)

    return(
      <Modal
        modalClass={ 'delete_profile_modal' }
        showModal={ this.props.modalDeleteProfile }
      >
        <div className='delete_profile_wrapper'>
          <ModalHeaderCentered header_text='Are you sure you want to delete your profile?' />
          { (this.props.authLoading || this.state.validationLoading) && loading }
          { this.state.enableConfirmButton &&
            <DefaultButtonsContainer
              buttons={ deleteProfileButtons }
              buttonRow={ true }
              enableButton={ this.state.enableConfirmButton }
              tooltipClass={ 'modal_button_tooltip' }
            />
          }
          {
            this.state.showForm &&
              <DefaultForm
                buttonRow={ true }
                inputFields={ deleteProfileFormInputs }
                inputContainerClass={ 'delete_profile_input_container' }
                formButtons={ deleteProfileFormButtons }
                formClass={ 'delete_profile_form' }
                formId={ 'delete_profile_form' }
                formName={ 'deleteProfileForm' }
                formSubHeaderText={ 'Please enter your password to confirm the deletion of your profile' }
                enableButton={ this.state.enableSubmitButton }
                enableInput={ this.state.enableInput }
                errors={ this.state.errors }
                formValid={ this.state.form }
              />
          }
        </div>
      </Modal>
    )
  }
}

const store = (store) => {
  return {
    authErrors: store.auth.errors,
    authId: store.auth.id,
    authLoading: store.auth.loading,
    authStatus: store.auth.status,
    userEmail: store.user.info ? store.user.info.email : null,
    modalDeleteProfile: store.modal.deleteProfile
  }
}

const dispatch = (dispatch) => {
  return {
    onDeleteProfileModal: (bool) => (dispatch(deleteProfile(bool))),
    onAuthStart: (type, obj) => dispatch(authStart(type, obj)),
    onAuthUpdateStatus: (status, loading) => dispatch(authUpdateStatus(status, loading)),
    onClearAuthErrors: () => dispatch(clearAuthErrors())
  }
}

export default connect(store, dispatch)(DeleteProfile)