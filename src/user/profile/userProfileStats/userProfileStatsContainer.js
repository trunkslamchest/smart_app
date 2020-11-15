import React from 'react'
import { connect } from 'react-redux'

import calcVotePercents from '../../../utility/calculation/calcVotePercents'
import calcVoteAvg from '../../../utility/calculation/calcVoteAvg'
import roundVoteAverageForStarRating from '../../../utility/calculation/roundVoteAverageForStarRating'
import roundVoteAverage from '../../../utility/calculation/roundVoteAverage'

import ContainerHeaderCentered from '../../../UI/components/headers/containerHeaderCentered/containerHeaderCentered'

import { voteStarsRatingIndex } from '../../../assets/vote_stars/voteStarsRatingIndex'

import './userProfileStatsContainer.css'
import './userProfileStatsVotesContainer.css'

const UserProfileStatsContainer = (props) => {

    let voteProps = props.profile.userData.questions.all.votes
    let votePercents = calcVotePercents(props.profile.userData.questions.all.votes)
    let voteAvg = calcVoteAvg(voteProps)

    const voteTotals = [
      { alt: '5_star_rating', img: voteStarsRatingIndex.FiveStars, name: 'five_star_rating', title: '5 Star Rating', percent: votePercents.FiveStars, totals: voteProps.FiveStars },
      { alt: '4_star_rating', img: voteStarsRatingIndex.FourStars, name: 'four_star_rating', title: '4 Star Rating', percent: votePercents.FourStars, totals: voteProps.FourStars },
      { alt: '3_star_rating', img: voteStarsRatingIndex.ThreeStars, name: 'three_star_rating', title: '3 Star Rating', percent: votePercents.ThreeStars, totals: voteProps.ThreeStars },
      { alt: '2_star_rating', img: voteStarsRatingIndex.TwoStars, name: 'two_star_rating', title: '2 Star Rating', percent: votePercents.TwoStars, totals: voteProps.TwoStars },
      { alt: '1_star_rating', img: voteStarsRatingIndex.OneStars, name: 'one_star_rating', title: '1 Star Rating', percent: votePercents.OneStars, totals: voteProps.OneStars },
      { alt: 'no_star_rating', img: voteStarsRatingIndex.ZeroStars, name: 'zero_star_rating', title: 'No Star Rating', percent: votePercents.ZeroStars, totals: voteProps.ZeroStars }
    ]

    const distribVoteTotals = voteTotals.map((voteTotal, index) => {
      return(
        <div className='user_profile_stats_totals_graph_row_container' key={ index } >
          <div className='user_profile_stats_totals_graph_row_container_left'>
            <img alt={ voteTotal.alt } name={ voteTotal.name } src={ voteTotal.img } title={ voteTotal.title } />
          </div>
          <div className='user_profile_stats_totals_graph_row_container_center'>
            <div
              style={{
                display: 'flex',
                color: 'rgba(255, 255, 255, 1)',
                justifyContent: `${ voteTotal.percent < 7.5 ? "flex-start" : "flex-end" }`,
                alignContent: 'flex-end',
                alignItems: 'flex-end',
                alignSelf: 'stretch',
                boxSizing: "border-box",
                background: 'rgba(23, 90, 54, 1)',
                padding: '2.5px 5px',
                width: `${ voteTotal.percent }%`
              }}
            >
              <span>{ voteTotal.percent }%</span>
            </div>
          </div>
          <div className='user_profile_stats_totals_graph_row_container_right'>
            <span>{ voteTotal.totals } { voteTotal.totals === 1 ? 'vote' : 'votes'}</span>
          </div>
        </div>
      )
    })

  let votesBlock =
      <div className="user_profile_stats_vote_container">
        <div className='user_profile_stats_vote_totals_graph_container'>
          <div className='user_profile_stats_totals_graph_sub_header_container'>
            <div className='user_profile_stats_totals_graph_sub_header_container_left'>
              <div className='user_profile_stats_vote_average_vote_img_container'>
                <div alt='avg_user_rating' name='avg_user_rating' title='Average User Rating'
                  style={{
                    alignSelf: 'stretch',
                    backgroundImage: `url(${voteStarsRatingIndex.AverageStars})`,
                    backgroundRepeat: 'no-repeat',
                    width: `${ roundVoteAverageForStarRating(voteAvg.total) }%`
                  }}
                />
              </div>
              <span>{ roundVoteAverage(voteAvg.total) } { voteProps.total === 1 ? 'Star' : 'Stars' }</span>
            </div>
            <div className='user_profile_stats_totals_graph_sub_header_container_center'></div>
            <div className='user_profile_stats_totals_graph_sub_header_container_right'>
              <span>{ voteProps.total } total { voteProps.total === 1 ? 'vote' : 'votes'}</span>
            </div>
          </div>
          { distribVoteTotals }
        </div>
      </div>

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

  let commentBlock =
    <div className="user_profile_comments_sub_container">
      <span>comments_temp</span>
    </div>

  return(
    <div className="user_profile_stats_container">
      <ContainerHeaderCentered header_text={ 'Statistics' } />
      { statsBlock }
      <ContainerHeaderCentered header_text={ 'Votes' } />
      { votesBlock }
      {/* <ContainerHeaderCentered header_text={ 'Comments' } />
      { commentBlock } */}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps)(UserProfileStatsContainer)
