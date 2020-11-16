import React from 'react'
import { connect } from 'react-redux'
import {
  authStart,
  clearAuthErrors,
  deleteProfile
} from '../../../store/actions/actionIndex'

// import BaseDynamicBar from '../../../UI/loading/dynamicBar/baseDynamicBar/baseDynamicBar'
// import SmallLoadingSpinner from '../../../UI/loading/smallLoadingSpinner/smallLoadingSpinner'

import validateDeleteProfile from '../../../utility/validation/validateDeleteProfile'

import ModalHeader from '../../../UI/components/headers/modalHeader/modalHeader'
import Modal from '../../../UI/modal/modal'

import DashboardDeleteProfileForm from './dashboardDeleteProfileForm/dashboardDeleteProfileForm'
import DefaultButtonsContainer from '../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import makeDeleteProfileButtons from '../../userFunctions/makeDeleteProfileButtons'

import glyphIndex from '../../../assets/glyphs/glyphIndex'

import './dashboardDeleteProfile.css'

class DashboardDeleteProfile extends React.Component {

  state = {
    showForm: false,
    password: '',
    form: { valid: true },
    enableConfirmButton: true,
    enableSubmitButton: true,
    enableInput: true
  }

  componentDidUpdate() {
    if(this.state.showForm && this.state.enableConfirmButton) this.setState({ enableConfirmButton: false })
    if(!this.state.showForm && !this.state.enableConfirmButton) this.setState({ enableConfirmButton: true })
    if(this.props.auth.loading && this.state.enableSubmitButton) this.setState({ enableSubmitButton: false, enableInput: false })
    if(!this.props.auth.loading && !this.state.enableSubmitButton) this.setState({ enableSubmitButton: true, enableInput: true })
  }

  onConfirm = () => { this.setState({ showForm: true }) }
  onCancel = () => { this.props.onDeleteProfileModal(false) }
  onChange = (event) => { this.setState({ [event.target.name]: event.target.value }) }

  onSubmitConfirm = (event) => {
    event.preventDefault()
    let authCheck = validateDeleteProfile(this.state.password)
    this.setState({ enableSubmitButton: false, enableInput: false, form: authCheck })
    if(authCheck.valid) if(this.state.enableSubmitButton) this.props.onAuthStart('deleteProfile', { email: this.props.user.info.email, password: this.state.password, returnSecureToken: true })
  }

  onSubmitCancel = () => {
    this.setState({ showForm: false, enableSubmitButton: true, enableInput: true, form: { valid: true } })
    this.props.onClearAuthErrors()
    this.props.onDeleteProfileModal(false)
  }

  render(){

  let deleteProfileButtons = makeDeleteProfileButtons(glyphIndex, this.onConfirm, this.onCancel, this.state.enableConfirmButton)

  // const loading =
  //   <div className='loading_wrapper'>
  //     <SmallLoadingSpinner />
  //     <BaseDynamicBar modalType={ 'auth' } barType={ 'authLogOut' } />
  //   </div>

    return(
      <Modal
        showModal={ this.props.modal.deleteProfile }
      >
        <div className='delete_profile_wrapper'>
          <ModalHeader header_text='Are you sure you want to delete your profile?' />
          {/* { this.props.auth.loading && loading } */}

          { this.state.enableConfirmButton &&
            <DefaultButtonsContainer
              buttons={ deleteProfileButtons }
              buttonClass={ 'modal_button' }
              containerClass={ 'modal_button_container' }
              enableButton={ this.state.enableConfirmButton }
              tooltipClass={ 'modal_button_tooltip' }
            />
          }
          {
            this.state.showForm &&
            <DashboardDeleteProfileForm
              enableButton={ this.state.enableSubmitButton }
              enableInput={ this.state.enableInput }
              form={ this.state.form }
              onChange={ this.onChange }
              onSubmitConfirm={ this.onSubmitConfirm }
              onSubmitCancel={ this.onSubmitCancel }
              password={ this.state.password }
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
    onClearAuthErrors: () => dispatch(clearAuthErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardDeleteProfile)