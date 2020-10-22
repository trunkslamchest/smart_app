import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import DashboardStatsAnswersContainer from '../dashboardStatsAnswersContainer/dashboardStatsAnswersContainer'

import trend_arrow_up from '../../../../../assets/trends/trend_arrow_up.png'
import trend_arrow_down from '../../../../../assets/trends/trend_arrow_down.png'

import menu_arrow_grey_down from '../../../../../assets/menu_arrows/menu_arrow_grey_down.png'
// import menu_arrow_white_down from '../../../../../assets/menu_arrows/menu_arrow_white_down.png'
import menu_arrow_grey_left from '../../../../../assets/menu_arrows/menu_arrow_grey_left.png'
import menu_arrow_white_left from '../../../../../assets/menu_arrows/menu_arrow_white_left.png'

import './dashboardStatsCard.css'
import './dashboardStatsCardButton.css'

class DashboardStatsCard extends React.Component {

  state = { showStats: false, showAnswers: false, headerButtonHover: false, answersButtonHover: false }

  constructor(props) {
    super(props)
    this.setButtonRef = this.setButtonRef.bind(this)
    this.setStatsRef = this.setStatsRef.bind(this)
  }

  componentDidMount() { document.addEventListener('click', this.onClickListen) }
  componentWillUnmount() { document.removeEventListener('click', this.onClickListen) }

  setButtonRef(node){ this.buttonRef = node }
  setStatsRef(node){ this.statsRef = node }

  onClickListen = (event) => {
    if((!!this.statsRef && !this.statsRef.contains(event.target)) &&
      (!!this.buttonRef && !this.buttonRef.contains(event.target)) &&
      (event.target.nodeName === "BUTTON" || event.target.nodeName === "IMG" || event.target.nodeName === "SPAN" || event.target.nodeName === "H3") &&
      event.target.className !== "main_container" &&
      event.target.parentNode.className.split("_")[0] === 'stats'
    ) this.setState({ showStats: false, showAnswers: false })
  }

  onStatHover = (event) => { event.target.attributes.hover_trigger && this.setState({ [event.target.attributes.hover_trigger.value]: true }) }
  offStatHover = (event) => { event.target.attributes.hover_trigger && this.setState({ [event.target.attributes.hover_trigger.value]: false }) }

  onDropDown = () => {
    let switchStats = !this.state.showStats
    this.setState({ showStats: switchStats })
  }

  onShowAnswers = () => {
    let switchAnswers = !this.state.showAnswers
    this.setState({ showAnswers: switchAnswers })
  }

  numZero = (num) => {
    let splitNum = num.split('')
    return !!parseInt(splitNum[ splitNum.length - 1]) ? parseFloat(splitNum.join('')) : Math.round(parseInt(num))
  }

  render(){

    // const arrow_white_down = <img alt='open' className='menu_arrow' src={ menu_arrow_white_down } />
    const arrow_grey_down = <img alt='open' className='menu_arrow' hover_trigger={ this.state.headerButtonHover ? "headerButtonHover" : "answersButtonHover" } src={ menu_arrow_grey_down } />
    const arrow_grey_left = <img alt='closed' className='menu_arrow' hover_trigger={ this.state.answersButtonHover ? "answersButtonHover" : "headerButtonHover" } src={ menu_arrow_grey_left } />
    const arrow_white_left = <img alt='closed' className='menu_arrow' hover_trigger={ this.state.answersButtonHover ? "answersButtonHover" : "headerButtonHover" } src={ menu_arrow_white_left } />

    let qSet = this.props.qSet[0],
        stats = this.props.qSet[1],
        questionsAnswered = this.numZero(((stats.answered / this.props.totals[qSet].totals.questions) * 100).toFixed(2)),
        questionsCorrect = "0",
        arrow_up,
        arrow_down,
        header_menu_arrow = arrow_white_left,
        answers_menu_arrow = arrow_white_left

    if(this.state.headerButtonHover) header_menu_arrow = arrow_grey_left
    if(this.state.showStats) header_menu_arrow = arrow_grey_down
    if(this.state.answersButtonHover) answers_menu_arrow = arrow_grey_left
    if(this.state.showAnswers) answers_menu_arrow = arrow_grey_down

    if(stats.rating !== 0) {
      arrow_up = <img alt='Higher than global average' className='trend_arrow' src={ trend_arrow_up } />
      arrow_down = <img alt='Lower than global average' className='trend_arrow' src={ trend_arrow_down } />
    }

    if(stats.answered > 0) questionsCorrect = this.numZero(((stats.correct / stats.answered) * 100).toFixed(2))

    return(
      <>
          <button
            className={ this.state.showStats ? "stats_card_header_button_active" : "stats_card_header_button" }
            hover_trigger="headerButtonHover"
            ref={ this.setButtonRef }
            onClick={ this.onDropDown }
            onMouseEnter={ this.onStatHover }
            onMouseLeave={ this.offStatHover }
          >
            <h3>{ qSet }</h3>
            <div className={ this.state.showStats ? "stats_card_header_button_right_active" : "stats_card_header_button_right" } >
              <span>{ stats.answered }/{ this.props.totals[qSet].totals.questions } answered ({ questionsAnswered }%)</span>
              { header_menu_arrow }
            </div>
          </button>
        { this.state.showStats &&
          <div className="stats_card_wrapper" ref={ this.setStatsRef }>
            <div className="stats_card_sub_wrapper">
              <div className="stats_card_stats_container">
                <div className="stats_card_rank_rating_container">
                  <div className="stats_card_rank_rating_sub_container">
                    <h4>Rank</h4>
                    <span>{ stats.rank }</span>
                  </div>
                  <div className="stats_card_rank_rating_sub_container">
                    <h4>Rating</h4>
                    <div className="stats_card_rank_rating_sub_wrapper">
                      <span>{ stats.rating }</span>
                      { stats.rating >= this.props.totals[qSet].averages.questions.performance ? arrow_up : arrow_down }
                    </div>
                  </div>
                </div>
                <div className="stats_card_time_container">
                  <span>
                    Average Time: { stats.avg_time } seconds
                    { stats.avg_time <= this.props.totals[qSet].averages.questions.avgTime ? arrow_up : arrow_down }
                  </span>
                  <span>Outta Times: { stats.outta_times }</span>
                </div>
              </div>
              <div className="stats_card_graph_container">
                <span>temp graph</span>
              </div>
            </div>
            <button
                className={ this.state.showAnswers ? "stats_card_answers_button_active" : "stats_card_answers_button" }
                hover_trigger="answersButtonHover"
                onClick={ this.onShowAnswers }
                onMouseEnter={ this.onStatHover }
                onMouseLeave={ this.offStatHover }
              >
                <span>{ this.state.showAnswers ? 'Hide Answers'  : "View Answers" }</span>
                <div className={ this.state.showAnswers ? "stats_card_answers_button_right_active" : "stats_card_answers_button_right" }>
                  <div className={ this.state.showAnswers ? "stats_card_answers_button_right_text_active" : "stats_card_answers_button_right_text" } >
                    <span>{ stats.correct }/{ stats.answered } correct ({ questionsCorrect }%)</span>
                    { questionsCorrect >= this.props.totals[qSet].averages.questions.correct ? arrow_up : arrow_down }
                  </div>
                  { answers_menu_arrow }
                </div>
              </button>
            { this.state.showAnswers && <DashboardStatsAnswersContainer qSet={ qSet } answers={ this.props.answers } /> }
          </div>
        }
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStatsCard)