import React from 'react'

import { connect } from 'react-redux'

import BaseDynamicBar from '../../../UI/loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../../UI/loading/smallLoadingSpinner/smallLoadingSpinner'

import up_vote from '../../../assets/up_vote1.png'
import no_vote from '../../../assets/no_vote1.png'
import down_vote from '../../../assets/down_vote1.png'

import './resultsVote.css'
import './resultsVoteButtons.css'

const ResultsVote = (props) => {

  const loading =
    <div className='loading_wrapper_votes'>
      <SmallLoadingSpinner />
      <BaseDynamicBar modalType={ 'questionVote' } barType={ 'questionVote' } />
    </div>

  const calcVotes = () => {
    if (props.play.question.votes.total === 0) return {
      good: '0%',
      neutral: '0%',
      bad: '0%',
    }
    else return {
      good: `${((props.play.question.votes.good / props.play.question.votes.total) * 100).toFixed(2)}%`,
      neutral: `${((props.play.question.votes.neutral / props.play.question.votes.total) * 100).toFixed(2)}%`,
      bad: `${((props.play.question.votes.bad / props.play.question.votes.total) * 100).toFixed(2)}%`,
    }
  }

  let voteBlock

  const votePercents = calcVotes()

  const voteButtons = [
    { type: "up_vote", type_disabled: "up_vote_disabled", img: up_vote, vote: "good"},
    { type: "no_vote", type_disabled: "no_vote_disabled", img: no_vote, vote: "neutral"},
    { type: "down_vote", type_disabled: "down_vote_disabled", img: down_vote, vote: "bad"}
  ]

  const distribVotesButtons = voteButtons.map(button => {
    return(
      <button
        className={ props.enableVoteButtons ? `${button.type}_button` : `${button.type_disabled}_button`}
        disabled={ !props.enableVoteButtons }
        key={`${button.type}_button`}
        name={`${button.type}_button`}
        vote={ button.vote }
        onClick={ props.onClickVoteFunctions }
      >
        <img
          alt={`${button.type}_img`}
          name={`${button.type}_img`}
          src={ button.img }
          vote={ button.vote }
        />
      </button>
    )
  })

  if(props.play.voteLoading) voteBlock = loading

  if(props.showVoteButtons){
    voteBlock =
    <div className="results_vote">
      <div className="results_vote_header">
        <h3>Rate this question</h3>
      </div>
      <div className="results_vote_buttons_container">
        { distribVotesButtons }
      </div>
    </div>
  }

  if(props.play.voteStatus === 'displayVotes' && !props.play.voteLoading){
    voteBlock =
    <div className="results_voted">
      <div className="results_voted_header">
        <h3>Rating</h3>
        <h4>Votes: { props.play.question.votes.total }</h4>
      </div>
      <div className="results_voted_totals">
          <ul>
            <li><h5>Up Votes</h5> { votePercents.good }</li>
            <li><h5>No Votes</h5> { votePercents.neutral }</li>
            <li><h5>Down Votes</h5> { votePercents.bad }</li>
          </ul>
      </div>
    </div>
  }

  return(
    <>{ voteBlock }</>
  )
}

const mapStateToProps = state => {
  return {
    play: state.play
  }
}

export default connect(mapStateToProps)(ResultsVote)