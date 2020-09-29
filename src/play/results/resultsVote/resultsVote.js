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

  const calcVotePercents = () => {
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

  const calcVoteRating = () => {
    if (props.play.question.votes.total === 0) return 'Not Available'
    else {
      let numRate = parseFloat((props.play.question.votes.good / (props.play.question.votes.good + props.play.question.votes.bad)).toFixed(2))
      if(numRate > 1.00) return 'S'
      if(numRate <= 1.00 && numRate >= 0.95) return 'A+'
      if(numRate < 0.95 && numRate >= 0.9) return 'A'
      if(numRate < 0.9 && numRate >= 0.85) return 'A-'
      if(numRate < 0.85 && numRate >= 0.8) return 'B+'
      if(numRate < 0.8 && numRate >= 0.75) return 'B'
      if(numRate < 0.75 && numRate >= 0.7) return 'B-'
      if(numRate < 0.7 && numRate >= 0.65) return 'C+'
      if(numRate < 0.65 && numRate >= 0.6) return 'C'
      if(numRate < 0.6 && numRate >= 0.55) return 'C-'
      if(numRate < 0.55 && numRate >= 0.5) return 'D+'
      if(numRate < 0.5 && numRate >= 0.45) return 'D'
      if(numRate < 0.45 && numRate >= 0.4) return 'D-'
      if(numRate < 0.4 && numRate >= 0.35) return 'F+'
      if(numRate < 0.35 && numRate >= 0.3) return 'F'
      if(numRate < 0.3 && numRate >= 0.25) return 'F-'
      if(numRate < 0.25) return 'F-'
    }
  }

  let voteBlock

  const votePercents = calcVotePercents()

  const voteRating = calcVoteRating()

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
    <div className="results_vote_container">
      <div className="results_vote_wrapper">
        <div className="results_vote_header">
          <h3>Rate this question</h3>
        </div>
        <div className="results_vote_buttons_container">
          { distribVotesButtons }
        </div>
      </div>
    </div>
  }

  if(props.play.voteStatus === 'displayVotes' && !props.play.voteLoading){
    voteBlock =
    <div className="results_vote_container">
      <div className="results_vote_wrapper">

        <div className="results_vote_header">
          <h5>Approval Rating ({ props.play.question.votes.total } { props.play.question.votes.total === 1 ? 'vote' : 'votes'})</h5>
          <h4>{ voteRating }</h4>
        </div>
        <div className="results_vote_totals">
            <ul>
              <li><h5>Up Votes ({ props.play.question.votes.good })</h5> { votePercents.good }</li>
              <li><h5>No Votes ({ props.play.question.votes.neutral })</h5> { votePercents.neutral }</li>
              <li><h5>Down Votes ({ props.play.question.votes.bad })</h5> { votePercents.bad }</li>
            </ul>
        </div>

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