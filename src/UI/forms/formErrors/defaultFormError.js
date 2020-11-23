import React from 'react'

import './errorStyles/defaultFormError.css'
import './errorStyles/dashboardProfileEditFormError.css'
import './errorStyles/editProfileFormError.css'
import './errorStyles/logInFormError.css'

import ErrorExclamationIndex from '../../../assets/glyphs/errorExclamationIndex'

const DefaultFormError = (props) => {

  let errorBlock

  if(typeof props.error === 'string')
    errorBlock =
      <div className={ props.errorClass || 'default_form_error_item_container' }>
        <img
          alt='error'
          id='default_form_error_exclamation'
          className='default_form_error_item_container_exclamation'
          name='defaultFormErrorExclamation'
          src={ ErrorExclamationIndex.errorExclamationRed }
          title='Error'
        />
        <span>{ props.error }</span>
      </div>

  if(typeof props.error === 'object')
    errorBlock =
      <div className={ props.errorClass || 'default_form_error_item_container' }>
        <img
          alt='error'
          id='default_form_error_exclamation'
          className='default_form_error_item_container_exclamation'
          name='defaultFormErrorExclamation'
          src={ ErrorExclamationIndex.errorExclamationRed }
          title='Error'
        />
        <span>ERR_{ props.error.code }: { props.error.message }</span>
      </div>

  return(
    <>{ props.error && errorBlock }</>
  )
}

export default DefaultFormError