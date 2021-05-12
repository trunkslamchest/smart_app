import React from 'react'

import Modal from '../../modal/modal'
import BaseDynamicBar from '../dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../smallLoadingSpinner/smallLoadingSpinner'

import './loadingModal.css'
import './loadingModalSpinner.css'

const LoadingModal = (props) => {
  return (
    <Modal
      modalClass={ 'loading_modal' }
      showModal={ props.show }
    >
      <div className='loading_modal_wrapper'>
        <SmallLoadingSpinner />
        <BaseDynamicBar modalType={ props.modalType } barType={ props.barType } />
      </div>
    </Modal>
  )
}

export default LoadingModal