import React from 'react'
import { connect } from 'react-redux'
import {
  help,
  clearHelpHeader,
  clearHelpSections
} from '../../../store/actions/actionIndex'

import makeHelpButton from './helpFunctions/makeHelpButton'

import ModalHeader from '../../components/headers/modalHeader/modalHeader'
import Modal from '../../modal/modal'

// import DocsHeader from '../../docs/headers/docsHeader/docsHeader'
import DocsSubHeader from '../../docs/headers/docsSubHeader/docsSubHeader'
import DocsP from '../../docs/body_text/docsP/docsP'
import DocsUL from '../../docs/body_text/docsUL/docsUL'
import DefaultButtonsContainer from '../../buttons/defaultButtonsContainer/defaultButtonsContainer'

import glyphIndex from '../../../assets/glyphs/glyphIndex'

import './help.css'

class Help extends React.Component {

  onHideModal = () => {
    this.props.onHelpModal(false)
    this.props.onClearHelpHeader()
    this.props.onClearHelpSections()
  }

  render(){

    let distribHelpSections

    if(!!this.props.modal.helpHeader && !!this.props.modal.helpSections) {
      distribHelpSections = this.props.modal.helpSections.map((section, s_index) => {
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
    onHelpModal: (bool) => dispatch(help(bool)),
    onClearHelpHeader: () => dispatch(clearHelpHeader()),
    onClearHelpSections: () => dispatch(clearHelpSections())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Help)