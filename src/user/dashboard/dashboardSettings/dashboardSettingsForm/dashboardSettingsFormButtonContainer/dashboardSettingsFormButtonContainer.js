import React from 'react'

import DashboardSettingsFormButton from '../dashboardSettingsFormButton/dashboardSettingsFormButton'

import './dashboardSettingsFormButtonContainer.css'

const DashboardSettingsFormButtonContainer = (props) => {

  const settingsFormButtons = [
    { name: 'dashboardSettingsSubmit', id: 'dashboardSettingsSubmit', type: 'submit', onClick: props.onSubmit, value: 'Confirm' },
    { name: 'dashboardSettingsReset', id: 'dashboardSettingsReset', type: 'reset', onClick: props.onReset, value: 'Reset' },
    { name: 'dashboardSettingsCancel', id: 'dashboardSettingsCancel', type: 'button', onClick: props.onCancel, value: 'Cancel' }
  ]

  const distribSettingsButtons = settingsFormButtons.map(button => {
    return(
      <DashboardSettingsFormButton
        enableButtons={ props.enableButtons }
        key={ settingsFormButtons.indexOf(button) }
        id={ button.id }
        name={ button.name }
        onClickFunctions={ button.onClick }
        type={ button.type }
        value={ button.value }
      />
    )
  })

  return(
    <div className='sign_up_buttons_container'>
      { distribSettingsButtons }
    </div>
  )
}

export default DashboardSettingsFormButtonContainer