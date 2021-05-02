import React from 'react'
import { routes } from '../../../../utility/paths.js'
import { connect } from 'react-redux'
import {
  loading,
  authStart,
  updateUserInfo,
  clearAuthErrors,
  clearAuthStatus
} from '../../../../store/actions/actionIndex'

import { check } from '../../../../utility/paths'
import checkFunctions from '../../../../utility/checkFunctions'
import validateEditProfile from '../../../../utility/validation/validateEditProfile'

import makeDashboardEditProfileFormButtons from '../../dashboardFunctions/makeDashboardEditProfileFormButtons'
import makeDashboardEditProfileFormInputs from '../../dashboardFunctions/makeDashboardEditProfileFormInputs'

import DashboardHeader from '../../dashboardComponents/dashboardHeader/dashboardHeader'
import DefaultForm from '../../../../UI/forms/defaultForm'

import genders from '../../../../datasets/genders'
import gender_pronouns from '../../../../datasets/genderPronouns'
import months from '../../../../datasets/months'

import flagIconIndex from '../../../../assets/flag_icons/flagIconIndex'
import formGlyphIndex from '../../../../assets/glyphs/formGlyphIndex'

import './dashboardEditProfile.css'

class DashboardEditProfile extends React.Component {

  state = {
    avatar: '',
    bio: '',
    country: '',
    dob: {
      day: 0,
      month: 'null',
      year: 0
    },
    email: '',
    first_name: '',
    gender: '',
    gender_pronouns: '',
    last_name: '',
    user_name: '',
    errors: {},
    form: { valid: false, pending: false },
    pulledStore: false,
    enableButton: true,
    enableInput: true
  }

  componentDidMount(){ if(this.props.user.info) this.pulledStore() }

  componentDidUpdate() {
    if(this.props.user.info && !this.state.pulledStore)this.pulledStore()
    if(!this.props.modal.loading && (!this.state.enableButton || !this.state.enableInput)) this.setState({ enableButton: true, enableInput: true })
  }

  componentWillUnmount(){
    this.setState({
      avatar: '',
      bio: '',
      country: '',
      dob: {
        day: 0,
        month: 'null',
        year: 0
      },
      email: '',
      first_name: '',
      gender: '',
      gender_pronouns: '',
      last_name: '',
      user_name: '',
      errors: {},
      form: { valid: false, pending: false },
      pulledStore: false,
      enableButton: true,
      enableInput: true
    })
  }

  pulledStore = () => {
    this.setState({
      avatar: this.props.user.info.avatar,
      bio: this.props.user.info.bio,
      country: this.props.user.info.country,
      dob: this.props.user.info.dob,
      email: this.props.user.info.email,
      first_name: this.props.user.info.first_name,
      gender: this.props.user.info.gender,
      gender_pronouns: this.props.user.info.gender_pronouns,
      last_name: this.props.user.info.last_name,
      user_name: this.props.user.info.user_name,
      pulledStore: true
    })
  }

  onChange = (event) => {
    let val = event.target.value === "Select" || event.target.value.length === 0 ? "null" : event.target.value
    this.setState({ [event.target.id]: val })
  }

  onDOBChange = (event) => {
    let val = event.target.value === "Select" ? "null" : typeof event.target.value === 'string' ? event.target.value : parseInt(event.target.value)
    this.setState({ dob: { ...this.state.dob, [event.target.name]: val } })
  }

  onAvatarChange = (event) => {
    if(this.state.errors.avatar) this.setState({ errors: { ...this.state.errors, avatar: '' } })
    let reader = new FileReader(), img = new Image(), imgSize = event.target.files[0].size
    reader.readAsDataURL(event.target.files[0])
    reader.onload = () => {
      if(reader.readyState === 2) {
        img.src = reader.result
        img.onload = () => {
          var imgErrors = []
          if(img.width !== 150 || img.height !== 150) imgErrors.push("Profile Pictures must be 150x150 in dimension")
          // if(imgSize > 2000000) imgErrors.push("Profile Pictures must less than 2mb in size")
          if(imgSize > 5000) imgErrors.push("Profile Pictures must less than 5kb in size")
          if(imgErrors.length > 0) this.setState({ errors:  { ...this.state.errors, avatar: imgErrors } })
          else {
            this.setState({ avatar: reader.result })
            // reader = null
            // img = null
            // imgSize = null
          }
        }
      }
    }
    event.target.value = null
  }

