import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../../utility/paths'
import { connect } from 'react-redux'
import { deleteProfile } from '../../../../store/actions/actionIndex'

import { checkBlankString, checkBlankInt } from '../../../../utility/forms/checkBlank'
import formatMonth from '../../../../utility/forms/formatMonth'
import formatDay from '../../../../utility/forms/formatDay'

import makeDashboardProfileButtons from '../../dashboardFunctions/makeDashboardProfileButtons'
import makeDashboardProfileFields from '../../dashboardFunctions/makeDashboardProfileFields'

import DashboardHeader from '../../dashboardComponents/dashboardHeader/dashboardHeader'
import ContainerProfileHeader from '../../../../UI/components/headers/containerProfileHeader/containerProfileHeader'
import DashboardProfileField from '../../dashboardComponents/dashboardProfileField/dashboardProfileField'

import DefaultButtonsContainer from '../../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import glyphIndex from '../../../../assets/glyphs/glyphIndex'

import './dashboardProfileContainer.css'

const DashboardProfileContainer = (props) => {

  const history = useHistory()

  useEffect(() => {
    document.body.scrollTop = 0
    document.title = "SmartApp™ | Dashboard | Profile"
  }, [])

  let avatar = props.userInfo.avatar
  let user_name = props.userInfo.user_name
  let email = props.userInfo.email
  let bio = checkBlankString(props.userInfo.bio, 'Update your profile to add a Bio')
  let country = checkBlankString(props.userInfo.country, 'Update your profile to add your Country')
  let firstName = checkBlankString(props.userInfo.first_name, 'Update your profile to add your First Name')
  let lastName = checkBlankString(props.userInfo.last_name, 'Update your profile to add your Last Name')
  let gender = checkBlankString(props.userInfo.gender, 'Update your profile to add your Gender')
  let genderPronouns = checkBlankString(props.userInfo.gender_pronouns, 'Update your profile to add your Gender Pronouns')
  let dobDay = checkBlankInt(props.userInfo.dob.day, 'Update your profile to add your Birth Day')
  let dobMonth = checkBlankString(props.userInfo.dob.month, 'Update your profile to add your Birth Month')
  let dobYear = checkBlankInt(props.userInfo.dob.year, 'Update your profile to add your Birth Year')
  let fullDOB = dobYear.field === 0 ? `${ dobMonth.field } ${ formatDay(dobDay.field) }` : `${ dobMonth.field } ${ formatDay(dobDay.field) }, ${ dobYear.field }`
  let last_login = `${ props.userInfo.last_login.time } ${ formatMonth(props.userInfo.last_login.month) } ${ formatDay(props.userInfo.last_login.day) }, ${ props.userInfo.last_login.year }`
  let join_date = `${ formatMonth(props.userInfo.join_date.month) } ${ formatDay(props.userInfo.join_date.day) }, ${ props.userInfo.join_date.year }`

  const onClickProfileButtonFunction = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    history.push(buttonParams.route)
  }

  const onClickDelete = () => { props.onDeleteProfileModal(true) }

  const profileFields = makeDashboardProfileFields(firstName, lastName, email, bio, country, gender, genderPronouns, fullDOB, dobDay, dobMonth, dobYear, last_login, join_date)

  const profileButtons = makeDashboardProfileButtons(glyphIndex, onClickProfileButtonFunction, onClickDelete, user_name, routes)

  let distribProfileFields = profileFields.map((field, index) => {
    return (
      <React.Fragment key={ index + field.name }>
        <DashboardProfileField
          field={ field }
          fieldClass={ 'dashboard_profile_field' }
        />
        { index < profileFields.length - 1 && <div className='divider_medium'/> }
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
      <DashboardHeader header_text={ 'Your Profile' } />
      <div className='dashboard_profile_body'>
        <ContainerProfileHeader
          avatar={ avatar }
          containerClass={ 'dashboard_profile_header_buttons_container' }
          email={ email }
          user_name={ user_name }
          date_block={ date_block }
        />
        <div className='divider_medium' />
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
    userInfo: store.user.info
  }
}

const dispatch = (dispatch) => {
  return {
    onDeleteProfileModal: (bool) => (dispatch(deleteProfile(bool)))
  }
}

export default connect(store, dispatch)(DashboardProfileContainer)