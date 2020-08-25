import React from 'react'

import { connect } from 'react-redux'

import DashboardProfileButtonContainer from './dashboardProfileButtonContainer'

import './dashboardProfileContainer.css'

const DashboardProfileContainer = (props) => {

  let initMount = <></>
  let fullName = <></>
  let DOB = <></>
  let gender = <></>
  let joinDate = <li>TBA</li>

  if(!!props.user.info){
    if (props.user.info.first_name === "" || props.user.info.last_name === "") fullName = <li>Update Your Profile to Add Your Name</li>
    else fullName = <li>{props.user.info.first_name} {props.user.info.last_name}</li>

    if (props.user.info.DOB === "") DOB = <li>Update Your Profile to Add Your Date Of Birth</li>
    else DOB = <li>{ props.user.info.DOB }</li>

    if (props.user.info.gender === "") gender = <li>Update Your Profile to Add Your Gender</li>
    else gender = <li>{ props.user.info.gender }</li>

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
          { DOB }
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

  // const formatDate = (date) => {
  //   const number_ends = [ 'st', 'nd', 'rd', 'th' ]
  //   const number_split = localStorage.birth_day.split('').pop()

  //   if ((parseInt(date, 10) > 10) && (parseInt(date, 10) < 19)) {
  //     return `${date}` + number_ends[3]
  //   } else {
  //     if ((number_split === '1')) {
  //       return `${date}` + number_ends[0]
  //     } else if (number_split === '2') {
  //       return `${date}` + number_ends[1]
  //     } else if (number_split === '3') {
  //       return `${date}` + number_ends[2]
  //     } else {
  //       return `${date}` + number_ends[3]
  //     }
  //   }
  // }

  // const age = new Date().getFullYear() - props.user.birth_year

  return(<>{ initMount }</>)
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(DashboardProfileContainer)