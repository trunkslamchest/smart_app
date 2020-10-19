import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import trend_arrow_up from '../../../../../assets/trends/trend_arrow_up.png'
import trend_arrow_down from '../../../../../assets/trends/trend_arrow_down.png'

import './dashboardStatsDifficultyCard.css'
import './dashboardStatsDifficultyCardButton.css'

class DashboardStatsDifficultyCard extends React.Component {

  state = { showStats: false }

  constructor(props) {
    super(props)
    this.setDiffRef = this.setDiffRef.bind(this)
    this.setStatsRef = this.setStatsRef.bind(this)
  }

  componentDidMount() { document.addEventListener('click', this.onClickListen) }
  componentWillUnmount() { document.removeEventListener('click', this.onClickListen) }

  setDiffRef(node){ this.diffRef = node }
  setStatsRef(node){ this.statsRef = node }

  onClickListen = (event) => {
    if(!!this.statsRef && (!this.diffRef.contains(event.target) && !this.statsRef.contains(event.target))) this.setState({ showStats: false })
  }

  onDropDown = () => {
    let switchStats = !this.state.showStats
    this.setState({ showStats: switchStats })
  }


  numZero = (num) => {
    let a = num.split('')
    return !!parseInt(a[ a.length - 1]) ? parseFloat(a.join('')) : Math.round(parseInt(num))
  }

  render(){

    let diff = this.props.difficulty[0],
        stats = this.props.difficulty[1],
        arrow_up,
        arrow_down

    if(stats.rating !== 0) {
      arrow_up =
        <img
          alt='Higher than global average'
          className='trend_arrow'
          src={ trend_arrow_up }
        />

      arrow_down =
        <img
          alt='Lower than global average'
          className='trend_arrow'
          src={ trend_arrow_down }
        />
    }

    let questionsAnswered = ((stats.answered / this.props.questions.totals.difficulty[diff].totals.questions) * 100).toFixed(2)
    let questionsCorrect = "0.00"

    if(stats.answered > 0) questionsCorrect = parseFloat((stats.correct / stats.answered) * 100).toFixed(2)

    questionsAnswered = this.numZero(questionsAnswered)
    questionsCorrect = this.numZero(questionsCorrect)

    return(
      <div className="stats_difficulty_sub_container">
      <button
        className={ this.state.showStats ? "stats_difficulty_header_button_active" : "stats_difficulty_header_button" }
        ref={ this.setDiffRef }
        onClick={ this.onDropDown }
      >
        <h3>{ diff }</h3>
      </button>
        { this.state.showStats &&
          <div className="stats_difficulty_wrapper"
            ref={ this.setStatsRef }
          >
            <div className="stats_difficulty_stats_container">
              <div className="stats_difficulty_rank_rating_container">
                <div className="stats_difficulty_rank_rating_sub_container">
                  <h4>Rank</h4>
                  <span>{ stats.rank }</span>
                </div>
                <div className="stats_difficulty_rank_rating_sub_container">
                  <h4>Rating</h4>
                  <div className="stats_difficulty_rank_rating_sub_wrapper">
                    <span>{ stats.rating }</span>
                    { stats.rating >= this.props.questions.totals.difficulty[diff].averages.questions.performance ? arrow_up : arrow_down }
                  </div>
                </div>
              </div>
              <div className="stats_difficulty_answers_container">
                <span>{ stats.answered }/{ this.props.questions.totals.difficulty[diff].totals.questions } answered ({ questionsAnswered }%)</span>
                <span>
                  { stats.correct }/{ stats.answered } correct ({ questionsCorrect }%)
                  { questionsCorrect >= this.props.questions.totals.difficulty[diff].averages.questions.correct ? arrow_up : arrow_down }
                </span>
              </div>
              <div className="stats_difficulty_time_container">
                <span>
                  Average Time: { stats.avg_time } seconds
                  { stats.avg_time <= this.props.questions.totals.difficulty[diff].averages.questions.avgTime ? arrow_up : arrow_down }
                </span>
                <span>Outta Times: { stats.outta_times }</span>
              </div>
            </div>
            <div className="stats_difficulty_graph_container">
              <span>temp graph</span>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    questions: state.questions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStatsDifficultyCard)