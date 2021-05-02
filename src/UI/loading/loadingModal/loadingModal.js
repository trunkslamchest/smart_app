import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../../store/actions/actionIndex'

import Modal from '../../modal/modal'
import BaseDynamicBar from '../dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../smallLoadingSpinner/smallLoadingSpinner'

import './loadingModal.css'
import './loadingModalSpinner.css'

class LoadingModal extends React.Component {

  // shouldComponentUpdate(nextProps, nextState){
  //   if(!nextProps.modal.loading) return true
  //   else return false
  // }

  // componentWillUnmount(){ this.props.onLoadingModal(false) }

  render(){

    // console.log(this.props)

    return (
      <Modal
        modalClass={ 'loading_modal' }
        showModal={ this.props.show }
      >
        <div className='loading_modal_wrapper'>
          <SmallLoadingSpinner />
          <BaseDynamicBar modalType={ this.props.modalType } barType={ this.props.barType } />
        </div>
      </Modal>
    )
  }
}

const store = (store) => {
  return {
    auth: store.auth,
    modal: store.modal
  }
}

const dispatch = (dispatch) => {
  return {
    onLoadingModal: (bool) => dispatch(actions.loading(bool))
  }
}

export default connect(store, dispatch)(LoadingModal)