import React from 'react'

import { connect } from 'react-redux'
import { loading, authStart, updateUserInfo } from '../../../store/actions/actionIndex'

import { routes } from '../../../utility/paths.js'

import DashboardEditProfileForm from './dashboardEditProfileForm/dashboardEditProfileForm'

import './dashboardEditProfile.css'

class DashboardEditProfile extends React.Component {

  state = {
    bio: '',
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
    errors: [],
    pulledStore: false,
    enableButtons: true,
    enableInputs: true
  }

  componentDidMount(){ if(this.props.user.info) this.pulledStore() }

  componentDidUpdate(){ if(this.props.user.info && !this.state.pulledStore)this.pulledStore() }

  pulledStore = () => {
    this.setState({
      bio: this.props.user.info.bio,
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
    let val = event.target.value
    if(event.target.value === "Select") val = 'null'
    this.setState({ [event.target.name]: val })
  }

  onDOBChange = (event) => {
    let val = event.target.value
    if(event.target.value === "Select") val = 'null'
    this.setState({
      dob: {
        ...this.state.dob,
        [event.target.name]: val
      }
    })
  }

  onSubmit = (event) => {
    event.persist()
    event.preventDefault()

    this.setState({ enableButtons: false, enableInputs: false })

    let id = localStorage.id

    this.props.onLoadingModal(true)
    this.props.onAuthStart('editProfile', {
      uid: id,
      info: {
        bio: this.state.bio,
        dob: this.state.dob,
        email: this.state.email,
        first_name: this.state.first_name,
        gender: this.state.gender,
        gender_pronouns: this.state.gender_pronouns,
        last_name: this.state.last_name,
        user_name: this.state.user_name,
        join_date: this.props.user.info.join_date
      }
    })
  }

  onReset = () => {
    this.setState({
      bio: this.props.user.info.bio,
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
      bio: '',
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
      errors: [],
      pulledStore: false,
      enableButtons: true,
      enableInputs: true
    })
  }

  render(){
    return(
      <DashboardEditProfileForm
        bio={ this.state.bio }
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
        onDOBChange={ this.onDOBChange }
        onSubmit={ this.onSubmit }
        onCancel={ this.onCancel }
        onReset={ this.onReset }
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