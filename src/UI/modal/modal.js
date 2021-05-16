import React from 'react'

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

  return(
    <>
      { props.showModal && modal }
    </>
  )
}

export default Modal
