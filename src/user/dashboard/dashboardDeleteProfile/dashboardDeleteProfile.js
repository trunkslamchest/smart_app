import React from 'react'

import { connect } from 'react-redux'
import { authStart, clearAuthErrors, deleteProfile } from '../../../store/actions/actionIndex'

import Modal from '../../../UI/modal/modal'

import DashboardDeleteProfileButtonContainer from './dashboardDeleteProfileButtonContainer/dashboardDeleteProfileButtonContainer'
import DashboardDeleteProfileForm from './dashboardDeleteProfileForm/dashboardDeleteProfileForm'

import './dashboardDeleteProfile.css'

class DashboardDeleteProfile extends React.Component {

  state = {
    showForm: false,
    password: '',
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
    event.persist()

    this.setState({ enableSubmitButton: false, enableInput: false })

    if(this.state.enableSubmitButton) {
      if(this.state.password !== '') this.props.onAuthStart('deleteProfile', {email: this.props.user.info.email, password: this.state.password, returnSecureToken: true})
    }
  }

  onSubmitCancel = () => {
    this.setState({ enableSubmitButton: false, enableInput: false })
    this.setState({ showForm: false })
    this.props.onDeleteProfileModal(false)
    this.props.onClearAuthErrors()
  }

  render(){
    return(
      <Modal
        showModal={ this.props.modal.deleteProfile }
      >
        <div className='alt_header'>
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