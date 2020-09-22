import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../../store/actions/actionIndex'

import Modal from '../../modal/modal'
import BaseDynamicBar from '../dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../smallLoadingSpinner/smallLoadingSpinner'


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
          <SmallLoadingSpinner />
          <BaseDynamicBar barType={ this.props.barType } />
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