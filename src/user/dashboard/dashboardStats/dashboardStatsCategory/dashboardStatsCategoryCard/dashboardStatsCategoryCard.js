import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import trend_arrow_up from '../../../../../assets/trends/trend_arrow_up.png'
import trend_arrow_down from '../../../../../assets/trends/trend_arrow_down.png'

// import menu_arrow_white_down from '../../../../../assets/menu_arrows/menu_arrow_white_down.png'
import menu_arrow_grey_down from '../../../../../assets/menu_arrows/menu_arrow_grey_down.png'
import menu_arrow_grey_left from '../../../../../assets/menu_arrows/menu_arrow_grey_left.png'
import menu_arrow_white_left from '../../../../../assets/menu_arrows/menu_arrow_white_left.png'

import './dashboardStatsCategoryCard.css'
import './dashboardStatsCategoryCardButton.css'

class DashboardStatsCategoryCard extends React.Component {

  state = { showStats: false, headerButtonHover: false }

  constructor(props) {
    super(props)
    this.setCatRef = this.setCatRef.bind(this)
    this.setStatsRef = this.setStatsRef.bind(this)
  }

  componentDidMount() { document.addEventListener('click', this.onClickListen) }
  componentWillUnmount() { document.removeEventListener('click', this.onClickListen) }

  setCatRef(node){ this.catRef = node }
  setStatsRef(node){ this.statsRef = node }

  onClickListen = (event) => {
    if((!!this.statsRef && !this.statsRef.contains(event.target)) &&
      (!!this.catRef && !this.catRef.contains(event.target)) &&
      (event.target.nodeName === "BUTTON" || event.target.nodeName === "IMG" || event.target.nodeName === "SPAN" || event.target.nodeName === "H3") &&
      event.target.className !== "main_container" &&
      event.target.parentNode.className.split("_")[0] === 'stats'
    ) this.setState({ showStats: false })
  }

  onHeaderButtonHover = (event) => { event.target.attributes.hover_trigger && this.setState({ [event.target.attributes.hover_trigger.value]: true }) }
  offHeaderButtonHover = (event) => { event.target.attributes.hover_trigger && this.setState({ [event.target.attributes.hover_trigger.value]: false }) }

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
    const arrow_grey_down = <img alt='open' className='menu_arrow' hover_trigger={ this.state.headerButtonHover ? "headerButtonHover" : "answersButtonHover" } src={ menu_arrow_grey_down } />,
          arrow_grey_left = <img alt='closed' className='menu_arrow' hover_trigger={ this.state.headerButtonHover ? "headerButtonHover" : "answersButtonHover" } src={ menu_arrow_grey_left } />,
          arrow_white_left = <img alt='closed' className='menu_arrow' hover_trigger={ this.state.headerButtonHover ? "headerButtonHover" : "answersButtonHover" } src={ menu_arrow_white_left } />

    let cat = this.props.category[0],
        stats = this.props.category[1],
        questionsAnswered = this.numZero(((stats.answered / this.props.questions.totals.category[cat].totals.questions) * 100).toFixed(2)),
        questionsCorrect = "0",
        arrow_up,
        arrow_down,
        header_menu_arrow = arrow_white_left

    if(this.state.headerButtonHover) header_menu_arrow = arrow_grey_left
    if(this.state.showStats) header_menu_arrow = arrow_grey_down

    if(stats.rating !== 0) {
      arrow_up = <img alt='Higher than global average' className='trend_arrow' src={ trend_arrow_up } />
      arrow_down = <img alt='Lower than global average' className='trend_arrow' src={ trend_arrow_down } />
    }

    if(stats.answered > 0) this.numZero(questionsCorrect = ((stats.correct / stats.answered) * 100).toFixed(2))

    return(
      <div className="stats_category_sub_container">
        <button
          className={ this.state.showStats ? "stats_category_header_button_active" : "stats_category_header_button" }
          hover_trigger="headerButtonHover"
          ref={ this.setCatRef }
          onClick={ this.onDropDown }
          onMouseEnter={ this.onHeaderButtonHover }
          onMouseLeave={ this.offHeaderButtonHover }
        >
          <h3>{ cat }</h3>
          <div className={ this.state.showStats ? "stats_category_header_button_right_active" : "stats_category_header_button_right" } >
            <span>{ stats.answered }/{ this.props.questions.totals.category[cat].totals.questions } answered ({ questionsAnswered }%)</span>
            { header_menu_arrow }
          </div>
        </button>
        { this.state.showStats &&
          <div className="stats_category_wrapper" ref={ this.setStatsRef } >
            <div className="stats_category_sub_wrapper">
              <div className="stats_category_stats_container">
                <div className="stats_category_rank_rating_container">
                  <div className="stats_category_rank_rating_sub_container">
                    <h4>Rank</h4>
                    <span>{ stats.rank }</span>
                  </div>
                  <div className="stats_category_rank_rating_sub_container">
                    <h4>Rating</h4>
                    <div className="stats_category_rank_rating_sub_wrapper">
                      <span>{ stats.rating }</span>
                      { stats.rating >= this.props.questions.totals.category[cat].averages.questions.performance ? arrow_up : arrow_down }
                    </div>
                  </div>
                </div>
                <div className="stats_category_answers_container">
                  <span>{ stats.answered }/{ this.props.questions.totals.category[cat].totals.questions } answered ({ questionsAnswered }%)</span>
                  <span>
                    { stats.correct }/{ stats.answered } correct ({ questionsCorrect }%)
                    { questionsCorrect >= this.props.questions.totals.category[cat].averages.questions.correct ? arrow_up : arrow_down }
                  </span>
                </div>
                <div className="stats_category_time_container">
                  <span>
                    Average Time: { stats.avg_time } seconds
                    { stats.avg_time <= this.props.questions.totals.category[cat].averages.questions.avgTime ? arrow_up : arrow_down }
                  </span>
                  <span>Outta Times: { stats.outta_times }</span>
                </div>
              </div>
              <div className="stats_category_graph_container">
                <span>temp graph</span>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStatsCategoryCard)