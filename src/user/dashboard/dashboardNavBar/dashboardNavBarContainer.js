import React from 'react'

import { routes } from '../../../utility/paths.js'

import DashboardNavBarButton from './dashboardNavBarButton/dashboardNavBarButton'

import './dashboardNavBar.css'

const DashboardNavBarContainer = (props) => {

  const buttons = [
    { name: 'profile', text: 'Profile' },
    { name: 'stats', text: 'Stats' },
    { name: 'answers', text: 'Answers' },
    { name: 'achievements', text: 'Achievements' }
  ]

  const distribButtons = buttons.map(button =>
    <DashboardNavBarButton
      key={ buttons.indexOf(button) }
      link={ routes[`dashboard_${button.name}`] }
      name={`dashboard_${button.name}_button`}
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