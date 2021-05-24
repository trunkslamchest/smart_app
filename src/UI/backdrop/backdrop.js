import React from 'react'
import { connect } from 'react-redux'

import './backdrop.css'

const Backdrop = (props) => {

  const onClickFunction = () => {
    !!props.onHideModal && props.onHideModal()
  }

  return( props.showModal && <div className='backdrop' onClick={ onClickFunction } /> )
}

const store = (store) => {
  return {
    showModal: store.modal.showModal
  }
}

export default connect(store)(Backdrop)