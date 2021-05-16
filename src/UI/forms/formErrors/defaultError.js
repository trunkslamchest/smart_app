import React from 'react'

import './errorStyles/defaultError.css'
import './errorStyles/dashboardMissingFieldError.css'
import './errorStyles/defaultWarning.css'

import ErrorExclamationIndex from '../../../assets/glyphs/errorExclamationIndex'

const DefaultError = (props) => {
  return(
    <>
      { props.error &&
        <div className={ props.errorClass || 'default_error' }>
          <img
            alt='error'
            id='default_error_exclamation'
            className='default_error_exclamation'
            name='defaultErrorExclamation'
            src={ props.errorClass === 'default_warning' ? ErrorExclamationIndex.errorExclamationYellow : ErrorExclamationIndex.errorExclamationRed }
            title='Error'
          />
          <span>
            { props.error }
          </span>
        </div>
      }
    </>
  )
}

export default DefaultError