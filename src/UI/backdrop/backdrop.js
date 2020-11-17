import React from 'react'
import { connect } from 'react-redux'
import {
  help
} from '../../store/actions/actionIndex'


import './backdrop.css'

const Backdrop = (props) => {

  const onClickFunction = () => {
    !!props.onHideModal && props.onHideModal()
  }

  return(
    props.showModal &&
    <div
      className='backdrop'
      onClick={ onClickFunction }
    >
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHelpModal: (bool) => dispatch(help(bool))
  }
}

export default connect(null, mapDispatchToProps)(Backdrop)