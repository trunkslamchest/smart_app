import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { basic } from '../../../store/actions/actionIndex'

import Modal from '../modal'

import './basicModal.css'

const BasicModal = (props) => {

  useEffect(() => {
    let hideModalTimeout = setTimeout(() => { props.onBasicModal(false) }, 3000)

    return () => {
      clearTimeout(hideModalTimeout)
      props.switchbasicModalContent(null)
    }
  }, [props])

    return(
      <Modal
        modalClass={ 'basic_modal' }
        showModal={ props.modal.basic }
      >
        <div className='basic_modal_wrapper'>
          <span>{ props.content }</span>
        </div>
      </Modal>
    )
}

const store = (store) => {
  return {
    modal: store.modal
  }
}

const dispatch = (dispatch) => {
  return {
    onBasicModal: (bool) => dispatch(basic(bool))
  }
}

export default connect(store, dispatch)(BasicModal)