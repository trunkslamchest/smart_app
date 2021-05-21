import React from 'react'
import { connect } from 'react-redux'

import DashboardHeader from '../../../../user/dashboard/dashboardComponents/dashboardHeader/dashboardHeader'
import ContainerHeader from '../../headers/containerHeader/containerHeader'
import UserAchievementCard from './userAchievementCard/userAchievementCard'

import './userAchievementsContainer.css'

const UserAchievementsContainer = (props) => {

  let distribUnlockedAchievements, distribLockedAchievements, achievementsBlock, headerText, headerText2

  if(props.achievements.totals.all && props.userAchievements){

    let allAchievements = Object.entries(props.achievements.all)

    headerText = 'Achievements'

    if(props.userAchievements.unlocked[0] === 'null') distribUnlockedAchievements = <h3>{ props.userName } hasn't unlocked any achievements yet</h3>
    else {
      let unlockedAchievements = allAchievements.filter(achievement => props.userAchievements.unlocked.includes(achievement[0]))
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

    if(props.from_dashboard){
      headerText = 'Unlocked'
      headerText2 = 'Locked'
      if(props.userAchievements.unlocked[0] === 'null') distribUnlockedAchievements = <h3>You haven't unlocked any achievements yet</h3>
      if(props.userAchievements.unlocked.length === props.achievements.totals.all) distribLockedAchievements = <h3>You have unlocked all the achievements</h3>
      else {
        let lockedAchievements = allAchievements.filter(achievement => !props.userAchievements.unlocked.includes(achievement[0]))
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
        { props.from_dashboard && <ContainerHeader header_text={ headerText } sub_text={ `${props.userAchievements.total}/${props.achievements.totals.all}` } /> }
        { !props.from_dashboard && <ContainerHeader header_text={ headerText } sub_text={ `${props.userAchievements.total}/${props.achievements.totals.all}` } /> }
        <div className='divider_left' />
        <div className='user_achievements_sub_container'>
          { distribUnlockedAchievements }
        </div>
        <div className='divider_left' />
      </div>
      { props.from_dashboard &&
        <>
          <div className='user_achievements_wrapper'>
            <ContainerHeader header_text={ headerText2 } sub_text={ `${props.achievements.totals.all - props.userAchievements.total}/${props.achievements.totals.all}` } />
            <div className='divider_left' />
            <div className='user_achievements_sub_container'>
              { distribLockedAchievements }
            </div>
          </div>
        </>
      }
    </div>
  }

  return(
    <>
      { props.from_dashboard && <DashboardHeader header_text={ 'Achievements' }/> }
      { achievementsBlock }
    </>
  )
}

const store = (store) => {
  return {
    achievements: store.achievements,
    userAchievements: store.profile.userData ? store.profile.userData.achievements : store.user.achievements,
    userName: store.profile.userData ? store.profile.userData.info.user_name : store.user.info.user_name,
  }
}

export default connect(store)(UserAchievementsContainer)