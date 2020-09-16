import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../../store/actions/actionIndex'

import Modal from '../../../UI/modal/modal'

import DashboardDeleteProfileButtonContainer from './dashboardDeleteProfileButtonContainer'
import DashboardDeleteProfileForm from './dashboardDeleteProfileForm'

import './dashboardDeleteProfile.css'

class DashboardDeleteProfile extends React.Component {

  state = {
    errors: [],
    showForm: false,
    password: ''
  }

  onConfirm = () => { this.setState({ showForm: true }) }
  onCancel = () => { this.props.onDeleteProfileModal(false) }
  onChange = (event) => {this.setState({ [event.target.name]: event.target.value })}

  onSubmitConfirm = (event) => {
    event.preventDefault()
    event.persist()

    if(this.state.password !== '') this.props.onAuthStart('deleteProfile', {email: this.props.user.info.email, password: this.state.password, returnSecureToken: true})

  }

  onSubmitCancel = () => {
    this.setState({ showForm: false })
    this.props.onDeleteProfileModal(false)
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
          onConfirm={ this.onConfirm }
          onCancel={ this.onCancel }
        />
        {
          this.state.showForm &&
          <DashboardDeleteProfileForm
            errors={ this.state.errors }
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
    onDeleteProfileModal: (bool) => (dispatch(actions.deleteProfile(bool))),
    onAuthStart: (type, obj) => dispatch(actions.authStart(type, obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardDeleteProfile)