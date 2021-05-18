import React from 'react'
import { connect } from 'react-redux'

import Backdrop from '../backdrop/backdrop'

import './modal.css'

const Modal = (props) => {

  const modal =
    <>
      <Backdrop
        onHideModal={ props.onHideModal }
        showModal={ props.showModal }
      />
      <div className={ props.modalClass }>
        { props.children }
      </div>
    </>

  return props.showModal && modal
}

const store = (store) => {
  return {
    leaderBoards: store.leaderBoards,
    modal: store.modal
  }
}

export default connect(store)(Modal)