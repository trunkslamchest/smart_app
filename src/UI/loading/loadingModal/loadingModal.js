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
  //   // console.log(nextProps.auth.status)
  //   if(
  //     (this.props.auth.status !== nextProps.auth.status) ||
  //     (this.props.play.status !== nextProps.play.status) ||
  //     (this.props.play.status !== nextProps.play.status) ||
  //     (this.props.play.voteStatus !== nextProps.play.voteStatus) ||
  //     (this.props.play.commentStatus !== nextProps.play.commentStatus) ||
  //     nextProps.auth.status === 'authValid'
  //   ) return true
  //   else return false
  // }


  componentWillUnmount(){ this.props.onLoadingModal(false) }

  render(){
  // console.log(this.props.show)
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    modal: state.modal,
    play: state.play
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadingModal: (bool) => dispatch(actions.loading(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingModal)