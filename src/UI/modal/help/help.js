import React from 'react'
import { connect } from 'react-redux'
import {
  help,
  clearHelpHeader,
  clearHelpSections
} from '../../../store/actions/actionIndex'

import makeHelpButton from './helpFunctions/makeHelpButton'

import ModalHeaderCentered from '../../components/headers/modalHeaderCentered/modalHeaderCentered'
import Modal from '../../modal/modal'

import DocsSubHeader from '../../docs/headers/docsSubHeader/docsSubHeader'
import DocsP from '../../docs/body_text/docsP/docsP'
import DocsUL from '../../docs/body_text/docsUL/docsUL'
import DefaultButtonsContainer from '../../buttons/defaultButtonsContainer/defaultButtonsContainer'

import './help.css'
import './helpResponse.css'

const Help = (props) => {

  const onHideModal = () => {
    props.onHelpModal(false)
    props.onClearHelpHeader()
    props.onClearHelpSections()
  }

  let distribHelpSections

  if(!!props.modalHelpHeader && !!props.modalHelpSections) {
    distribHelpSections = props.modalHelpSections.map((section, s_index) => {
      return(
        <div className='docs_sub_container' key={ s_index }>
          <div className='docs_sub_wrapper'>
            { !!section.sub_header_text && <DocsSubHeader sub_header_text={ section.sub_header_text } /> }
            { !!section.p_texts && section.p_texts.map((p_text, p_index) => { return <DocsP key={ p_index } header={ p_text.header } texts={ p_text.texts } /> }) }
            { !!section.lists && section.lists.map((list, l_index) => { return <DocsUL key={ l_index } list_header={ list.list_header } list_items={ list.list_items } /> }) }
          </div>
          <div className='divider_left' />
        </div>
      )
    })
  }

  const helpButtons = makeHelpButton(onHideModal)

  return (
      <Modal
        modalClass={ 'help_modal' }
        showModal={ props.modalHelp }
      >
      <ModalHeaderCentered header_text={ props.headerText } />
      <div
        className='help_wrapper'
      >
        { distribHelpSections }
      </div>
        <DefaultButtonsContainer
          buttons={ helpButtons }
          buttonClass={ 'modal_help_button' }
          buttonContainerClass={ 'modal_help_button_container' }
          containerClass={ 'modal_help_buttons_container' }

          enableButton={ true }
        />
    </Modal>
  )
}

const store = (store) => {
  return {
    modalHelp: store.modal.help,
    modalHelpHeader: store.modal.helpHeader,
    modalHelpSections: store.modal.helpSections
  }
}

const dispatch = (dispatch) => {
  return {
    onHelpModal: (bool) => dispatch(help(bool)),
    onClearHelpHeader: () => dispatch(clearHelpHeader()),
    onClearHelpSections: () => dispatch(clearHelpSections())
  }
}

export default connect(store, dispatch)(Help)