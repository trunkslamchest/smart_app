import React from 'react'

import { connect } from 'react-redux'
import { loading, authStart, updateUserInfo } from '../../../store/actions/actionIndex'

import { routes } from '../../../utility/paths.js'

import DashboardEditProfileForm from './dashboardEditProfileForm/dashboardEditProfileForm'

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
    pulledStore: false,
    enableButtons: true,
    enableInputs: true
  }

  componentDidMount(){ if(this.props.user.info) this.pulledStore() }

  componentDidUpdate(){ if(this.props.user.info && !this.state.pulledStore)this.pulledStore() }

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
    this.setState({ [event.target.name]: val })
  }

  onDOBChange = (event) => {
    let val = event.target.value === "Select" ? "null" : typeof event.target.value === 'string' ? event.target.value : parseInt(event.target.value)
    this.setState({ dob: { ...this.state.dob, [event.target.name]: val } })
  }

  onAvatarChange = (event) => {
    if(this.state.errors.avatar) this.setState({ errors: { ...this.state.errors, avatar: null } })
    const reader = new FileReader(), img = new Image(), imgSize = event.target.files[0].size
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
          else this.setState({ avatar: reader.result })
        }
      }
    }
  }

  onSubmit = (event) => {
    event.persist()
    event.preventDefault()

    this.setState({ enableButtons: false, enableInputs: false })

    this.props.onLoadingModal(true)
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
    })

  }

  onCancel = () => { this.props.history.push( routes.dashboard_profile ) }

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
      pulledStore: false,
      enableButtons: true,
      enableInputs: true
    })
  }

  render(){
    return(
      <DashboardEditProfileForm
        avatar={ this.state.avatar }
        bio={ this.state.bio }
        country={ this.state.country }
        dob={ this.state.dob }
        email={ this.state.email }
        enableButtons={ this.state.enableButtons }
        enableInputs={ this.state.enableInputs }
        errors={ this.state.errors }
        first_name={ this.state.first_name }
        gender={ this.state.gender }
        gender_pronouns={ this.state.gender_pronouns }
        last_name={ this.state.last_name }
        onChange={ this.onChange }
        onAvatarChange={ this.onAvatarChange }
        onDOBChange={ this.onDOBChange }
        onCancel={ this.onCancel }
        onReset={ this.onReset }
        onSubmit={ this.onSubmit }
        user_name={ this.state.user_name }
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadingModal: (bool) => dispatch(loading(bool)),
    onAuthStart: (authType, obj, props) => dispatch(authStart(authType, obj, props)),
    onUpdateUserInfo: (obj, props) => dispatch(updateUserInfo(obj, props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardEditProfile)