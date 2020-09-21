import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../../store/actions/actionIndex'

import Modal from '../../modal/modal'

import BaseDynamicBar from '../dynamicBar/baseDynamicBar/baseDynamicBar'

import './loadingModal.css'
import './loadingModalSpinner.css'


class LoadingModal extends React.Component {

  state = {

  }

  componentDidMount(){
    this.props.onLoadingModal(true)
  }

  render(){

    return (
        <Modal
          showModal={ this.props.modal.loading }
        >
        <div className='loading_modal_wrapper'>
          <div className="spinner_container">
            <div className="spinner_animation_container">
              <div className="roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
          </div>
          <BaseDynamicBar barType={ this.props.barType } />
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    modal: state.modal,
    user: state.user,
    question: state.question
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadingModal: (bool) => dispatch(actions.loading(bool)),
    // onAuthStart: (type, obj) => dispatch(actions.authStart(type, obj)),
    // onClearAuthErrors: () => dispatch(actions.clearAuthErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingModal)