import React from 'react'

import Backdrop from '../backdrop/backdrop'

import './modal.css'

const Modal = (props) => {

  const modal =
    <>
      <Backdrop
        showModal={ props.showModal }
      />
      <div className='modal_wrapper'>
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
