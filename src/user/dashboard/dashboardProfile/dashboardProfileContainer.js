import React from 'react'

import { connect } from 'react-redux'

import months from '../../../datasets/months'
import DashboardProfileButtonContainer from './dashboardProfileButtonContainer'

import './dashboardProfileContainer.css'

const DashboardProfileContainer = (props) => {

  let initMount
  let fullName
  let dob
  let gender
  let joinDate

  const formatDay = () => {
    const day = props.user.info.join_date.day
    const number_ends = [ 'st', 'nd', 'rd', 'th' ]
    const number_split = day.toString().split('').pop()

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

  if(!!props.user.info){
    if (props.user.info.first_name === "" || props.user.info.last_name === "") fullName = <li>Not Available</li>
    else fullName = <li>{props.user.info.first_name} {props.user.info.last_name}</li>

    if (props.user.info.dob.day === "" || props.user.info.dob.month === "" || props.user.info.dob.year === "") dob = <li>Not Available</li>
    else dob = <li>{ props.user.info.dob.day } { props.user.info.dob.month }, { props.user.info.dob.year }</li>

    if (props.user.info.gender === "") gender = <li>Not Available</li>
    else gender = <li>{ props.user.info.gender }</li>

    joinDate = <li>{ formatMonth() } { formatDay() }, { props.user.info.join_date.year }</li>

    initMount =
    <div className='dashboard_profile_wrapper'>
      <div className='alt_header'>
        <h3>{props.user.info.user_name}</h3>
        <h5>{props.user.info.email}</h5>
      </div>
      <div className='dashboard_profile_body'>
        <ul>
          <li>Name</li>
          { fullName }
        </ul>
        <ul>
          <li>Date of Birth</li>
          { dob }
        </ul>
        <ul>
          <li>Gender</li>
          { gender }
        </ul>
        <ul>
          <li>Join Date</li>
          { joinDate }
        </ul>
          <DashboardProfileButtonContainer history={props.history} />
      </div>
    </div>
  }

  // const age = new Date().getFullYear() - props.user.birth_year

  return(<>{ initMount }</>)
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(DashboardProfileContainer)