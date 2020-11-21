import React from 'react'

import './errorStyles/defaultError.css'
import './errorStyles/dashboardMissingFieldError.css'

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
            src={ ErrorExclamationIndex.errorExclamationYellow }
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