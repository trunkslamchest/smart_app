import React from 'react'

import { connect } from 'react-redux'

import months from '../../../datasets/months'
import DashboardProfileButtonContainer from './dashboardProfileButtonContainer'

import './dashboardProfileContainer.css'

const DashboardProfileContainer = (props) => {

  let firstName, lastName, dobDay, dobMonth, dobYear, gender, joinDate

  const formatDay = () => {
    const day = props.user.info.join_date.day, number_ends = [ 'st', 'nd', 'rd', 'th' ], number_split = day.toString().split('').pop()

    if (day > 10 && day < 19) return day + number_ends[3]
    else {
      if ((number_split === '1')) return day + number_ends[0]
      else if (number_split === '2') return day + number_ends[1]
      else if (number_split === '3') return day + number_ends[2]
      else return day + number_ends[3]
    }
  }

  const formatMonth = () => {
    const month = props.user.info.join_date.month
    return months[month - 1]
  }

    firstName = props.user.info.first_name === "null" ? 'missing' : firstName = props.user.info.first_name
    lastName = props.user.info.last_name === "null" ? 'missing' : lastName = props.user.info.last_name
    dobDay = props.user.info.dob.day === "null" ? 'missing' : props.user.info.dob.day
    dobMonth = props.user.info.dob.month === "null" ? 'missing' : props.user.info.dob.month
    dobYear = props.user.info.dob.year === "null" ? 'missing' : props.user.info.dob.year
    gender = props.user.info.gender === "null" ? 'missing' : props.user.info.gender
    joinDate = `${formatMonth() } ${ formatDay() }, ${ props.user.info.join_date.year }`

  return(
    <div className='dashboard_profile_wrapper'>
      <div className='alt_header'>
        <h3>{props.user.info.user_name}</h3>
        <h5>{props.user.info.email}</h5>
      </div>
      <div className='dashboard_profile_body'>
        <ul>
          <li>Name</li>
          <li>{ firstName } { lastName }</li>
        </ul>
        <ul>
          <li>Date of Birth</li>
          <li>{ dobDay } { dobMonth }, { dobYear }</li>
        </ul>
        <ul>
          <li>Gender</li>
          <li>{ gender }</li>
        </ul>
        <ul>
          <li>Join Date</li>
          <li>{ joinDate }</li>
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