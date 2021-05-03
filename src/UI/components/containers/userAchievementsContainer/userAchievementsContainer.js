import React from 'react'
// import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import DashboardHeader from '../../../../user/dashboard/dashboardComponents/dashboardHeader/dashboardHeader'
import ContainerHeader from '../../headers/containerHeader/containerHeader'

import UserAchievementCard from './userAchievementCard/userAchievementCard'

import './userAchievementsContainer.css'

class UserAchievementsContainer extends React.Component {

  render(){

    let distribUnlockedAchievements, distribLockedAchievements, achievementsBlock, headerText, headerText2

    if(this.props.all_achievements.all && this.props.user_achievements){

      let allAchievements = Object.entries(this.props.all_achievements.all)

      headerText = 'Achievements'

      if(this.props.user_achievements.unlocked[0] === 'null') distribUnlockedAchievements = <h3>{ this.props.user_name } hasn't unlocked any achievements yet</h3>
      else {
        let unlockedAchievements = allAchievements.filter(achievement => this.props.user_achievements.unlocked.includes(achievement[0]))
        distribUnlockedAchievements = unlockedAchievements.map((achievement, index) => {
          return (
            <UserAchievementCard
                key={ index }
                name={ achievement[0] }
                unlocked={ true }
                achievement={ achievement[1] }
            />
          )
        })
      }

      if(this.props.from_dashboard){
        headerText = 'Unlocked'
        headerText2 = 'Locked'
        if(this.props.user_achievements.unlocked[0] === 'null') distribUnlockedAchievements = <h3>You haven't unlocked any achievements yet</h3>
        if(this.props.user_achievements.unlocked.length === this.props.all_achievements.totals.all) distribLockedAchievements = <h3>You have unlocked all the achievements</h3>
        else {
          let lockedAchievements = allAchievements.filter(achievement => !this.props.user_achievements.unlocked.includes(achievement[0]))
          distribLockedAchievements = lockedAchievements.map((achievement, index) => {
            return (
              <UserAchievementCard
                  key={ index }
                  name={ achievement[0] }
                  unlocked={ false }
                  achievement={ achievement[1] }
              />
            )
          })
        }
      }

      achievementsBlock =
      <div className='user_achievements_container'>
        <div className='user_achievements_wrapper'>
          { this.props.from_dashboard && <ContainerHeader header_text={ headerText } sub_text={ `${this.props.user_achievements.total}/${this.props.all_achievements.totals.all}` } /> }
          { !this.props.from_dashboard && <ContainerHeader header_text={ headerText } sub_text={ `${this.props.user_achievements.total}/${this.props.all_achievements.totals.all}` } /> }
          <div className='divider_left' />
          <div className='user_achievements_sub_container'>
            { distribUnlockedAchievements }
          </div>
          <div className='divider_left' />
        </div>
        { this.props.from_dashboard &&
          <>
            <div className='user_achievements_wrapper'>
              <ContainerHeader header_text={ headerText2 } sub_text={ `${this.props.all_achievements.totals.all - this.props.user_achievements.total}/${this.props.all_achievements.totals.all}` } />
              <div className='divider_left' />
              <div className='user_achievements_sub_container'>
                { distribLockedAchievements }
              </div>
            </div>
            <div className='divider_left' />
          </>
        }
      </div>
    }

    return(
      <>
        { this.props.from_dashboard && <DashboardHeader header_text={ 'Achievements' }/> }
        { achievementsBlock }
      </>
    )
  }
}

export default UserAchievementsContainer