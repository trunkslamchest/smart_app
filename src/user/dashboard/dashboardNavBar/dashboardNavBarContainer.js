import React from 'react'

import { routes } from '../../../utility/paths.js'

import DashboardNavBarButton from './dashboardNavBarButton'

import './dashboardNavBar.css'
import './dashboardNavBarButton.css'

const DashboardNavBarContainer = (props) => {

  const buttons = [
    { name: 'profile', text: 'My Profile' },
    { name: 'stats', text: 'My Stats' },
    { name: 'votes', text: 'My Votes' },
    { name: 'comments', text: 'My Comments' }
  ]

  const distribButtons = buttons.map(button =>
    <DashboardNavBarButton
      key={buttons.indexOf(button)}
      name={`dashboard_${button.name}_button`}
      link={ routes[`dashboard_${button.name}`] }
    >
      { button.text }
    </DashboardNavBarButton>
  )

  return(
    <div className='dashboard_navbar'>
      <ul>
        { distribButtons }
      </ul>
    </div>
  )
}

export default DashboardNavBarContainer