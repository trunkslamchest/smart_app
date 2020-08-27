import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../../store/actions/actionIndex'

import { routes } from '../../../utility/paths.js'

import DashboardEditProfileForm from './dashboardEditProfileForm'

import './dashboardEditProfile.css'

class DashboardEditProfile extends React.Component {

  state = {
    dob: {
      day: '',
      month: '',
      year: ''
    },
    email: '',
    first_name: '',
    gender: '',
    last_name: '',
    user_name: '',
    errors: [],
    pulledStore: false
  }

  componentDidMount(){ if(this.props.user.info) this.pulledStore() }
  componentDidUpdate(){ if(this.props.user.info && !this.state.pulledStore)this.pulledStore() }

  pulledStore = () => {
    this.setState({
      dob: this.props.user.info.dob,
      email: this.props.user.info.email,
      first_name: this.props.user.info.first_name,
      gender: this.props.user.info.gender,
      last_name: this.props.user.info.last_name,
      user_name: this.props.user.info.user_name,
      pulledStore: true
    })
  }

  onChange = (event) => {this.setState({ [event.target.name]: event.target.value })}

  onDOBChange = (event) => {
    this.setState({
      dob: {
        ...this.state.dob,
        [event.target.name]: event.target.value
      }
    })
  }

  onSubmit = (event) => {
    event.persist()
    event.preventDefault()

    let id = localStorage.id
    let userObj = {
      uid: id,
      info: {
        dob: this.state.dob,
        email: this.state.email,
        first_name: this.state.first_name,
        gender: this.state.gender,
        last_name: this.state.last_name,
        user_name: this.state.user_name,
        join_date: this.props.user.info.join_date
      }
    }
    this.props.onUpdateUserInfo(userObj, this.props)
  }

  onReset = (event) => {
    event.persist()
    event.preventDefault()
    this.setState({
      dob: this.props.user.info.dob,
      email: this.props.user.info.email,
      first_name: this.props.user.info.first_name,
      gender: this.props.user.info.gender,
      last_name: this.props.user.info.last_name,
      user_name: this.props.user.info.user_name,
    })

  }

  onCancel = (event) => { this.props.history.push( routes.dashboard_profile ) }

  componentWillUnmount(){
    this.setState({
      pulledStore: false
    })
  }

  render(){
    return(
      <DashboardEditProfileForm
        errors={this.state.errors}
        onChange={this.onChange}
        onDOBChange={this.onDOBChange}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
        onReset={this.onReset}
        dob={this.state.dob}
        email={this.state.email}
        first_name={this.state.first_name}
        gender={this.state.gender}
        last_name={this.state.last_name}
        user_name={this.state.user_name}
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
    onUpdateUserInfo: (obj, props) => dispatch(actions.updateUserInfo(obj, props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardEditProfile)