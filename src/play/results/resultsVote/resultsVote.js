import React from 'react'

import { connect } from 'react-redux'

import BaseDynamicBar from '../../../UI/loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../../UI/loading/smallLoadingSpinner/smallLoadingSpinner'

import up_vote from '../../../assets/votes/up_vote1.png'
import no_vote from '../../../assets/votes/no_vote1.png'
import down_vote from '../../../assets/votes/down_vote1.png'

import './resultsVote.css'
import './resultsVoteButtons.css'

const ResultsVote = (props) => {

  const loading =
    <div className='loading_wrapper_votes'>
      <SmallLoadingSpinner />
      <BaseDynamicBar modalType={ 'questionVote' } barType={ 'questionVote' } />
    </div>

  const calcVotePercents = (voteObj) => {
    if (voteObj.total === 0) return { good: '0%', neutral: '0%', bad: '0%' }
    else return {
      good: `${((voteObj.good / voteObj.total) * 100).toFixed(2)}%`,
      neutral: `${((voteObj.neutral / voteObj.total) * 100).toFixed(2)}%`,
      bad: `${((voteObj.bad / voteObj.total) * 100).toFixed(2)}%`,
    }
  }

  let voteBlock, votePercents

  if(!props.staticResults) votePercents = calcVotePercents(props.play.question.votes)
  else votePercents = calcVotePercents(props.questions.staticQuestion.votes)

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

  if(props.showVoteButtons &&
    ((props.play.results && !props.play.results.vote) ||
     (props.questions.staticUserResults && !props.questions.staticUserResults.vote)
    )){
    voteBlock =
    <div className="results_vote_container">
      <div className="results_vote_header">
        <h3>Rate this question</h3>
      </div>
      <div className="results_vote_buttons_container">
        { distribVotesButtons }
      </div>
    </div>
  } else {
    voteBlock =
    <div className="results_vote_container">
      <div className="results_vote_header">
        { !props.staticResults && <h5>Approval Rating ({ props.play.question.votes.total } { props.play.question.votes.total === 1 ? 'vote' : 'votes'})</h5> }
        { !props.staticResults && <h4>{ props.play.question.votes.rating }</h4> }
        { props.staticResults && <h5>Approval Rating ({ props.questions.staticQuestion.votes.total } { props.questions.staticQuestion.votes.total === 1 ? 'vote' : 'votes'})</h5> }
        { props.staticResults && <h4>{ props.questions.staticQuestion.rating.approval }</h4> }
      </div>
      <div className="results_vote_totals">
          { !props.staticResults && <ul>
            <li><h5>Up Votes ({ props.play.question.votes.good })</h5> { votePercents.good }</li>
            <li><h5>No Votes ({ props.play.question.votes.neutral })</h5> { votePercents.neutral }</li>
            <li><h5>Down Votes ({ props.play.question.votes.bad })</h5> { votePercents.bad }</li>
          </ul> }
          { props.staticResults && <ul>
            <li><h5>Up Votes ({ props.questions.staticQuestion.votes.good })</h5> { votePercents.good }</li>
            <li><h5>No Votes ({ props.questions.staticQuestion.votes.neutral })</h5> { votePercents.neutral }</li>
            <li><h5>Down Votes ({ props.questions.staticQuestion.votes.bad })</h5> { votePercents.bad }</li>
          </ul> }
      </div>
    </div>
  }

  return(
    <>{ voteBlock }</>
  )
}

const mapStateToProps = state => {
  return {
    play: state.play,
    questions: state.questions
  }
}

export default connect(mapStateToProps)(ResultsVote)