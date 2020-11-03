import React from 'react'
import { connect } from 'react-redux'
import calcVotePercents from '../../../utility/calculation/calcVotePercents'
import roundVoteAverageForStarRating from '../../../utility/calculation/roundVoteAverageForStarRating'
import roundVoteAverage from '../../../utility/calculation/roundVoteAverage'

import ContainerHeader from '../../../UI/components/headers/containerHeader/containerHeader'
import BaseDynamicBar from '../../../UI/loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../../UI/loading/smallLoadingSpinner/smallLoadingSpinner'

import average_star_rating from '../../../assets/vote_stars/average_star_rating.png'
import five_star_rating from '../../../assets/vote_stars/5_star_rating.png'
import four_star_rating from '../../../assets/vote_stars/4_star_rating.png'
import three_star_rating from '../../../assets/vote_stars/3_star_rating.png'
import two_star_rating from '../../../assets/vote_stars/2_star_rating.png'
import one_star_rating from '../../../assets/vote_stars/1_star_rating.png'
import zero_star_rating from '../../../assets/vote_stars/no_star_rating.png'

import vote_star_selected from '../../../assets/vote_stars/vote_star_selected.png'
import vote_star_unselected from '../../../assets/vote_stars/vote_star_unselected.png'
import vote_star_no_stars_selected from '../../../assets/vote_stars/vote_star_no_stars_selected.png'
import vote_star_no_stars_unselected from '../../../assets/vote_stars/vote_star_no_stars_unselected.png'

import './resultsVote.css'
import './resultsVoteButtons.css'

class ResultsVote extends React.Component {

  state = { hover_value: null }

  onStarHover = (event) => { event.target.attributes.hover_value && this.setState({ hover_value: parseInt(event.target.attributes.hover_value.value) }) }
  offStarHover = (event) => { event.target.attributes.hover_value && this.setState({ hover_value: null }) }

  render() {

    let headerText, headerSubText, voteBlock, votePercents

    const loading =
      <div className='loading_wrapper_votes'>
        <SmallLoadingSpinner />
        <BaseDynamicBar modalType={ 'questionVote' } barType={ 'questionVote' } />
      </div>

    if(!this.props.staticResults) votePercents = calcVotePercents(this.props.play.question.votes)
    else votePercents = calcVotePercents(this.props.questions.staticQuestion.votes)

    const voteButtons = [
      { type: "ZeroStars", img: this.state.hover_value === 0 ? vote_star_no_stars_selected : vote_star_no_stars_unselected, vote: "ZeroStars", hover_value: 0 },
      { type: "OneStars", img: this.state.hover_value && this.state.hover_value >= 1 ? vote_star_selected : vote_star_unselected, vote: "OneStars", hover_value: 1 },
      { type: "TwoStars", img: this.state.hover_value && this.state.hover_value >= 2 ? vote_star_selected : vote_star_unselected, vote: "TwoStars", hover_value: 2 },
      { type: "ThreeStars", img: this.state.hover_value && this.state.hover_value >= 3 ? vote_star_selected : vote_star_unselected, vote: "ThreeStars", hover_value: 3 },
      { type: "FourStars", img: this.state.hover_value && this.state.hover_value >= 4 ? vote_star_selected : vote_star_unselected, vote: "FourStars", hover_value: 4 },
      { type: "FiveStars", img: this.state.hover_value && this.state.hover_value === 5 ? vote_star_selected : vote_star_unselected, vote: "FiveStars", hover_value: 5 }
    ]

    const voteTotals = [
      { alt: '5_star_rating', img: five_star_rating, name: 'five_star_rating', title: '5 Star Rating', percent: votePercents.FiveStars, totals: this.props.play.question.votes.FiveStars },
      { alt: '4_star_rating', img: four_star_rating, name: 'four_star_rating', title: '4 Star Rating', percent: votePercents.FourStars, totals: this.props.play.question.votes.FourStars },
      { alt: '3_star_rating', img: three_star_rating, name: 'three_star_rating', title: '3 Star Rating', percent: votePercents.ThreeStars, totals: this.props.play.question.votes.ThreeStars },
      { alt: '2_star_rating', img: two_star_rating, name: 'two_star_rating', title: '2 Star Rating', percent: votePercents.TwoStars, totals: this.props.play.question.votes.TwoStars },
      { alt: '1_star_rating', img: one_star_rating, name: 'one_star_rating', title: '1 Star Rating', percent: votePercents.OneStars, totals: this.props.play.question.votes.OneStars },
      { alt: 'no_star_rating', img: zero_star_rating, name: 'zero_star_rating', title: 'No Star Rating', percent: votePercents.ZeroStars, totals: this.props.play.question.votes.ZeroStars }
    ]

    const distribVotesButtons = voteButtons.map(button => {
      return(
        <button
          className={ this.props.enableVoteButtons ? 'vote_star_enabled' : 'vote_star_disabled'}
          disabled={ !this.props.enableVoteButtons }
          key={`${button.type}_button`}
          name={`${button.type}_button`}
          vote={ button.vote }
        >
          <img
            alt={`${button.type}_img`}
            hover_value={ button.hover_value }
            name={`${button.type}_img`}
            onClick={ this.props.onClickVoteFunctions }
            onMouseEnter={ this.onStarHover }
            onMouseLeave={ this.offStarHover }
            src={ button.img }
            vote={ button.vote }
          />
        </button>
      )
    })

    const distribVoteTotals = voteTotals.map((voteTotal, index) => {
      return(
        <div className='results_totals_graph_row_container' key={ index } >
          <div className='results_totals_graph_row_container_left'>
            <img alt={ voteTotal.alt } className='vote_star_rating' name={ voteTotal.name } src={ voteTotal.img } title={ voteTotal.title } />
          </div>
          <div className='results_totals_graph_row_container_center'>
            <div
              style={{
                display: 'flex',
                color: 'rgba(255, 255, 255, 1)',
                justifyContent: `${ voteTotal.percent < 7.5 ? "flex-start" : "flex-end" }`,
                alignContent: 'flex-end',
                alignItems: 'flex-end',
                alignSelf: 'stretch',
                boxSizing: "border-box",
                background: "green",
                padding: '2.5px 5px',
                width: `${ voteTotal.percent }%`
              }}
            >
              <span>{ voteTotal.percent }%</span>
            </div>
          </div>
          <div className='results_totals_graph_row_container_right'>
            <span>{ voteTotal.totals } { this.props.play.question.votes.total === 1 ? 'vote' : 'votes'}</span>
          </div>
        </div>
      )
    })

    if(this.props.play.voteLoading) voteBlock = loading

    if(this.props.showVoteButtons &&
      ((this.props.play.results && !this.props.play.results.vote) ||
      (this.props.questions.staticUserResults && !this.props.questions.staticUserResults.vote)
      )) {
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
      headerText = <div className='results_vote_header_text_sub_container'><h3>Approval Rating</h3></div>
      headerSubText =<div className='results_vote_header_sub_text_sub_container'><h4>{ this.props.play.question.votes.rating }</h4></div>

      voteBlock =
      <div className="results_vote_container">
        { !this.props.staticResults &&
          <>
            <ContainerHeader header_text={ headerText } sub_text={ headerSubText } />
            <div className='results_vote_totals_graph_container'>
              <div className='results_totals_graph_sub_header_container'>
                <div className='results_totals_graph_sub_header_container_left'>
                  <div className='results_vote_average_vote_img_container'>
                    <div alt='avg_user_rating' name='avg_user_rating' title='Average User Rating'
                      style={{
                        alignSelf: 'stretch',
                        backgroundImage: `url(${average_star_rating})`,
                        backgroundRepeat: 'no-repeat',
                        width: `${ roundVoteAverageForStarRating(this.props.play.question.votes.average) }%`
                      }}
                    />
                  </div>
                  <span>{ roundVoteAverage(this.props.play.question.votes.average) } Stars</span>
                </div>
                <div className='results_totals_graph_sub_header_container_center'></div>
                <div className='results_totals_graph_sub_header_container_right'>
                  <span>{ this.props.play.question.votes.total } total { this.props.play.question.votes.total === 1 ? 'vote' : 'votes'}</span>
                </div>
              </div>
              { distribVoteTotals }
            </div>
          </>
        }

        {/*{ props.staticResults && <h5>Approval Rating ({ props.questions.staticQuestion.votes.total } { props.questions.staticQuestion.votes.total === 1 ? 'vote' : 'votes'})</h5> }
        { props.staticResults && <h4>{ props.questions.staticQuestion.rating.approval }</h4> } */}

        {/* <div className="results_vote_totals"> */}
            {/*{ props.staticResults && <ul>
              <li><h5>5 Stars ({ props.questions.staticQuestion.votes.FiveStars })</h5> { votePercents.FiveStars }</li>
              <li><h5>4 Stars ({ props.questions.staticQuestion.votes.FourStars })</h5> { votePercents.FourStars }</li>
              <li><h5>3 Stars ({ props.questions.staticQuestion.votes.ThreeStars })</h5> { votePercents.ThreeStars }</li>
              <li><h5>2 Stars ({ props.questions.staticQuestion.votes.TwoStars })</h5> { votePercents.TwoStars }</li>
              <li><h5>1 Star ({ props.questions.staticQuestion.votes.OneStars })</h5> { votePercents.OneStars }</li>
              <li><h5>0 Stars ({ props.questions.staticQuestion.votes.ZeroStars })</h5> { votePercents.ZeroStars }</li>
            </ul> } */}
        {/* </div> */}
      </div>
    }

    return(
      <>{ voteBlock }</>
    )
  }
}

const mapStateToProps = state => {
  return {
    play: state.play,
    questions: state.questions
  }
}

export default connect(mapStateToProps)(ResultsVote)