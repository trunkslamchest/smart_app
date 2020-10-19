import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { routes } from '../../../utility/paths'

import months from '../../../datasets/months'
import DashboardProfileButtonContainer from './dashboardProfileButtonContainer/dashboardProfileButtonContainer'
import DashboardProfileError from './dashboardProfileError/dashboardProfileError'

import './dashboardProfileContainer.css'

const DashboardProfileContainer = (props) => {

  useEffect(() => { document.title = "SmartApp™ | Dashboard | Profile" }, [])

  let userName = props.user.info.user_name, email = props.user.info.email
  let firstName = '', lastName = '', nameErrors = [], distribNameErrors = <></>
  let dobDay = '', dobMonth = '', dobYear = '', fulldob, dobErrors = [], distribDobErrors = <></>
  let gender = '', genderErrors = [], distribGenderErrors = <></>
  let joinDate

  const formatDay = (day) => {
    if(day === '') return ''
    const number_ends = [ 'st', 'nd', 'rd', 'th' ], number_split = day.toString().split('').pop()
    if (day > 10 && day < 19) return day + number_ends[3]
    else {
      if ((number_split === '1')) return day + number_ends[0]
      else if (number_split === '2') return day + number_ends[1]
      else if (number_split === '3') return day + number_ends[2]
      else return day + number_ends[3]
    }
  }

  const formatMonth = () => { return months[props.user.info.join_date.month - 1] }

  if(props.user.info.first_name === 'null') nameErrors.push('Update your profile to add your First Name')
  else firstName = props.user.info.first_name

  if(props.user.info.last_name === 'null') nameErrors.push('Update your profile to add your Last Name')
  else lastName = props.user.info.last_name

  if(props.user.info.dob.day === 0) dobErrors.push('Update your profile to add your Birth Day')
  else dobDay = props.user.info.dob.day

  if(props.user.info.dob.month === 'null') dobErrors.push('Update your profile to add your Birth Month')
  else dobMonth = props.user.info.dob.month

  if(props.user.info.dob.year === 0) dobErrors.push('Update your profile to add your Birth Year')
  else dobYear = props.user.info.dob.year

  fulldob = `${ dobMonth } ${ formatDay(dobDay) } ${ dobYear }`

  if(props.user.info.gender === 'null') genderErrors.push('Update your profile to add your Gender')
  else gender = props.user.info.gender

  joinDate = `${formatMonth() } ${ formatDay(props.user.info.join_date.day) }, ${ props.user.info.join_date.year }`

  if(nameErrors.length) { distribNameErrors = nameErrors.map(error => <DashboardProfileError key={nameErrors.indexOf(error)} error={error} /> )}
  if(dobErrors.length) { distribDobErrors = dobErrors.map(error => <DashboardProfileError key={dobErrors.indexOf(error)} error={error} /> )}
  if(genderErrors.length) { distribGenderErrors = genderErrors.map(error => <DashboardProfileError key={genderErrors.indexOf(error)} error={error} /> )}

  return(
    <div className='dashboard_profile_wrapper'>
      <div className='dashboard_profile_header'>
        <h3>{ userName }</h3>
        <h5>{ email }</h5>
      </div>
      <div className='dashboard_profile_body'>
        <ul>
          <li>Name</li>
          <li>{ firstName } { lastName }</li>
          { !!nameErrors.length && <ul>{ distribNameErrors }</ul> }
        </ul>
        <ul>
          <li>Gender</li>
          <li>{ gender }</li>
          { !!genderErrors.length && <ul>{ distribGenderErrors }</ul> }
        </ul>
        <ul>
          <li>Date of Birth</li>
          <li>{ fulldob }</li>
          { !!dobErrors.length && <ul>{ distribDobErrors }</ul> }
        </ul>
        <ul>
          <li>Join Date</li>
          <li>{ joinDate }</li>
        </ul>
        <ul>
          <li>
            <Link to={ routes.user_profile + '/' + userName } target='_blank'>View My Public Profile</Link>
          </li>
        </ul>
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