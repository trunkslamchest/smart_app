import React from 'react'

import { routes } from '../../../utility/paths.js'

import DashboardNavBarButton from './dashboardNavBarButton'

import './dashboardNavBar.css'
import './dashboardNavBarButton.css'

const DashboardNavBarContainer = (props) => {
  return(
    <div className='dashboard_navbar'>
      <ul>
        <DashboardNavBarButton
          name='dashboard_user_info_button'
          link={ routes.dashboard_profile }
        >
          My Profile
        </DashboardNavBarButton>
        <DashboardNavBarButton
          name='dashboard_test_button'
          link={ routes.dashboard_test }
        >
          Test Page
        </DashboardNavBarButton>
      </ul>
    </div>
  )
}

export default DashboardNavBarContainer