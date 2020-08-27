import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../../store/actions/actionIndex'

import { routes } from '../../../utility/paths.js'

import DashboardProfileButton from './dashboardProfileButton'

import './dashboardProfileButtonContainer.css'

const DashboardProfileButtonContainer = (props) => {

  const onClickEdit = () => {
    props.history.push(routes.dashboard_profile_edit)
  }

  const onClickDelete = () => {
    props.onDeleteProfileModal(true)
  }

  return(
    <div className='dashboard_profile_buttons_container'>
      <DashboardProfileButton
        type='button'
        id='delete_profile_button'
        name='edit_profile_button'
        onClick={onClickEdit}
      >
        Edit Profile
      </DashboardProfileButton>
      <DashboardProfileButton
        type='button'
        id='delete_profile_button'
        name='delete_profile_button'
        onClick={onClickDelete}
      >
        Delete Profile
      </DashboardProfileButton>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    modal: state.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteProfileModal: (bool) => (dispatch(actions.deleteProfile(bool)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardProfileButtonContainer)
