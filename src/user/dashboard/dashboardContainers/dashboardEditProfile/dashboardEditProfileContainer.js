import React from 'react'
import { withRouter } from 'react-router-dom'
import { routes } from '../../../../utility/paths.js'
import { connect } from 'react-redux'
import {
  editProfile,
  loading,
  authStart,
  cacheUser,
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

  componentDidMount(){ if(this.props.userInfo) this.pulledStore() }

  componentDidUpdate() {
    if(this.props.userInfo && !this.state.pulledStore) this.pulledStore()
    if(!this.props.modalLoading && (!this.state.enableButton || !this.state.enableInput)) this.setState({ enableButton: true, enableInput: true })
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
      avatar: this.props.userInfo.avatar,
      bio: this.props.userInfo.bio,
      country: this.props.userInfo.country,
      dob: this.props.userInfo.dob,
      email: this.props.userInfo.email,
      first_name: this.props.userInfo.first_name,
      gender: this.props.userInfo.gender,
      gender_pronouns: this.props.userInfo.gender_pronouns,
      last_name: this.props.userInfo.last_name,
      user_name: this.props.userInfo.user_name,
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
          console.log(imgSize)
          // if(img.width !== 150 || img.height !== 150) imgErrors.push("Profile Pictures must be 150x150 in dimension")
          // if(imgSize > 5000) imgErrors.push("Profile Pictures must less than 5kb in size")
          if(img.height > 200) imgErrors.push("Profile Pictures cannot be larger than 200 pixels in height")
          if(img.width > 200) imgErrors.push("Profile Pictures cannot be larger than 200 pixels in width")
          if(imgSize > 3072000) imgErrors.push("Profile Pictures cannot be larger than 3mb in size")
          if(imgErrors.length > 0) this.setState({ errors:  { ...this.state.errors, avatar: imgErrors } })
          else this.setState({ avatar: reader.result })
        }
      }
    }
    event.target.value = null
  }

  onSubmit = (event) => {
    event.persist()
    event.preventDefault()
    this.onValidateEditProfile()
  }


  onValidateEditProfile = () => {
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
    if(formCheck.valid) {
      if(this.state.email !== this.props.userInfo.email) {
        this.props.onEditProfileModal(true)
        this.props.onCacheUser({
          uid: this.props.authId,
          old_email: this.props.userInfo.email,
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
            join_date: this.props.userInfo.join_date,
            last_login: this.props.userInfo.last_login
          }
        })
      } else {
        if(!!this.props.authErrors.length) this.props.onClearAuthErrors()
        this.props.onLoadingModal(true)
        this.checkUserExists()
      }
    }
    else this.props.onLoadingModal(false)
  }

  checkUserExists = () => {
    checkFunctions('checkUserName', check.user_name, { old_user_name: this.props.userInfo.user_name, new_user_name: this.state.user_name, type: 'editProfile' })
    .then(resObj => {
      if(!resObj.valid) {
        this.props.onLoadingModal(false)
        this.setState({ form: { valid: false, user_name: { valid: resObj.valid, errors: [ resObj.errors ] }, pending: false  } })
      }
      else this.onValidation()
    })
  }

  onValidation = () => {
    if(!this.state.form.pending && this.state.enableButton){
      this.props.onLoadingModal(true)
      this.props.onAuthStart('editProfile', {
        uid: this.props.authId,
        old_user_name: this.props.userInfo.user_name,
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
          join_date: this.props.userInfo.join_date,
          last_login: this.props.userInfo.last_login
        }
      })
    }
  }

  onReset = () => {
    this.setState({
      avatar: this.props.userInfo.avatar,
      bio: this.props.userInfo.bio,
      country: this.props.userInfo.country,
      dob: this.props.userInfo.dob,
      email: this.props.userInfo.email,
      first_name: this.props.userInfo.first_name,
      gender: this.props.userInfo.gender,
      gender_pronouns: this.props.userInfo.gender_pronouns,
      last_name: this.props.userInfo.last_name,
      user_name: this.props.userInfo.user_name,
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
          buttonContainerClass={ 'dashboard_form_buttons_container' }
          buttonRow={ true }
          // dividers={ true }
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
    authErrors: store.auth.errors,
    authId: store.auth.id,
    modalLoading: store.modal.loading,
    userInfo: store.user.info
  }
}

const dispatch = (dispatch) => {
  return {
    onEditProfileModal: (bool) => dispatch(editProfile(bool)),
    onLoadingModal: (bool) => dispatch(loading(bool)),
    onCacheUser: (obj) => dispatch(cacheUser(obj)),
    onAuthStart: (authType, obj, props) => dispatch(authStart(authType, obj, props)),
    onClearAuthStatus: () => dispatch(clearAuthStatus()),
    onClearAuthErrors: () => dispatch(clearAuthErrors())
  }
}

export default withRouter(connect(store, dispatch)(DashboardEditProfile))