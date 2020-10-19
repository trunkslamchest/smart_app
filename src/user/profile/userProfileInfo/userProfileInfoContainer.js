import React from 'react'
import { connect } from 'react-redux'

import months from '../../../datasets/months'

import './userProfileInfoContainer.css'

const UserProfileInfoContainer = (props) => {

  let email, genderBlock = <></>, firstName, lastName, ageBlock = <></>, nameBlock = <></>

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

  const formatMonth = (month) => { return months[month - 1] }

  if(!!props.info.email) email = props.info.email

  const userNameEmailBlock =
    <div className="user_profile_user_name_email_container">
      <h3>{ props.info.user_name }</h3>
      <h5>{ email }</h5>
    </div>

  if(props.info.first_name !== 'null') firstName = props.info.first_name
  if(props.info.last_name !== 'null') lastName = props.info.last_name

  if(!!props.info.last_name && !!props.info.last_name) {
    nameBlock =
      <div className="user_profile_name_container">
        <span>{ firstName } { lastName }</span>
      </div>
  }

  if(!!props.info.gender && props.info.gender !== 'null') {
    genderBlock =
      <div className="user_profile_gender_container">
        <span>{ props.info.gender }</span>
      </div>
  }

  if(!!props.info.dob && props.info.dob.year !== 0) {
    ageBlock =
      <div className="user_profile_dob_container">
        <span>{ new Date().getFullYear() - props.info.dob.year } years old</span>
      </div>
  }

  const joinDateBlock =
    <div className="user_profile_user_join_date_container">
      <h3>Join Date</h3>
      <span>{ formatMonth(props.info.join_date.month) } { formatDay(props.info.join_date.day) }, { props.info.join_date.year }</span>
    </div>

  return(
    <div className="user_profile_info_container">
      { userNameEmailBlock }
      { nameBlock }
      { genderBlock }
      { ageBlock }
      { joinDateBlock }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps)(UserProfileInfoContainer)