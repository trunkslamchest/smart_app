import React from 'react'
import { connect } from 'react-redux'
import {
  help
} from '../store/actions/actionIndex'

import ModalHeader from '../UI/components/headers/modalHeader/modalHeader'
import Modal from '../UI/modal/modal'

import './help.css'

class Help extends React.Component {

  // state = { hover: false }
  // onHover = (props) => { this.setState({ hover: true }) }
  // offHover = (props) => { this.setState({ hover: false }) }

  onHideModal = () => { this.props.onHelpModal(false) }

  render(){
    return (
        <Modal
          modalClass={ 'help_modal' }
          onHideModal={ this.onHideModal }
          showModal={ this.props.modal.help }
        >
        <div
          className='help_wrapper'
          // onMouseEnter={ this.onHover }
          // onMouseLeave={ this.offHover }
        >
          <ModalHeader header_text='Help' />
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
    onHelpModal: (bool) => dispatch(help(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Help)