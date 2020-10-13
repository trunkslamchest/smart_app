import React from 'react'

import DashboardEditProfileFormInput from './dashboardEditProfileFormInput/dashboardEditProfileFormInput'
import DashboardEditProfileFormSelect from './dashboardEditProfileFormSelect/dashboardEditProfileFormSelect'
import DashboardEditProfileFormButtonContainer from './dashboardEditProfileFormButtonContainer/dashboardEditProfileFormButtonContainer'

import genders from '../../../../datasets/genders'
import months from '../../../../datasets/months'

import './dashboardEditProfileForm.css'

const dashboardEditProfileForm = (props) => {

  const fields = [
    [ 1, { type: 'text', idName: 'user_name', placeholder: 'User Name...', label: 'User Name' }],
    [ 2, { type: 'text', idName: 'email', placeholder: 'Email...', label: 'Email' }],
    [ 3, { type: 'text', idName: 'first_name', placeholder: 'First Name...' }],
    [ 4, { type: 'text', idName: 'last_name', placeholder: 'Last Name...' }],
    [ 5, { type: 'select', idName: 'gender', label: 'Gender', options: genders, change: props.onChange, val: props.gender }],
    [ 6, { type: 'number', idName: 'day', placeholder: 'Day...', min: 1, max: 31, change: props.onDOBChange, val: props.dob.day }],
    [ 7, { type: 'select', idName: 'month', options: months, change: props.onDOBChange, val: props.dob.month }],
    [ 8, { type: 'number', idName: 'year', placeholder: 'Year...', min: 1900, max: 2020, change: props.onDOBChange, val: props.dob.year }],
  ]

  const distribFields = fields.map(field => {
    let component = <></>
    if(field[1].type === 'text'){
      component = <>
        <DashboardEditProfileFormInput
          enableInputs={ props.enableInputs }
          id={ field[1].idName }
          key={ field[0] }
          name={ field[1].idName }
          onChange={ props.onChange }
          placeholder={ field[1].placeholder }
          type={ field[1].type }
          value={ props[field[1].idName] === 'null' ? field[1].placeholder : props[field[1].idName] }
        />
      </>
    }
    if(field[1].type === 'number'){
      component = <>
        <DashboardEditProfileFormInput
          enableInputs={ props.enableInputs }
          id={ field[1].idName }
          key={ field[0] }
          max={ field[1].max }
          min={ field[1].min }
          name={ field[1].idName }
          onChange={ field[1].change }
          placeholder={ field[1].placeholder }
          type={ field[1].type }
          value={ props.dob[field[1].idName] === 0 ? field[1].val : props.dob[field[1].idName] }
        />
      </>
    }
    if(field[1].type === 'select'){
      component = <>
        <DashboardEditProfileFormSelect
          enableInputs={ props.enableInputs }
          id={ field[1].idName }
          key={ field[0] }
          name={ field[1].idName }
          onChange={ field[1].change }
          options={ field[1].options }
          value={ field[1].val }
        />
      </>
    }
    return component
  })

  return(
    <>
      <div className='edit_profile_form_header'>
        <h3>Edit Profile</h3>
      </div>
      <form
        id='edit_profile_form'
        name='edit_profile_form'
        className='edit_profile_form'
      >
        <label>User Name</label><div className='edit_div'>{ distribFields[0] }</div>
        <label>Email</label><div className='edit_div'>{ distribFields[1] }</div>
        <label>Name</label><div className='edit_div'>{ distribFields[2] }<br />{ distribFields[3] }</div>
        <label>Gender</label><div className='edit_div'>{ distribFields[4] }</div>
        <label>Date Of Birth</label><div className='edit_div'>{ distribFields[5] }<br />{ distribFields[6] }<br />{ distribFields[7] }</div>
        <DashboardEditProfileFormButtonContainer
          enableButtons={ props.enableButtons }
          onSubmit={ props.onSubmit }
          onReset={ props.onReset }
          onCancel={ props.onCancel }
        />
      </form>
    </>
  )
}

export default dashboardEditProfileForm