import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { routes } from '../../../utility/paths'

import checkBlank from '../dashboardFunctions/checkBlank'
import formatMonth from '../dashboardFunctions/formatMonth'
import formatDay from '../dashboardFunctions/formatDay'

import DashboardProfileButtonContainer from './dashboardProfileButtonContainer/dashboardProfileButtonContainer'
import DashboardProfileError from './dashboardProfileError/dashboardProfileError'

import './dashboardProfileContainer.css'

const DashboardProfileContainer = (props) => {

  useEffect(() => { document.title = "SmartApp™ | Dashboard | Profile" }, [])

  let userName = props.user.info.user_name
  let email = props.user.info.email
  let bio = checkBlank(props.user.info.bio, 'Update your profile to add a Bio')
  let firstName = checkBlank(props.user.info.first_name, 'Update your profile to add your First Name')
  let lastName = checkBlank(props.user.info.last_name, 'Update your profile to add your Last Name')
  let gender = checkBlank(props.user.info.gender, 'Update your profile to add your Gender')
  let dobDay = checkBlank(props.user.info.dob.day, 'Update your profile to add your Birth Day')
  let dobMonth = checkBlank(props.user.info.dob.month, 'Update your profile to add your Birth Month')
  let dobYear = checkBlank(props.user.info.dob.year, 'Update your profile to add your Birth Year')
  let fullDOB = dobYear.field.length === 0 ? `${ dobMonth.field } ${ formatDay(dobDay.field) }` : `${ dobMonth.field } ${ formatDay(dobDay.field) }, ${ dobYear.field }`
  let joinDate = `${ formatMonth(props.user.info.join_date.month) } ${ formatDay(props.user.info.join_date.day) }, ${ props.user.info.join_date.year }`

  const profileFields = [
    { name: 'Name', data: `${firstName.field} ${lastName.field}`, error: [ firstName.error, lastName.error ] },
    { name: 'Bio', data: bio.field, error: bio.error },
    { name: 'Gender', data: gender.field, error: gender.error },
    { name: 'Date Of Birth', data: fullDOB, error: [ dobDay.error, dobMonth.error, dobYear.error ] },
    { name: 'Join Date', data: joinDate }
  ]

  let distribProfileFields = profileFields.map(field => {
    return (
      <ul key={ profileFields.indexOf(field) + field.name }>
          <li>{ field.name }</li>
          <li>{ field.data }</li>
          { typeof field.error === 'string' && <DashboardProfileError error={ field.error } /> }
          { typeof field.error === 'object' && field.error.map(errorMsg => <DashboardProfileError key={ field.error.indexOf(errorMsg)} error={ errorMsg } /> ) }
      </ul>
    )
  })

  return(
    <div className='dashboard_profile_wrapper'>
      <div className='dashboard_profile_header'>
        <h3>{ userName }</h3>
        <h5>{ email }</h5>
      </div>
      <div className='dashboard_profile_body'>
        { distribProfileFields }
        <span><Link to={ routes.user_profile + '/' + userName } target='_blank'>View My Public Profile</Link></span>
        <DashboardProfileButtonContainer history={ props.history } />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(DashboardProfileContainer)