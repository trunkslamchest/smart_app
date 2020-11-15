import React from 'react'
import { connect } from 'react-redux'

import ContainerHeaderCentered from '../../../UI/components/headers/containerHeaderCentered/containerHeaderCentered'

import './userProfileStatsContainer.css'

const UserProfileStatsContainer = (props) => {

  let statsBlock =
    <div className='user_profile_stats_sub_container'>
      <div className='user_profile_stats_questions_container'>
        <div className="user_profile_answered_container">
          <div className="user_profile_answered_sub_container">
            <h5>Correct Answers</h5>
            <span>{ props.profile.userData.questions.all.correct }</span>
          </div>
          <div className="user_profile_answered_sub_container">
            <h5>Total Answers</h5>
            <span>{ props.profile.userData.questions.all.answered }</span>
          </div>
        </div>
        <div className="user_profile_answered_container">
          <div className="user_profile_answered_sub_container">
            <h5>Average Time</h5>
            <span>{ props.profile.userData.questions.all.avg_time } seconds</span>
          </div>
          <div className="user_profile_answered_sub_container">
            <h5>Outta Times</h5>
            <span>{ props.profile.userData.questions.all.outta_times }</span>
          </div>
        </div>
      </div>
      <div className="user_profile_stats_rank_rating_container">
        <div className="user_profile_stats_rank_container">
          <h2>Rank</h2>
          <h1>{ props.profile.userData.questions.all.answered < 5 ? "NR" : props.profile.userData.questions.all.rank }</h1>
        </div>
        <div className="user_profile_stats_rating_container">
          <h2>Rating</h2>
          <h1>{ props.profile.userData.questions.all.answered < 5 ? "NR" : props.profile.userData.questions.all.rating }</h1>
        </div>
      </div>
  </div>

  return(
    <div className="user_profile_stats_container">
      <ContainerHeaderCentered header_text={ 'Statistics' } />
      { statsBlock }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps)(UserProfileStatsContainer)
