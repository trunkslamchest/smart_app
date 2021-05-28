import React from 'react'

import DefaultError from '../../../../UI/forms/formErrors/defaultError'

import flagIconIndex from '../../../../assets/flag_icons/flagIconIndex'

import './dashboardProfileField.css'

const DashboardProfileField = (props) => {
  return(
    <div className={ props.fieldClass }>
      <h3>{ props.field.name }</h3>
      <ul>
        { props.field.data && props.field.data.length > 1 &&
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
        { props.field.errors && typeof props.field.errors === 'string' && <DefaultError error={ props.field.errors } errorClass={ 'default_warning' } /> }
        { props.field.errors && typeof props.field.errors === 'object' && props.field.errors.map((errorMsg, index) => <DefaultError error={ errorMsg.error } errorClass={ 'default_warning' } key={ index } /> ) }
      </ul>
    </div>
  )
}

export default DashboardProfileField