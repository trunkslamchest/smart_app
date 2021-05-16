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
        </ul>
    </div>
  )
}

export default ContainerUL