import React from 'react'

import { connect } from 'react-redux'
import { authStart, clearAuthErrors, deleteProfile } from '../../../store/actions/actionIndex'

import validateDeleteProfile from '../../../utility/validation/validateDeleteProfile'

import Modal from '../../../UI/modal/modal'

import DashboardDeleteProfileButtonContainer from './dashboardDeleteProfileButtonContainer/dashboardDeleteProfileButtonContainer'
import DashboardDeleteProfileForm from './dashboardDeleteProfileForm/dashboardDeleteProfileForm'

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
    return(
      <Modal
        showModal={ this.props.modal.deleteProfile }
      >
        <div className='delete_profile_header'>
          <h4>Are you sure you want to delete your profile?</h4>
        </div>
        <DashboardDeleteProfileButtonContainer
          enableConfirmButton={ this.state.enableConfirmButton }
          onConfirm={ this.onConfirm }
          onCancel={ this.onCancel }
        />
        {
          this.state.showForm &&
          <DashboardDeleteProfileForm
            enableSubmitButton={ this.state.enableSubmitButton }
            enableInput={ this.state.enableInput }
            form={ this.state.form }
            onChange={ this.onChange }
            onSubmitConfirm={ this.onSubmitConfirm }
            onSubmitCancel={ this.onSubmitCancel }
            password={ this.state.password }
          />
        }
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