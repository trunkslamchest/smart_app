import React, { useEffect } from 'react'
import { routes } from '../../../../utility/paths'
import { connect } from 'react-redux'
import { deleteProfile } from '../../../../store/actions/actionIndex'

import { checkBlankString, checkBlankInt } from '../../../../utility/forms/checkBlank'
import formatMonth from '../../../../utility/forms/formatMonth'
import formatDay from '../../../../utility/forms/formatDay'

import makeDashboardProfileButtons from '../../dashboardFunctions/makeDashboardProfileButtons'
import makeDashboardProfileFields from '../../dashboardFunctions/makeDashboardProfileFields'

import ContainerProfileHeader from '../../../../UI/components/headers/containerProfileHeader/containerProfileHeader'
import DashboardProfileField from '../../dashboardComponents/dashboardProfileField/dashboardProfileField'

import DefaultButtonsContainer from '../../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import glyphIndex from '../../../../assets/glyphs/glyphIndex'


import './dashboardProfileContainer.css'

const DashboardProfileContainer = (props) => {

  useEffect(() => { document.title = "SmartApp™ | Dashboard | Profile" }, [])

  let avatar = props.user.info.avatar
  let user_name = props.user.info.user_name
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
  let last_login = `${ props.user.info.last_login.time } ${ formatMonth(props.user.info.last_login.month) } ${ formatDay(props.user.info.last_login.day) }, ${ props.user.info.last_login.year }`
  let join_date = `${ formatMonth(props.user.info.join_date.month) } ${ formatDay(props.user.info.join_date.day) }, ${ props.user.info.join_date.year }`

  const onClickProfileButtonFunction = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    props.history.push(buttonParams.route)
  }

  const onClickDelete = () => { props.onDeleteProfileModal(true) }

  const profileFields = makeDashboardProfileFields(firstName, lastName, bio, country, gender, genderPronouns, fullDOB, dobDay, dobMonth, dobYear, last_login, join_date)

  const profileButtons = makeDashboardProfileButtons(glyphIndex, onClickProfileButtonFunction, onClickDelete, user_name, routes)

  let distribProfileFields = profileFields.map((field, index) => {
    return (
      <React.Fragment key={ index + field.name }>
        <DashboardProfileField
          field={ field }
          fieldClass={ 'dashboard_profile_field' }
        />
        <div className='divider_medium'/>
      </React.Fragment>
    )
  })

  let last_login_block =
    <div className='dashboard_date_sub_container'>
      <h4>Last Login</h4>
      <h5>{ last_login }</h5>
    </div>

  let join_date_block =
    <div className='dashboard_date_sub_container'>
      <h4>Join Date</h4>
      <h5>{ join_date }</h5>
    </div>

  let date_block =
    <div className='dashboard_date_container'>
      { join_date_block }
      { last_login_block }
    </div>

  return(
    <>
      <ContainerProfileHeader
        avatar={ avatar }
        containerClass={ 'dashboard_profile_header_buttons_container' }
        email={ email }
        history={ props.history }
        user_name={ user_name }
        date_block={ date_block }
      />
      <div className='dashboard_profile_body'>
        <div className='dashboard_profile_fields_container'>
          { distribProfileFields }
        </div>
        <DefaultButtonsContainer
          buttons={ profileButtons }
          buttonRow={ true }
          containerClass={ 'dashboard_profile_buttons_container' }
          enableButton={ true }
        />
      </div>
    </>
  )
}

const store = (store) => {
  return {
    user: store.user
  }
}

const dispatch = (dispatch) => {
  return {
    onDeleteProfileModal: (bool) => (dispatch(deleteProfile(bool)))
  }
}

export default connect(store, dispatch)(DashboardProfileContainer)