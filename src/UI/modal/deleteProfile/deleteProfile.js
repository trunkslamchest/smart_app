import React from 'react'
import { connect } from 'react-redux'
import {
  authStart,
  clearAuthStatus,
  clearAuthErrors,
  deleteProfile
} from '../../../store/actions/actionIndex'

import makeDeleteProfileFormInputs from './deleteProfileFunctions/makeDeleteProfileFormInputs'
import makeDeleteProfileButtons from './deleteProfileFunctions/makeDeleteProfileButtons'
import makeDeleteProfileFormButtons from './deleteProfileFunctions/makeDeleteProfileFormButtons'

import validateDeleteProfile from '../../../utility/validation/validateDeleteProfile'

import BaseDynamicBar from '../../loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../loading/smallLoadingSpinner/smallLoadingSpinner'

import ModalHeader from '../../components/headers/modalHeader/modalHeader'
import Modal from '../../modal/modal'
import DefaultForm from '../../forms/defaultForm'
import DefaultButtonsContainer from '../../buttons/defaultButtonsContainer/defaultButtonsContainer'

import glyphIndex from '../../../assets/glyphs/glyphIndex'

import './deleteProfile.css'

class DeleteProfile extends React.Component {

  state = {
    enableConfirmButton: true,
    enableSubmitButton: true,
    enableInput: true,
    errors: {},
    form: { valid: false, pending: false },
    password: '',
    showForm: false
  }

  componentDidUpdate() {
    if(this.state.showForm && this.state.enableConfirmButton) this.setState({ enableConfirmButton: false })
    if(!this.state.showForm && !this.state.enableConfirmButton) this.setState({ enableConfirmButton: true })
    if(this.props.auth.loading && this.state.enableSubmitButton) this.setState({ enableSubmitButton: false, enableInput: false })
    if(!this.props.auth.loading && (!this.state.enableSubmitButton || !this.state.enableInput)) this.setState({ enableSubmitButton: true, enableInput: true })
    if(this.props.auth.status === 'fail' && !!this.props.auth.errors.length && !Object.values(this.state.errors).length){
      let password = []
      if(this.props.auth.errors[0].code === 422) this.props.auth.errors.forEach(error => password.push(error) )
      this.setState({ errors: { password: password } })
      this.props.onClearAuthStatus()
    }
  }

  onConfirm = () => { this.setState({ showForm: true }) }
  onCancel = () => { this.props.onDeleteProfileModal(false) }
  onChange = (event) => { this.setState({ [event.target.id]: event.target.value }) }

  onSubmitConfirm = (event) => {
    event.preventDefault()
    if(!!this.props.auth.errors.length) this.props.onClearAuthErrors()
    this.setState({ errors: {}, form: { valid: false, pending: true } })
    let authCheck = validateDeleteProfile(this.state.password)
    this.setState({ form: authCheck })
    if(authCheck.valid) this.onValidateDeleteProfile()
  }

  onValidateDeleteProfile = () => {
    if(!this.state.form.pending && this.state.enableSubmitButton) {
      this.props.onAuthStart('deleteProfile', {
        email: this.props.user.info.email,
        password: this.state.password,
        returnSecureToken: true
      })
    }
  }

  onSubmitCancel = () => {
    this.setState({ showForm: false, enableSubmitButton: true, enableInput: true, form: { valid: true } })
    this.props.onClearAuthErrors()
    this.props.onDeleteProfileModal(false)
  }

  render(){

    const loading =
      <div className='loading_wrapper'>
        <SmallLoadingSpinner />
        <BaseDynamicBar modalType={ 'auth' } barType={ 'authLogOut' } />
      </div>

    const deleteProfileButtons = makeDeleteProfileButtons(glyphIndex, this.onConfirm, this.onCancel)
    const deleteProfileFormInputs = makeDeleteProfileFormInputs(this.onChange, this.state.password)
    const deleteProfileFormButtons = makeDeleteProfileFormButtons(glyphIndex, this.onSubmitConfirm, this.onSubmitCancel)

    return(
      <Modal
        modalClass={ 'delete_profile_modal' }
        showModal={ this.props.modal.deleteProfile }
      >
        <div className='delete_profile_wrapper'>
          <ModalHeader header_text='Are you sure you want to delete your profile?' />
          { this.props.auth.loading && loading }

          { this.state.enableConfirmButton &&
            <DefaultButtonsContainer
              buttons={ deleteProfileButtons }
              // buttonClass={ 'modal_button' }
              // containerClass={ 'modal_button_container' }
              enableButton={ this.state.enableConfirmButton }
              tooltipClass={ 'modal_button_tooltip' }
            />
          }
          {
            this.state.showForm &&
              <DefaultForm
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user,
    modal: state.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteProfileModal: (bool) => (dispatch(deleteProfile(bool))),
    onAuthStart: (type, obj) => dispatch(authStart(type, obj)),
    onClearAuthStatus: () => dispatch(clearAuthStatus()),
    onClearAuthErrors: () => dispatch(clearAuthErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProfile)