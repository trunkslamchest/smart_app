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
          name='dashboard_stats_button'
          link={ routes.dashboard_stats }
        >
          My Stats
        </DashboardNavBarButton>
        <DashboardNavBarButton
          name='dashboard_votes_button'
          link={ routes.dashboard_votes }
        >
          My Votes
        </DashboardNavBarButton>
        <DashboardNavBarButton
          name='dashboard_comments_button'
          link={ routes.dashboard_comments }
        >
          My Comments
        </DashboardNavBarButton>
        <DashboardNavBarButton
          name='dashboard_test_button'
          link={ routes.dashboard_test }
        >
          Test
        </DashboardNavBarButton>
      </ul>
    </div>
  )
}

export default DashboardNavBarContainer