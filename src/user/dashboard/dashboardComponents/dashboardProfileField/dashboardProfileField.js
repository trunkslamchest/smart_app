import React from 'react'

import DefaultError from '../../../../UI/components/errors/defaultError'

import flagIconIndex from '../../../../assets/flag_icons/flagIconIndex'

import './dashboardProfileField.css'

const DashboardProfileField = (props) => {
  return(
    <div className={ props.fieldClass }>
      <ul>
        <h3>{ props.field.name }</h3>
        { props.field.data && props.field.data.length &&
          <li>
            { props.field.name === "Country" &&
              <img
                alt={ props.field.data }
                id='dashboard_profile_country_flag'
                className='dashboard_profile_country_flag'
                name='dashboardProfileCountryFlag'
                src={ flagIconIndex[props.field.data].image }
                title='Country Flag'
              />
            }
            <span>{ props.field.data }</span>
          </li>
        }
        { props.field.errors && typeof props.field.errors === 'string' && <DefaultError error={ props.field.errors } /> }
        { props.field.errors && typeof props.field.errors === 'object' && props.field.errors.map((errorMsg, index) => <DefaultError key={ index } error={ errorMsg.error } /> ) }
      </ul>
    </div>
  )
}

export default DashboardProfileField