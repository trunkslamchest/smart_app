import React from 'react'

import './containerUL.css'

const ContainerUL = (props) => {

  const distribListItems = props.list_items.map((item, index) => {
    return(
      <li key={ index }>
        { item }
      </li>
    )
  })

  return(
    <div className='container_ul'>
        <span>{ !!props.list_header && props.list_header }</span>
        <ul>
          { distribListItems }
          {/* <li>1.  all registration information you submit will be true, accurate, current, and complete;</li>
          <li>2.  you will maintain the accuracy of such information and promptly update such registration information as necessary;</li>
          <li>3.  you have the legal capacity and you agree to comply with these Terms of Use;</li>
          <li>4.  you are not under the age of 13;</li>
          <li>5.  you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use SmartApp™;</li>
          <li>6.  you will not access SmartApp™ through automated or non-human means, whether through a bot, script, or otherwise;</li>
          <li>7.  you will not use SmartApp™ for any illegal or unauthorized purpose; and (8) your use of SmartApp™ will not violate any applicable law or regulation.</li> */}
        </ul>
    </div>
  )
}

export default ContainerUL