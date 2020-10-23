import React from 'react'
import { connect} from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import DashboardAchievementCard from './dashboardAchievementCard/dashboardAchievementCard'

import './dashboardAchievementsContainer.css'

class DashboardAchievementsContainer extends React.Component {

  render(){

    let distribUnlockedAchievements, distribLockedAchievements

    if(this.props.achievements.all){
      let allAchievements = Object.entries(this.props.achievements.all)

      if(this.props.user.achievements.unlocked[0] === 'null') distribUnlockedAchievements = <h3>You haven't unlocked any achievements yet</h3>
      else {
        let unlockedAchievements = allAchievements.filter(achievement => this.props.user.achievements.unlocked.includes(achievement[0]))
        distribUnlockedAchievements = unlockedAchievements.map(achievement => {
          return (
            <DashboardAchievementCard
                key={ allAchievements.indexOf(achievement) }
                name={ achievement[0] }
                unlocked={ true }
                achievement={ achievement[1] }
            />
          )
        })
      }

      if(this.props.user.achievements.unlocked.length === this.props.achievements.totals.all) distribLockedAchievements = <h3>You have unlocked all the achievements</h3>
      else {
        let lockedAchievements = allAchievements.filter(achievement => !this.props.user.achievements.unlocked.includes(achievement[0]))
        distribLockedAchievements = lockedAchievements.map(achievement => {
          return (
            <DashboardAchievementCard
                key={ allAchievements.indexOf(achievement) }
                name={ achievement[0] }
                unlocked={ false }
                achievement={ achievement[1] }
            />
          )
        })
      }
    }

    return(
      <div className='dashboard_achievements_container'>
        <div className='dashboard_achievements_header'>
        </div>
        <div className='dashboard_achievements_wrapper'>
          <div className='dashboard_achievements_header'>
            <h3>Unlocked</h3>
            <span>{ this.props.user.achievements.total }/{ this.props.achievements.totals.all }</span>
          </div>
          <div className='dashboard_achievements_sub_container'>
            { distribUnlockedAchievements }
          </div>
        </div>
        <div className='dashboard_achievements_wrapper'>
          <div className='dashboard_achievements_header'>
            <h3>Locked</h3>
            <span>{ this.props.achievements.totals.all - this.props.user.achievements.total }/{ this.props.achievements.totals.all }</span>
          </div>
          <div className='dashboard_achievements_sub_container'>
            { distribLockedAchievements }
          </div>
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