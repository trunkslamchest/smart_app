import React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'

import makeVoteButtons from './voteFunctions/makeVoteButtons'
import makeVoteTotals from './voteFunctions/makeVoteTotals'

import calcVotePercents from '../../../../utility/calculation/calcVotePercents'
import calcVoteAvg from '../../../../utility/calculation/calcVoteAvg'

import roundVoteAverageForStarRating from '../../../../utility/calculation/roundVoteAverageForStarRating'
import roundVoteAverage from '../../../../utility/calculation/roundVoteAverage'

import ContainerHeader from '../../../components/headers/containerHeader/containerHeader'
import VoteHeader from '../../../components/headers/voteHeader/voteHeader'
import VoteHeaderCentered from '../../../components/headers/voteHeaderCentered/voteHeaderCentered'

import VoteBar from './voteBar'

import BaseDynamicBar from '../../../loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../../loading/smallLoadingSpinner/smallLoadingSpinner'

import { voteStarsRatingIndex } from '../../../../assets/vote_stars/voteStarsRatingIndex'
import voteStarsSelectIndex from '../../../../assets/vote_stars/voteStarsSelectIndex'

import './voteGraph.css'
import './voteContainer.css'
import './voteButtons.css'
import './voteResponse.css'

const VoteContainer = (props) => {

  const [hoverValue, setHoverValue ] = useState(null)

  const onStarHover = (event) => { event.target.attributes.hover_value && setHoverValue(parseInt(event.target.attributes.hover_value.value)) }
  const offStarHover = (event) => { event.target.attributes.hover_value && setHoverValue(null) }

  const loading =
    <div className='loading_wrapper_votes'>
      <SmallLoadingSpinner />
      <BaseDynamicBar modalType={ 'questionVote' } barType={ 'questionVote' } />
    </div>

  let votePercents = calcVotePercents(props.voteProps)
  let voteAvg = calcVoteAvg(props.voteProps)
  let voteBlock
  let header
  let headerText
  let headerSubText

  let voteButtons = makeVoteButtons(hoverValue, voteStarsSelectIndex)

  let voteTotals = makeVoteTotals(votePercents, props.voteProps, voteStarsRatingIndex)

  const distribVotesButtons = voteButtons.map(button => {
    return(
      <button
        className={ props.enableVoteButtons ? 'vote_star_enabled' : 'vote_star_disabled'}
        disabled={ !props.enableVoteButtons }
        key={`${button.type}_button`}
        name={`${button.type}_button`}
        title={ button.title }
        vote={ button.vote }
      >
        <img
          alt={`${button.type}_img`}
          hover_value={ button.hover_value }
          name={`${button.type}_img`}
          onClick={ props.onClickVoteFunctions }
          onMouseEnter={ onStarHover }
          onMouseLeave={ offStarHover }
          src={ button.img }
          title={ button.title }
          vote={ button.vote }
        />
      </button>
    )
  })


  const distribVoteTotals = voteTotals.map((voteTotal, index) => {
    return(
      <div className='vote_totals_graph_row_container' key={ index } >
        <div className='vote_totals_graph_row_container_left'>
          <img alt={ voteTotal.alt } name={ voteTotal.name } src={ voteTotal.img } title={ voteTotal.title } />
        </div>
        <div className='vote_totals_graph_row_container_center'>
          <VoteBar voteTotalPercent={ voteTotal.percent} />
        </div>
        <div className='vote_totals_graph_row_container_right'>
          <span>{ voteTotal.totals } { voteTotal.totals === 1 ? 'vote' : 'votes'}</span>
        </div>
      </div>
    )
  })

  if(props.showVoteButtons) {
    headerText = <div className='vote_header_text_sub_container'><h3>Rate this question</h3></div>
    headerSubText = <div className='vote_header_sub_text_sub_container'>{ distribVotesButtons }</div>
    voteBlock =
      <div className="vote_container">
        <VoteHeader header_text={ headerText } sub_text={ headerSubText } headerClass='vote_buttons_header' />
      </div>
  }

  if(props.showVoteStats) {
    if(!!props.play.results || !!props.questions.staticUserResults) {
      headerText = <div className='vote_header_text_sub_container'><h3>Approval Rating</h3></div>
      headerSubText = <div className='vote_header_sub_text_sub_container'><h4>{ props.voteProps.rating }</h4></div>
      header = <VoteHeader header_text={ headerText } sub_text={ headerSubText } headerClass='vote_stats_header' />
    } else if (props.staticUserProfile){
      headerText = 'Votes'
      header = <ContainerHeader header_text={ headerText } />
    } else {
      headerText = 'Votes'
      header = <VoteHeaderCentered header_text={ headerText } />
    }

    voteBlock =
      <div className={ props.staticUserProfile ? "vote_container_profile" : "vote_container"}>
        <div className={ props.staticUserProfile ? 'vote_wrapper_profile' : 'vote_wrapper' }>
          { header }
          <div className='divider_left' />
          <div className={ props.staticUserProfile ? 'vote_totals_profile_graph_container' : 'vote_totals_graph_container'}>
            <div className={ props.staticUserProfile ? 'vote_totals_graph_wrapper_profile' : 'vote_totals_graph_wrapper' } >
              <div className='vote_totals_graph_sub_header_container'>
                <div className='vote_totals_graph_sub_header_container_left'>
                  <div className='vote_average_vote_img_container'>
                    <div alt='avg_user_rating' name='avg_user_rating' title='Average User Rating'
                      style={{
                        alignSelf: 'stretch',
                        backgroundImage: `url(${voteStarsRatingIndex.AverageStars})`,
                        backgroundRepeat: 'no-repeat',
                        width: `${ roundVoteAverageForStarRating(voteAvg.total) }%`
                      }}
                    />
                  </div>
                  <span>{ roundVoteAverage(voteAvg.total) } { props.voteProps.average === 1 ? 'Star' : 'Stars' }</span>
                </div>
                <div className='vote_totals_graph_sub_header_container_center'><span>|</span></div>
                <div className='vote_totals_graph_sub_header_container_right'>
                  <span>{ props.voteProps.total } total { props.voteProps.total === 1 ? 'vote' : 'votes'}</span>
                </div>
              </div>
              { distribVoteTotals }
            </div>
            <div className='divider_medium' />
          </div>
        </div>
        { props.staticUserProfile && <div className='divider_left' /> }
      </div>
  }

  return(
    <>
      {
        (props.play.voteLoading) ||
        (props.questions.voteLoading)
      ?
        loading
      :
        voteBlock
      }
    </>
  )
}

const store = (store) => {
  return {
    play: store.play,
    questions: store.questions
  }
}

export default connect(store)(VoteContainer)