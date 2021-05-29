import React from 'react'
import { connect } from 'react-redux'

import DashboardHeader from '../../../../user/dashboard/dashboardComponents/dashboardHeader/dashboardHeader'
import ContainerHeader from '../../headers/containerHeader/containerHeader'
import UserAchievementCard from './userAchievementCard/userAchievementCard'

import './userAchievementsContainer.css'

const UserAchievementsContainer = (props) => {

  let distribUnlockedAchievements,
      distribLockedAchievements,
      achievementsBlock,
      headerText,
      headerText2

  let componentClasses = {
    container: props.from_dashboard ? 'user_achievements_profile_container' : 'user_achievements_container',
    subContainerLocked: 'user_achievements_sub_container user_achievements_sub_container_locked',
    subContainerUnlocked: props.userAchievements.unlocked[0] === 'null' ? 'user_achievements_sub_container user_achievements_sub_container_no_achievements' : 'user_achievements_sub_container user_achievements_sub_container_unlocked',
    wrapper: 'user_achievements_wrapper',
  }

  if(props.achievements.totals.all && props.userAchievements){

    let allAchievements = Object.entries(props.achievements.all)

    headerText = 'Achievements'

    if(props.userAchievements.unlocked[0] === 'null') distribUnlockedAchievements = <h3>{ props.userName } has not unlocked any achievements yet</h3>
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
      if(props.userAchievements.unlocked[0] === 'null') distribUnlockedAchievements = <h3>You have not unlocked any achievements yet</h3>
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
    <div className={ componentClasses.container }>
      <div className={ componentClasses.wrapper }>
        <ContainerHeader header_text={ headerText } sub_text={ `${props.userAchievements.total}/${props.achievements.totals.all}` } />
        <div className={ componentClasses.subContainerUnlocked }>
          { distribUnlockedAchievements }
        </div>
      </div>
      { props.from_dashboard &&
        <>
          <div className={ componentClasses.wrapper }>
            <ContainerHeader header_text={ headerText2 } sub_text={ `${props.achievements.totals.all - props.userAchievements.total}/${props.achievements.totals.all}` } />
            <div className={ componentClasses.subContainerLocked }>
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