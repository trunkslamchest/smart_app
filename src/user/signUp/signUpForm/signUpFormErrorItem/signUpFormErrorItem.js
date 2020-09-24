import React from 'react'

import './signUpFormErrorItem.scss'

const SignUpFormErrorItem = (props) => {
  return(
    <div className='sign_up_error_item'>
      err{ props.error.code }: { props.error.msg }
    </div>
  )
}

export default SignUpFormErrorItem