import React from 'react'
import { connect } from 'react-redux'

import './userProfileStatsContainer.css'

const UserProfileStatsContainer = (props) => {

  let statsBlock = <></>

  if(!!props.profile.userData.questions){
    statsBlock = 
      <>
        <div className='user_profile_stats_sub_container'>
          <div className="user_profile_rank_rating_container">
            <div className="user_profile_rank_container">
              <h5>Rank</h5>
              <span>{ props.profile.userData.questions.all.answered < 5 ? "NR" : props.profile.userData.questions.all.rank }</span>
            </div>
            <div className="user_profile_rating_container">
              <h5>Rating</h5>
              <span>{ props.profile.userData.questions.all.answered < 5 ? "NR" : props.profile.userData.questions.all.rating }</span>
            </div>
          </div>
          <div className="user_profile_answered_container">
            <div className="user_profile_answered_correct_container">
              <h5>Correct Answers</h5>
              <span>{ props.profile.userData.questions.all.correct }</span>
            </div>
            <div className="user_profile_answered_total_container">
              <h5>Total Answers</h5>
              <span>{ props.profile.userData.questions.all.answered }</span>
            </div>
          </div>
          <div className="user_profile_time_container">
            <div className="user_profile_average_time_container">
              <h5>Average Time</h5>
              <span>{ props.profile.userData.questions.all.avg_time } seconds</span>
            </div>
            <div className="user_profile_outta_times_container">
              <h5>Outta Times</h5>
              <span>{ props.profile.userData.questions.all.outta_times }</span>
            </div>
          </div>
          <div className="user_profile_votes_container">
            <div className="user_profile_votes_sub_container">
              <h5>Total Votes</h5>
              <span>{ props.profile.userData.questions.all.votes.total }</span>
            </div>
            <div className="user_profile_votes_sub_container">
              <h5>Up Votes</h5>
              <span>{ props.profile.userData.questions.all.votes.good }</span>
            </div>
            <div className="user_profile_votes_sub_container">
              <h5>No Votes</h5>
              <span>{ props.profile.userData.questions.all.votes.neutral }</span>
            </div>
            <div className="user_profile_votes_sub_container">
              <h5>Down Votes</h5>
              <span>{ props.profile.userData.questions.all.votes.bad }</span>
            </div>
          </div>
        </div>
        <div className="user_profile_comments_container">
          <h4>Comments</h4>
          <h5>Total: { props.profile.userData.questions.all.comments.total } </h5>

          <div className="user_profile_comments_sub_container">
            <span>comments_temp</span>
          </div>
        </div>
      </>
  }

  return(
    <div className="user_profile_stats_container">
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
