import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { routes } from '../../../utility/paths'

import { checkBlankString, checkBlankInt } from '../../../utility/forms/checkBlank'
import formatMonth from '../../../utility/forms/formatMonth'
import formatDay from '../../../utility/forms/formatDay'

import DashboardProfileButtonContainer from './dashboardProfileButtonContainer/dashboardProfileButtonContainer'
import DashboardProfileError from './dashboardProfileError/dashboardProfileError'

import flagIconIndex from '../../../assets/flag_icons/flagIconIndex'

import './dashboardProfileContainer.css'

const DashboardProfileContainer = (props) => {

  useEffect(() => { document.title = "SmartApp™ | Dashboard | Profile" }, [])

  let avatar = props.user.info.avatar
  let userName = props.user.info.user_name
  let email = props.user.info.email
  let bio = checkBlankString(props.user.info.bio, 'Update your profile to add a Bio')
  let country = checkBlankString(props.user.info.country, 'Update your profile to add your Country')
  let firstName = checkBlankString(props.user.info.first_name, 'Update your profile to add your First Name')
  let lastName = checkBlankString(props.user.info.last_name, 'Update your profile to add your Last Name')
  let gender = checkBlankString(props.user.info.gender, 'Update your profile to add your Gender')
  let genderPronouns = checkBlankString(props.user.info.gender_pronouns, 'Update your profile to add your Gender Pronouns')
  let dobDay = checkBlankInt(props.user.info.dob.day, 'Update your profile to add your Birth Day')
  let dobMonth = checkBlankString(props.user.info.dob.month, 'Update your profile to add your Birth Month')
  let dobYear = checkBlankInt(props.user.info.dob.year, 'Update your profile to add your Birth Year')
  let fullDOB = dobYear.field === 0 ? `${ dobMonth.field } ${ formatDay(dobDay.field) }` : `${ dobMonth.field } ${ formatDay(dobDay.field) }, ${ dobYear.field }`
  let lastLogin = `${ props.user.info.last_login.time } ${ formatMonth(props.user.info.last_login.month) } ${ formatDay(props.user.info.last_login.day) }, ${ props.user.info.last_login.year }`
  let joinDate = `${ formatMonth(props.user.info.join_date.month) } ${ formatDay(props.user.info.join_date.day) }, ${ props.user.info.join_date.year }`

  const profileFields = [
    { name: 'Name', data: `${firstName.field} ${lastName.field}`, errors: [ {error: firstName.error}, { error: lastName.error } ] },
    { name: 'Bio', data: bio.field, errors: bio.error },
    { name: 'Country', data: country.field, errors: country.error },
    { name: 'Gender Pronouns', data: genderPronouns.field, errors: genderPronouns.error },
    { name: 'Gender', data: gender.field, errors: gender.error },
    { name: 'Date Of Birth', data: fullDOB, errors: [ { error: dobDay.error}, { error: dobMonth.error }, { error: dobYear.error} ] },
    { name: 'Last Login', data: lastLogin },
    { name: 'Join Date', data: joinDate }
  ]

  let distribProfileFields = profileFields.map(field => {
    return (
      <ul key={ profileFields.indexOf(field) + field.name }>
        <li>{ field.name }</li>
        { field.data && field.data.length &&
          <li>
            { field.name === "Country" && <img alt={ field.data } src={ flagIconIndex[field.data].image } /> }
            { field.data }
          </li>
        }
        { field.errors && typeof field.errors === 'string' && <DashboardProfileError error={ field.errors } /> }
        { field.errors && typeof field.errors === 'object' && field.errors.map(errorMsg => <DashboardProfileError key={ field.errors.indexOf(errorMsg) } error={ errorMsg.error } /> ) }
      </ul>
    )
  })

  return(
    <div className='dashboard_profile_wrapper'>
      <div className='dashboard_profile_header'>
        <img
          alt={ `${userName}'s Avatar` }
          src={ avatar }
        />
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