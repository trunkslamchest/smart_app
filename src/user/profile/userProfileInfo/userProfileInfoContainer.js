import React from 'react'
import { connect } from 'react-redux'

// import checkBlank from '../../../utility/forms/checkBlank'
import formatMonth from '../../../utility/forms/formatMonth'
import formatDay from '../../../utility/forms/formatDay'

import flagIconIndex from '../../../assets/flag_icons/flagIconIndex'

import './userProfileInfoContainer.css'

const UserProfileInfoContainer = (props) => {

  let ageBlock = <></>,
      avatarBlock = <></>,
      bioBlock = <></>,
      countryBlock = <></>,
      genderBlock = <></>,
      genderPronounsBlock = <></>,
      nameBlock = <></>

  const userNameBlock =
    <div className="user_profile_info_sub_container">
      <h3>{ props.info.user_name }</h3>
    </div>

  if(!!props.info.avatar) {
    avatarBlock =
      <div className="user_profile_info_sub_container">
        <img
          alt='Avatar'
          className='user_profile_info_avatar_img'
          src={ props.info.avatar }
        />
      </div>
  }

  let firstName = props.info.first_name !== 'null' && props.info.first_name,
      lastName = props.info.last_name !== 'null' && props.info.last_name

  if(!!props.info.first_name || !!props.info.last_name) {
    nameBlock =
      <div className="user_profile_info_sub_container">
        <span>{ firstName } { lastName }</span>
      </div>
  }

  if(!!props.info.bio && props.info.bio !== 'null') {
    bioBlock =
      <div className="user_profile_info_sub_container">
        <span>{ props.info.bio }</span>
      </div>
  }

  if(!!props.info.country && props.info.country !== 'null') {
    countryBlock =
      <div className="user_profile_info_sub_container">
        <img 
          alt={ props.info.country }
          className='user_profile_info_flag_img'
          src={ flagIconIndex[props.info.country].image }
        />
        <span>{ props.info.country }</span>
      </div>
  }

  if(!!props.info.gender && props.info.gender !== 'null') {
    genderBlock =
      <div className="user_profile_info_sub_container">
        <span>{ props.info.gender }</span>
      </div>
  }

  if(!!props.info.gender_pronouns && props.info.gender_pronouns !== 'null') {
    genderPronounsBlock =
      <div className="user_profile_info_sub_container">
        <span>{ props.info.gender_pronouns }</span>
      </div>
  }

  if(!!props.info.dob && props.info.dob.year !== 0) {
    ageBlock =
      <div className="user_profile_info_sub_container">
        <span>{ new Date().getFullYear() - props.info.dob.year } years old</span>
      </div>
  }

  const lastLoginBlock =
    <div className="user_profile_info_sub_container">
      <h4>Last Login</h4>
      <h5>{ props.info.last_login.time } { formatMonth(props.info.last_login.month) } { formatDay(props.info.last_login.day) }, { props.info.last_login.year }</h5>
    </div>

  const joinDateBlock =
    <div className="user_profile_info_sub_container">
      <h4>Join Date</h4>
      <h5>{ formatMonth(props.info.join_date.month) } { formatDay(props.info.join_date.day) }, { props.info.join_date.year }</h5>
    </div>

  return(
    <div className="user_profile_info_container">
      { userNameBlock }
      { avatarBlock }
      { nameBlock }
      { bioBlock }
      { countryBlock }
      { genderBlock }
      { genderPronounsBlock }
      { ageBlock }
      { lastLoginBlock }
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