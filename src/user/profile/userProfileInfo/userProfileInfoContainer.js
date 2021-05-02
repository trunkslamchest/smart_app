import React from 'react'
import { connect } from 'react-redux'

// import checkBlank from '../../../utility/forms/checkBlank'
import formatMonth from '../../../utility/forms/formatMonth'
import formatDay from '../../../utility/forms/formatDay'

import ContainerProfileHeader from '../../../UI/components/headers/containerProfileHeader/containerProfileHeader'

import './userProfileInfoContainer.css'

const UserProfileInfoContainer = (props) => {

  let first_name = props.info.first_name !== 'null' && props.info.first_name
  let last_name = props.info.last_name !== 'null' && props.info.last_name
  let country = props.info.country !== 'null' && props.info.country
  let gender = props.info.gender !== 'null' && props.info.gender
  let gender_pronouns = props.info.gender_pronouns !== 'null' && props.info.gender_pronouns
  let age = (props.info.dob && props.info.dob.year !== 0) && new Date().getFullYear() - props.info.dob.year
  let bio = props.info.bio !== 'null' && props.info.bio

  let last_login =
    <div className='user_profile_info_date_sub_container'>
      <h4>Last Login</h4>
      <h5>{ props.info.last_login.time } { formatMonth(props.info.last_login.month) } { formatDay(props.info.last_login.day) }, { props.info.last_login.year }</h5>
    </div>

  let join_date =
    <div className='user_profile_info_date_sub_container'>
      <h4>Join Date</h4>
      <h5>{ formatMonth(props.info.join_date.month) } { formatDay(props.info.join_date.day) }, { props.info.join_date.year }</h5>
    </div>

  let date_block =
    <div className='user_profile_info_date_container'>
      { join_date }
      { last_login }
    </div>

  return(
    <div className="user_profile_info_container">
      <ContainerProfileHeader
        avatar={ !!props.info.avatar && props.info.avatar }
        user_name={ props.info.user_name }
        first_name={ first_name }
        last_name={ last_name }
        country={ country }
        gender={ gender }
        gender_pronouns={ gender_pronouns }
        age={ age }
        bio={ bio }
        date_block={ date_block }
      />
    </div>
  )
}

const store = (store) => {
  return {
    profile: store.profile
  }
}

export default connect(store)(UserProfileInfoContainer)