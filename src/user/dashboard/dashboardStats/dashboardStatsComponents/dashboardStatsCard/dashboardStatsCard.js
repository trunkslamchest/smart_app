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

import './dashboardStatsCardHeaderButton.css'
import './dashboardStatsCardHeaderButtonActive.css'
import './dashboardStatsCardHeaderButtonHover.css'
import './dashboardStatsCardHeaderButtonActiveHover.css'
import './dashboardStatsCard.css'

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
      (event.target.nodeName === "BUTTON" || event.target.nodeName === "IMG" || event.target.nodeName === "SPAN" || event.target.nodeName === "H3" || event.target.nodeName === "DIV") &&
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

  numZero = (num) => {
    let splitNum = num.split('')
    return !!parseInt(splitNum[ splitNum.length - 1]) ? parseFloat(splitNum.join('')) : Math.round(parseInt(num))
  }

  render(){

    // const arrow_white_down = <img alt='open' className='menu_arrow' src={ menu_arrow_white_down } />
    const arrow_grey_down = <img alt='open' className='header_button_menu_arrow' hover_trigger="headerButtonHover" src={ menu_arrow_grey_down } />
    const arrow_grey_left = <img alt='closed' className='header_button_menu_arrow' hover_trigger="headerButtonHover" src={ menu_arrow_grey_left } />
    const arrow_white_left = <img alt='closed' className='header_button_menu_arrow' hover_trigger="headerButtonHover" src={ menu_arrow_white_left } />

    let statsCardBlock,
        qSet = this.props.qSet[0],
        header_menu_arrow = arrow_white_left

    if(typeof this.props.answers === 'string') {
      statsCardBlock =
        <div className="stats_card_no_answers_container">
          <h3>{ qSet }</h3>
          <div className="stats_card_no_answers_left_container">
            <h4>You have not answered any { qSet } questions</h4>
            { header_menu_arrow }
          </div>
        </div>
    } else {

      let stats = this.props.qSet[1],
          questionsAnswered = this.numZero(((stats.answered / this.props.totals[qSet].totals.questions) * 100).toFixed(2)),
          questionsCorrect = "0",
          arrow_up,
          arrow_down

      if(this.state.headerButtonHover) header_menu_arrow = arrow_grey_left
      if(this.state.showStats) header_menu_arrow = arrow_grey_down

      if(stats.rating !== 0) {
        arrow_up = <img alt='Higher than global average' className='header_button_trend_arrow' src={ trend_arrow_up } />
        arrow_down = <img alt='Lower than global average' className='header_button_trend_arrow' src={ trend_arrow_down } />
      }

      if(stats.answered > 0) questionsCorrect = this.numZero(((stats.correct / stats.answered) * 100).toFixed(2))

      statsCardBlock =
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
            <div className={ this.state.showStats ? "stats_card_header_button_right_container_active" : "stats_card_header_button_right_container" }>
              <div className={ this.state.showStats ? "stats_card_header_button_rank_rating_container_active" : "stats_card_header_button_rank_rating_container" }>
                <div className="stats_card_header_button_rank_sub_container">
                  <h4>Rank</h4>
                  <span>{ stats.rank }</span>
                </div>
                <div className="stats_card_header_button_rating_sub_container">
                  <h4>Rating</h4>
                  <span>
                    { (stats.rating).toFixed(2) }
                    { stats.rating >= this.props.totals[qSet].averages.questions.performance ? arrow_up : arrow_down }
                  </span>
                </div>
              </div>
              <div className={ this.state.showStats ? "stats_card_time_container_active" : "stats_card_time_container"}>
                <div className="stats_card_header_button_avg_time_container">
                  <h4>Average Time</h4>
                  <span>
                    { (stats.avg_time).toFixed(2) } seconds
                    { stats.avg_time <= this.props.totals[qSet].averages.questions.avgTime ? arrow_up : arrow_down }
                  </span>
                </div>
                <div className="stats_card_header_button_outta_times_container">
                  <h4>Outta Times</h4>
                  <span>{ stats.outta_times }</span>
                </div>
              </div>
              <div className={ this.state.showStats ? "stats_card_header_button_right_active" : "stats_card_header_button_right" } >
                  <div className={ this.state.showStats ? "stats_card_header_button_right_text_sub_container_active" : "stats_card_header_button_right_text_sub_container" } >
                    <span>{ stats.answered }/{ this.props.totals[qSet].totals.questions } answered ({ questionsAnswered }%)</span>
                    <span>{ stats.correct }/{ stats.answered } correct ({ questionsCorrect }%)</span>
                  </div>
                  { questionsCorrect >= this.props.totals[qSet].averages.questions.correct ? arrow_up : arrow_down }
              </div>
            </div>
            { header_menu_arrow }
          </button>
          { this.state.showStats &&
            <div className="stats_card_wrapper" ref={ this.setStatsRef }>
              <DashboardStatsAnswersContainer
                answers={ this.props.answers }
                history={ this.props.history }
                diff={ this.props.diff ? this.props.diff : null }
                cat={ this.props.cat ? this.props.cat : null }
                qSet={ qSet }
              />
            </div>
          }
        </>
    }

    return <>{ statsCardBlock }</>
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