  onSubmit = (event) => {
    event.persist()
    event.preventDefault()
    this.props.onClearAuthStatus()
    if(!!this.props.auth.errors.length) this.props.onClearAuthErrors()
    this.props.onLoadingModal(true)
    this.setState({ form: { valid: false, pending: true } })

    let formCheck = validateEditProfile(
      this.state.bio,
      this.state.country,
      this.state.dob,
      this.state.email,
      this.state.first_name,
      this.state.gender,
      this.state.gender_pronouns,
      this.state.last_name,
      this.state.user_name
    )

    this.setState({ form: formCheck })
    if(formCheck.valid) this.checkUserExists()
    else this.props.onLoadingModal(false)
  }

  checkUserExists = () => {
    checkFunctions('checkUserName', check.user_name, { old_user_name: this.props.user.info.user_name, new_user_name: this.state.user_name, type: 'editProfile' })
    .then(userNameRes => {
      if(!userNameRes.valid) {
        this.props.onLoadingModal(false)
        this.setState({ form: { valid: false, user_name: { valid: userNameRes.valid, errors: [ userNameRes.errors ] }, pending: false  } })
      }
      else this.onValidEditProfile()
    })
  }

  onValidEditProfile = () => {
    if(!this.state.form.pending && this.state.enableButton){
      this.props.onAuthStart('editProfile', {
        uid: localStorage.id,
        info: {
          avatar: this.state.avatar,
          bio: this.state.bio,
          country: this.state.country,
          dob: this.state.dob,
          email: this.state.email,
          first_name: this.state.first_name,
          gender: this.state.gender,
          gender_pronouns: this.state.gender_pronouns,
          last_name: this.state.last_name,
          user_name: this.state.user_name,
          join_date: this.props.user.info.join_date,
          last_login: this.props.user.info.last_login
        }
      })
    }
  }

  onReset = () => {
    this.setState({
      avatar: this.props.user.info.avatar,
      bio: this.props.user.info.bio,
      country: this.props.user.info.country,
      dob: this.props.user.info.dob,
      email: this.props.user.info.email,
      first_name: this.props.user.info.first_name,
      gender: this.props.user.info.gender,
      gender_pronouns: this.props.user.info.gender_pronouns,
      last_name: this.props.user.info.last_name,
      user_name: this.props.user.info.user_name,
      errors: {},
      form: { valid: false, pending: false },
      enableButton: true,
      enableInput: true
    })

  }

  onCancel = () => { this.props.history.push( routes.dashboard_profile ) }

  render(){
    let editProfileInputFields = makeDashboardEditProfileFormInputs(
      this.onChange,
      this.onAvatarChange,
      this.onDOBChange,
      flagIconIndex,
      this.state.avatar,
      this.state.bio,
      this.state.country,
      this.state.dob,
      this.state.email,
      this.state.first_name,
      this.state.gender,
      this.state.gender_pronouns,
      this.state.last_name,
      this.state.user_name,
      genders,
      gender_pronouns,
      months
    )

    const editProfileFormButtons = makeDashboardEditProfileFormButtons(this.onSubmit, this.onReset, this.onCancel, formGlyphIndex)

    return(
      <>
        <DashboardHeader header_text={ 'Edit Your Profile' } />
        <DefaultForm
          // buttonClass={ 'edit_profile_button' }
          buttonContainerClass={ 'dashboard_form_buttons_container' }
          buttonRow={ true }
          dividers={ true }
          inputFields={ editProfileInputFields }
          inputContainerClass={ 'edit_profile_input_container' }
          formButtons={ editProfileFormButtons }
          formClass={ 'edit_profile_form' }
          formId={ 'edit_profile_form' }
          formName={ 'editProfileForm' }
          enableButton={ this.state.enableButton }
          enableInput={ this.state.enableInput }
          errors={ this.state.errors }
          formValid={ this.state.form }
        />
      </>
    )
  }
}

const store = (store) => {
  return {
    auth: store.auth,
    modal: store.modal,
    user: store.user
  }
}

const dispatch = (dispatch) => {
  return {
    onLoadingModal: (bool) => dispatch(loading(bool)),
    onAuthStart: (authType, obj, props) => dispatch(authStart(authType, obj, props)),
    onUpdateUserInfo: (obj, props) => dispatch(updateUserInfo(obj, props)),
    onClearAuthStatus: () => dispatch(clearAuthStatus()),
    onClearAuthErrors: () => dispatch(clearAuthErrors())
  }
}

export default connect(store, dispatch)(DashboardEditProfile)