import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../../store/actions/actionIndex'

// import { routes } from '../../../utility/paths.js'

import Modal from '../../../UI/modal/modal'
import DashboardDeleteProfileButtonContainer from './dashboardDeleteProfileButtonContainer'

import './dashboardDeleteProfile.css'

const DashboardDeleteProfile = (props) => {

  const onConfirm = () => {
    let id = props.auth.id
    let obj = { uid: id }
    props.onDeleteProfileModal(false)
    props.onDeleteUser(obj, props)
  }

  const onCancel = () => { props.onDeleteProfileModal(false) }

  return(
  <Modal
    showModal={ props.modal.deleteProfile }
  >
    <div className='alt_header'>
      <h3>Are you sure you want to delete your profile?</h3>
    </div>
      <DashboardDeleteProfileButtonContainer
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
  </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteProfileModal: (bool) => (dispatch(actions.deleteProfile(bool))),
    // onDeleteUser: (obj, props) => (dispatch(actions.deleteUser(obj, props)))
    onDeleteUser: (props) => (dispatch(actions.authDelete(props)))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardDeleteProfile)