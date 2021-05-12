import React from 'react'
import { connect } from 'react-redux'
import {
  editProfile,
  reAuthWithCreds,
  authStart,
  authUpdateStatus,
  clearAuthStatus,
  clearAuthErrors
} from '../../../store/actions/actionIndex'

import BaseDynamicBar from '../../loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../loading/smallLoadingSpinner/smallLoadingSpinner'

import makeEditProfileFormInputs from './editProfileFunctions/makeEditProfileFormInputs'
import makeEditProfileButtons from './editProfileFunctions/makeEditProfileButtons'

import validateEditProfileModal from '../../../utility/validation/validateEditProfileModal'

import ModalHeaderCentered from '../../components/headers/modalHeaderCentered/modalHeaderCentered'
import Modal from '../../modal/modal'
import DefaultForm from '../../forms/defaultForm'

import glyphIndex from '../../../assets/glyphs/glyphIndex'

import './editProfile.css'

class EditProfile extends React.Component {

  state = {
    enableButton: true,
    enableInput: true,
    errors: {},
    form: { valid: false, pending: false },
    password: '',
    validationLoading: false
  }

  componentDidUpdate() {
    if(this.props.modal.editProfile && this.props.auth.status === 'reAuthWithCredsSuccess'){
      this.props.onEditProfileModal(false)
    }
    if(this.props.auth.status === 'fail' && !!this.props.auth.errors.length && !Object.values(this.state.errors).length){
      let password = []
      this.props.auth.errors.forEach(error => password.push(error) )
      this.setState({ errors: { password: password }, validationLoading: false, enableSubmitButton: true, enableInput: true })
      this.props.onAuthUpdateStatus('authValid', false)
    }
  }

  componentWillUnmount(){ this.clearLocalState() }

  onChange = (event) => { this.setState( { [event.target.id]: event.target.value } ) }

  onSubmit = (event) => {
    event.preventDefault()
    if(!!this.props.auth.errors.length) this.props.onClearAuthErrors()
    this.setState({ errors: {}, form: { valid: false, pending: true }, validationLoading: true, enableSubmitButton: false, enableInput: false })
    let authCheck = validateEditProfileModal(this.state.password)
    this.setState({ form: authCheck })
    if(authCheck.valid) this.onValidateEditProfileModal()
    else {
      this.setState({
        validationLoading: false,
        enableSubmitButton: true,
        enableInput: true
      })
    }
  }

  onValidateEditProfileModal = () => {
    if(!this.state.form.pending) {
      this.props.onAuthStart('editProfileModal', {
        email: this.props.user.info.email,
        password: this.state.password,
      })
    }
  }

  onCancel = () => {
    this.props.onEditProfileModal(false)
    this.props.onClearAuthErrors()
    // this.props.onClearAuthStatus()
  }

  clearLocalState = () => { this.setState({ validationLoading: false, enableButton: true, enableInput: true, errors: {}, form: { valid: false, pending: false }, password: '' }) }

  render(){

    let modalBlock =
      <div className='loading_wrapper'>
        <SmallLoadingSpinner />
        <BaseDynamicBar modalType={ 'auth' } barType={ 'authLogIn' } />
      </div>

    const editProfileFormInputs = makeEditProfileFormInputs(this.onChange, this.state.password)
    const editProfileButtons = makeEditProfileButtons(glyphIndex, this.onSubmit, this.onCancel)

    if(!this.props.modal.loading && !this.props.auth.loading)
      modalBlock =
        <div className='edit_profile_wrapper'>
          <ModalHeaderCentered header_text='Confirm Email Update' />
          <DefaultForm
            buttonRow={ true }
            inputFields={ editProfileFormInputs }
            inputContainerClass={ 'edit_profile_modal_input_container' }
            formButtons={ editProfileButtons }
            formClass={ 'edit_profile_modal_form' }
            formId={ 'edit_profile_form' }
            formName={ 'editProfileForm' }
            formSubHeaderText={ 'Please enter your password to confirm your new email address' }
            enableButton={ this.state.enableButton }
            enableInput={ this.state.enableInput }
            errors={ this.state.errors }
            formValid={ this.state.form }
          />
        </div>

    return (
      <Modal
        modalClass={ 'edit_profile_modal' }
        showModal={ this.props.modal.editProfile }
      >
        { modalBlock }
      </Modal>
    )
  }
}

const store = (store) => {
  return {
    auth: store.auth,
    modal: store.modal,
    user: store.user
  }
}

const dispatch = (dispatch) => {
  return {
    onEditProfileModal: (bool) => dispatch(editProfile(bool)),
    onReAuthWithCreds: (authType, obj) => dispatch(reAuthWithCreds(authType, obj)),
    onAuthStart: (type, obj, props) => dispatch(authStart(type, obj, props)),
    onAuthUpdateStatus: (status, loading) => dispatch(authUpdateStatus(status, loading)),
    onClearAuthStatus: () => dispatch(clearAuthStatus()),
    onClearAuthErrors: () => dispatch(clearAuthErrors())
  }
}

export default connect(store, dispatch)(EditProfile)