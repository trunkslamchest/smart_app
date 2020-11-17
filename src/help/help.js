import React from 'react'
import { connect } from 'react-redux'
import {
  help
} from '../store/actions/actionIndex'

import makeHelpButton from './helpFunctions/makeHelpButton'

import ModalHeader from '../UI/components/headers/modalHeader/modalHeader'
import Modal from '../UI/modal/modal'
// import DocsHeader from '../UI/docs/headers/docsHeader/docsHeader'
import DocsSubHeader from '../UI/docs/headers/docsSubHeader/docsSubHeader'
import DocsP from '../UI/docs/body_text/docsP/docsP'
import DocsUL from '../UI/docs/body_text/docsUL/docsUL'
import DefaultButtonsContainer from '../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import glyphIndex from '../assets/glyphs/glyphIndex'

import './help.css'

class Help extends React.Component {

  onHideModal = () => { this.props.onHelpModal(false) }

  render(){

    let distribHelpSections

    if(!!this.props.helpSections) {
      distribHelpSections = this.props.helpSections.map((section, s_index) => {
        return(
          <div className='docs_sub_wrapper' key={ s_index } >
            { !!section.sub_header_text && <DocsSubHeader sub_header_text={ section.sub_header_text } /> }
            { !!section.p_texts && section.p_texts.map((p_text, p_index) => { return <DocsP key={ p_index } header={ p_text.header } texts={ p_text.texts } /> }) }
            { !!section.lists && section.lists.map((list, l_index) => { return <DocsUL key={ l_index } list_header={ list.list_header } list_items={ list.list_items } /> }) }
          </div>
        )
      })
    }

    const helpButtons = makeHelpButton(glyphIndex, this.onHideModal)

    return (
        <Modal
          modalClass={ 'help_modal' }
          // onHideModal={ this.onHideModal }
          showModal={ this.props.modal.help }
        >
        <ModalHeader header_text={ this.props.headerText } />
        <div
          className='help_wrapper'
        >
          { distribHelpSections }
        </div>
          <DefaultButtonsContainer
            buttons={ helpButtons }
            buttonClass={ 'modal_help_button' }
            containerClass={ 'modal_help_button_container' }
            enableButton={ true }
          />
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