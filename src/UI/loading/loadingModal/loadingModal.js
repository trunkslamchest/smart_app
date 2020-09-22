import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../../store/actions/actionIndex'

import Modal from '../../modal/modal'
import BaseDynamicBar from '../dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../smallLoadingSpinner/smallLoadingSpinner'

import './loadingModal.css'
import './loadingModalSpinner.css'

class LoadingModal extends React.Component {

  componentWillUnmount(){
    this.props.onLoadingModal(false)
  }

  render(){
    return (
      <Modal showModal={ this.props.show }>
        <div className='loading_modal_wrapper'>
          <SmallLoadingSpinner />
          <BaseDynamicBar modalType={ this.props.modalType } barType={ this.props.barType } />
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadingModal: (bool) => dispatch(actions.loading(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingModal)