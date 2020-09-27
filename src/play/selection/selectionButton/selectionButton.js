import React from 'react'

import { connect } from 'react-redux'
import { setGameMode, setGameQset } from '../../../store/actions/actionIndex'

import './selectionButton.css'

const SelectionButton = (props) => {

  const onClickGameModeFunctions = (event) => {
    localStorage.gameMode = props.gameMode
    props.onSetGameMode(props.gameMode)
  }

  const onClickQsetFunctions = () => {
    props.onSetGameQset(props.qSet)
  }

  return(
    <button
      key={ props.key }
      value={ props.gameMode || props.qSet }
      className="selection_button"
      name={`${ props.gameMode || props.qSet }_button`}
      onClick={ props.gameMode ? onClickGameModeFunctions : onClickQsetFunctions }
    >
      { props.gameMode ? props.name : props.qSet }
    </button>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetGameMode: (mode) => dispatch(setGameMode(mode)),
    onSetGameQset: (set) => dispatch(setGameQset(set))
  }
}

export default connect(null, mapDispatchToProps)(SelectionButton)