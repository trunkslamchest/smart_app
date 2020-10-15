import React from 'react'
import { connect} from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import DashboardAchievementCard from './dashboardAchievementCard/dashboardAchievementCard'

import './dashboardAchievementsContainer.css'

class DashboardAchievementsContainer extends React.Component {

  render(){

    let distribUnlockedAchievements

    if(this.props.achievements.all){
      let achievements = Object.entries(this.props.achievements.all)
      distribUnlockedAchievements = achievements.map(achievement => {
        return (
          <DashboardAchievementCard
              key={ achievements.indexOf(achievement) }
              name={ achievement[0] }
              achievement={ achievement[1] }
          />
        )
      })
    }

    return(
      <div className='dashboard_achievements_container'>
        <div className='dashboard_achievements_header'>
          <span>Achievements: { this.props.user.achievements.total }/{ this.props.achievements.totals.all }</span>
        </div>
        <div className='dashboard_achievements_unlocked_container'>
          <h3>Unlocked</h3>
          <div className='dashboard_achievements_unlocked_sub_container'>
            { distribUnlockedAchievements }
          </div>
        </div>
        <div className='dashboard_achievements_locked_container'>
          <h3>Locked</h3>
          {/* { distriblockedAchievements } */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    achievements: state.achievements,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAchievementsContainer)