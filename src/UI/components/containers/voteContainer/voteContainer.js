import React from 'react'
import { connect } from 'react-redux'
import calcVotePercents from '../../../../utility/calculation/calcVotePercents'
import calcVoteAvg from '../../../../utility/calculation/calcVoteAvg'

import roundVoteAverageForStarRating from '../../../../utility/calculation/roundVoteAverageForStarRating'
import roundVoteAverage from '../../../../utility/calculation/roundVoteAverage'

import ContainerHeader from '../../../components/headers/containerHeader/containerHeader'
import ContainerHeaderCentered from '../../../components/headers/containerHeaderCentered/containerHeaderCentered'

import BaseDynamicBar from '../../../loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../../loading/smallLoadingSpinner/smallLoadingSpinner'

import { voteStarsRatingIndex } from '../../../../assets/vote_stars/voteStarsRatingIndex'
import voteStarsSelectIndex from '../../../../assets/vote_stars/voteStarsSelectIndex'


import './voteContainer.css'
import './voteButtons.css'

class VoteContainer extends React.Component {

  state = { hover_value: null }

  onStarHover = (event) => { event.target.attributes.hover_value && this.setState({ hover_value: parseInt(event.target.attributes.hover_value.value) }) }
  offStarHover = (event) => { event.target.attributes.hover_value && this.setState({ hover_value: null }) }

  render() {

    const loading =
      <div className='loading_wrapper_votes'>
        <SmallLoadingSpinner />
        <BaseDynamicBar modalType={ 'questionVote' } barType={ 'questionVote' } />
      </div>

    let votePercents = calcVotePercents(this.props.voteProps)
    let voteAvg = calcVoteAvg(this.props.voteProps)
    let voteBlock
    let header
    let headerText
    let headerSubText

    const voteButtons = [
      { type: "ZeroStars", img: this.state.hover_value === 0 ? voteStarsSelectIndex.noStarsSelected : voteStarsSelectIndex.noStarsUnselected, title: 'No Star Rating', vote: "ZeroStars", hover_value: 0 },
      { type: "OneStars", img: this.state.hover_value && this.state.hover_value >= 1 ? voteStarsSelectIndex.Selected : voteStarsSelectIndex.Unselected, title: '1 Star Rating', vote: "OneStars", hover_value: 1 },
      { type: "TwoStars", img: this.state.hover_value && this.state.hover_value >= 2 ? voteStarsSelectIndex.Selected : voteStarsSelectIndex.Unselected, title: '2 Star Rating', vote: "TwoStars", hover_value: 2 },
      { type: "ThreeStars", img: this.state.hover_value && this.state.hover_value >= 3 ? voteStarsSelectIndex.Selected : voteStarsSelectIndex.Unselected, title: '3 Star Rating', vote: "ThreeStars", hover_value: 3 },
      { type: "FourStars", img: this.state.hover_value && this.state.hover_value >= 4 ? voteStarsSelectIndex.Selected : voteStarsSelectIndex.Unselected, title: '4 Star Rating', vote: "FourStars", hover_value: 4 },
      { type: "FiveStars", img: this.state.hover_value && this.state.hover_value === 5 ? voteStarsSelectIndex.Selected : voteStarsSelectIndex.Unselected, title: '5 Star Rating', vote: "FiveStars", hover_value: 5 }
    ]

    const voteTotals = [
      { alt: '5_star_rating', img: voteStarsRatingIndex.FiveStars, name: 'five_star_rating', title: '5 Star Rating', percent: votePercents.FiveStars, totals: this.props.voteProps.FiveStars },
      { alt: '4_star_rating', img: voteStarsRatingIndex.FourStars, name: 'four_star_rating', title: '4 Star Rating', percent: votePercents.FourStars, totals: this.props.voteProps.FourStars },
      { alt: '3_star_rating', img: voteStarsRatingIndex.ThreeStars, name: 'three_star_rating', title: '3 Star Rating', percent: votePercents.ThreeStars, totals: this.props.voteProps.ThreeStars },
      { alt: '2_star_rating', img: voteStarsRatingIndex.TwoStars, name: 'two_star_rating', title: '2 Star Rating', percent: votePercents.TwoStars, totals: this.props.voteProps.TwoStars },
      { alt: '1_star_rating', img: voteStarsRatingIndex.OneStars, name: 'one_star_rating', title: '1 Star Rating', percent: votePercents.OneStars, totals: this.props.voteProps.OneStars },
      { alt: 'no_star_rating', img: voteStarsRatingIndex.ZeroStars, name: 'zero_star_rating', title: 'No Star Rating', percent: votePercents.ZeroStars, totals: this.props.voteProps.ZeroStars }
    ]

    const distribVotesButtons = voteButtons.map(button => {
      return(
        <button
          className={ this.props.enableVoteButtons ? 'vote_star_enabled' : 'vote_star_disabled'}
          disabled={ !this.props.enableVoteButtons }
          key={`${button.type}_button`}
          name={`${button.type}_button`}
          title={ button.title }
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
          <div className='vote_totals_graph_row_container_right'>
            <span>{ voteTotal.totals } { voteTotal.totals === 1 ? 'vote' : 'votes'}</span>
          </div>
        </div>
      )
    })


    // if(this.props.showVoteButtons) {
    //   headerText = <div className='vote_header_text_sub_container'><h3>Rate this question</h3></div>
    //   headerSubText = <div className='vote_header_sub_text_sub_container'>{ distribVotesButtons }</div>
    //   voteBlock =
    //     <div className="vote_container">
    //       <ContainerHeader header_text={ headerText } sub_text={ headerSubText } />
    //     </div>
    // } else {
    //   if(!!this.props.play.results || !!this.props.questions.staticUserResults) {
    //     headerText = <div className='vote_header_text_sub_container'><h3>Approval Rating</h3></div>
    //     headerSubText = <div className='vote_header_sub_text_sub_container'><h4>{ this.props.voteProps.rating }</h4></div>
    //     header = <ContainerHeader header_text={ headerText } sub_text={ headerSubText } />
    //   }
    //   else {
    //     headerText = 'Votes'
    //     header = <ContainerHeaderCentered header_text={ headerText } />
    //   }

    //   voteBlock =
    //     <div className="vote_container">
    //       { header }
    //       <div className='vote_totals_graph_container'>
    //         <div className='vote_totals_graph_sub_header_container'>
    //           <div className='vote_totals_graph_sub_header_container_left'>
    //             <div className='vote_average_vote_img_container'>
    //               <div alt='avg_user_rating' name='avg_user_rating' title='Average User Rating'
    //                 style={{
    //                   alignSelf: 'stretch',
    //                   backgroundImage: `url(${voteStarsRatingIndex.AverageStars})`,
    //                   backgroundRepeat: 'no-repeat',
    //                   width: `${ roundVoteAverageForStarRating(voteAvg.total) }%`
    //                 }}
    //               />
    //             </div>
    //             <span>{ roundVoteAverage(voteAvg.total) } { this.props.voteProps.average === 1 ? 'Star' : 'Stars' }</span>
    //           </div>
    //           <div className='vote_totals_graph_sub_header_container_center'></div>
    //           <div className='vote_totals_graph_sub_header_container_right'>
    //             <span>{ this.props.voteProps.total } total { this.props.voteProps.total === 1 ? 'vote' : 'votes'}</span>
    //           </div>
    //         </div>
    //         { distribVoteTotals }
    //       </div>
    //     </div>
    // }

    if(this.props.showVoteButtons) {
      headerText = <div className='vote_header_text_sub_container'><h3>Rate this question</h3></div>
      headerSubText = <div className='vote_header_sub_text_sub_container'>{ distribVotesButtons }</div>
      voteBlock =
        <div className="vote_container">
          <ContainerHeader header_text={ headerText } sub_text={ headerSubText } />
        </div>
    }

    if(this.props.showVoteStats) {
      if(!!this.props.play.results || !!this.props.questions.staticUserResults) {
        headerText = <div className='vote_header_text_sub_container'><h3>Approval Rating</h3></div>
        headerSubText = <div className='vote_header_sub_text_sub_container'><h4>{ this.props.voteProps.rating }</h4></div>
        header = <ContainerHeader header_text={ headerText } sub_text={ headerSubText } />
      }
      else {
        headerText = 'Votes'
        header = <ContainerHeaderCentered header_text={ headerText } />
      }

      voteBlock =
        <div className="vote_container">
          { header }
          <div className='vote_totals_graph_container'>
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
                <span>{ roundVoteAverage(voteAvg.total) } { this.props.voteProps.average === 1 ? 'Star' : 'Stars' }</span>
              </div>
              <div className='vote_totals_graph_sub_header_container_center'></div>
              <div className='vote_totals_graph_sub_header_container_right'>
                <span>{ this.props.voteProps.total } total { this.props.voteProps.total === 1 ? 'vote' : 'votes'}</span>
              </div>
            </div>
            { distribVoteTotals }
          </div>
        </div>
    }

    return(
      <>
        {
          (this.props.play.voteLoading) ||
          (this.props.questions.voteLoading)
        ?
          loading
        :
          voteBlock
        }
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    play: state.play,
    questions: state.questions
  }
}

export default connect(mapStateToProps)(VoteContainer)