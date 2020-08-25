import React from 'react'

import DashboardEditProfileFormInput from './dashboardEditProfileFormInput'
import DashboardEditProfileFormSelect from './dashboardEditProfileFormSelect'
import DashboardEditProfileFormButtonContainer from './dashboardEditProfileFormButtonContainer'

import genders from '../../../datasets/genders'
import months from '../../../datasets/months'

// import ErrorContainer from '../../../error/errorContainer'

const dashboardEditProfileForm = (props) => {
  return(
    <>
      <div className='alt_header'>
        <h3>Edit Profile</h3>
      </div>
      <form
        id='edit_profile_form'
        name='edit_profile_form'
        className='edit_profile_form'
      >
        <div className='edit_div'>
          <label>User Name</label>
          <DashboardEditProfileFormInput
            type='text'
            id='user_name'
            name='user_name'
            placeholder='User Name'
            onChange={props.onChange}
            value={props.user_name}
          />
          {/* {props.errors.user_name ? <ErrorContainer errors={props.errors.user_name} /> : null } */}
        </div>
        <div className='edit_div'>
          <label>Email</label>
          <DashboardEditProfileFormInput
            type='text'
            id='email'
            name='email'
            placeholder='Email'
            onChange={props.onChange}
            value={props.email}
          />
          {/* {props.errors.email ? <ErrorContainer errors={props.errors.email} /> : null } */}
        </div>
        <div className='edit_div'>
          <label>Name</label>
          <DashboardEditProfileFormInput
            type='text'
            id='first_name'
            name='first_name'
            placeholder='First Name'
            onChange={props.onChange}
            value={props.first_name}
          />
          {/* {props.errors.first_name ? <ErrorContainer errors={props.errors.first_name} /> : null } */}
          <DashboardEditProfileFormInput
            type='text'
            id='last_name'
            name='last_name'
            placeholder='Last Name'
            onChange={props.onChange}
            value={props.last_name}
          />
          {/* {props.errors.last_name ? <ErrorContainer errors={props.errors.last_name} /> : null } */}
        </div>
        <div className='edit_div'>
          <DashboardEditProfileFormSelect
            label='Gender'
            id='gender'
            name='gender'
            options={genders}
            onChange={props.onChange}
            value={props.gender}
          />
          {/* {props.errors.gender ? <ErrorContainer errors={props.errors.gender} /> : null } */}
        </div>
        <div className='edit_div'>
          <label>Date of Birth</label>
            <DashboardEditProfileFormInput
              type='number'
              id='day'
              name='day'
              min='1'
              max='31'
              placeholder='Day'
              onChange={props.onDOBChange}
              value={props.dob.day}
            />
            {/* {props.errors.dob.day ? <ErrorContainer errors={props.errors.dob.day} /> : null } */}
            <DashboardEditProfileFormSelect
              id='month'
              name='month'
              options={months}
              onChange={props.onDOBChange}
              value={props.dob.month}
            />
            {/* {props.errors.dob.month ? <ErrorContainer errors={props.errors.dob.month} /> : null } */}
            <DashboardEditProfileFormInput
              type='number'
              id='year'
              name='year'
              min='1900'
              max='2020'
              placeholder='Year'
              onChange={props.onDOBChange}
              value={props.dob.year}
            />
            {/* {props.errors.dob.year ? <ErrorContainer errors={props.errors.dob.year} /> : null } */}
        </div>
        <DashboardEditProfileFormButtonContainer
          onSubmit={props.onSubmit}
          onReset={props.onReset}
          onCancel={props.onCancel}
        />
      </form>
    </>
  )
}

export default dashboardEditProfileForm