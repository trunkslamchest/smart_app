import React from 'react'

import './signUpFormErrorItem.css'

const SignUpFormErrorItem = (props) => {
  return(
    <div className='sign_up_error_item'>
      err{ props.error.code }: { props.error.message }
    </div>
  )
}

export default SignUpFormErrorItem