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
    modal: store.modal
  }
}

export default connect(store)(React.memo(Backdrop, (prevProps, nextProps) => {
  let render = true
  if(prevProps.showModal === nextProps.showModal) render = false
  return render
}))