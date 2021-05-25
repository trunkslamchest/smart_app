import React from 'react'

import DashboardStatsAnswersContainer from '../dashboardStatsAnswersContainer/dashboardStatsAnswersContainer'
import DashboardStatsCardHeader from '../dashboardStatsCardHeader/dashboardStatsCardHeader'

import makeDashboardStatsCardHeaderCards from '../../../../dashboardFunctions/makeDashboardStatsCardHeaderCards'

import trendArrowIndex from '../../../../../../assets/trend_arrows/trendArrowIndex'
import menuArrowIndex from '../../../../../../assets/menu_arrows/menuArrowIndex'

import './dashboardStatsCardHeaderButton.css'
import './dashboardStatsCardHeaderButtonActive.css'
import './dashboardStatsCardHeaderButtonHover.css'
import './dashboardStatsCardHeaderButtonActiveHover.css'
import './dashboardStatsCard.css'

class DashboardStatsCard extends React.Component {

  state = {
    showStats: false,
    showAnswers: false,
    headerButtonHover: false,
    answersButtonHover: false
  }

  constructor(props) {
    super(props)
    this.buttonRef = React.createRef()
    this.statsRef = React.createRef()
  }

  componentDidMount() { document.addEventListener('click', this.onClickListen) }
  componentWillUnmount() { document.removeEventListener('click', this.onClickListen) }

  onClickListen = (event) => {
    if((!!this.statsRef.current && !this.statsRef.current.contains(event.target)) &&
      (!!this.buttonRef.current && !this.buttonRef.current.contains(event.target)) &&
      (event.target.nodeName === "BUTTON" || event.target.nodeName === "IMG" || event.target.nodeName === "SPAN" || event.target.nodeName === "H3" || event.target.nodeName === "DIV") &&
      event.target.className !== "main_container" &&
      event.target.parentNode.className.split("_")[0] === 'stats'
    ) this.setState({ showStats: false, showAnswers: false })
  }

  onStatHover = (event) => { event.target.attributes.hover_trigger && this.setState({ [event.target.attributes.hover_trigger.value]: true }) }
  offStatHover = (event) => { event.target.attributes.hover_trigger && this.setState({ [event.target.attributes.hover_trigger.value]: false }) }

  scrollToSection = () => { this.buttonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) }

  onDropDown = () => {
    // if(this.state.showStats) document.body.scrollTop = 0
    // else this.scrollToSection()
    this.scrollToSection()
    let switchStats = !this.state.showStats
    this.setState({ showStats: switchStats })
  }

  numZero = (num) => {
    let splitNum = num.split('')
    return !!parseInt(splitNum[ splitNum.length - 1]) ? parseFloat(splitNum.join('')) : Math.round(parseInt(num))
  }

  headerCards = () => {
    let questionsAnswered = this.numZero(((this.props.userTotals.answered / this.props.qSetTotals.questions) * 100).toFixed(2))

    let makeHeaderCards = makeDashboardStatsCardHeaderCards(
      this.props.userTotals,
      this.props.qSetTotals,
      questionsAnswered,
      trendArrowIndex
    )

    let headerCards = makeHeaderCards.map((card, index) => {
      return(
        <DashboardStatsCardHeader
          key={ index }
          header_text={ card.header_text }
          span_text={ card.span_text }
          arrow_img={ card.arrow_img }
        />
      )
    })

    return headerCards
  }

  render(){

    const arrow_grey_down = <img alt='open' className='header_button_menu_arrow' hover_trigger="headerButtonHover" src={ menuArrowIndex.greyArrowDown } />
    const arrow_grey_left = <img alt='closed' className='header_button_menu_arrow' hover_trigger="headerButtonHover" src={ menuArrowIndex.greyArrowLeft } />

    let statsCardBlock = <></>
    let header_menu_arrow = arrow_grey_left
    let header_menu_arrow_disabled = arrow_grey_left

    if(typeof this.props.answers === 'string') {
      statsCardBlock =
        <div className="stats_card_no_answers_container">
          <h3>{ this.props.qSubSet }</h3>
          <div className="stats_card_no_answers_left_container">
            { header_menu_arrow_disabled }
          </div>
        </div>
    } else {
      if(this.state.headerButtonHover) header_menu_arrow = arrow_grey_left
      if(this.state.showStats) header_menu_arrow = arrow_grey_down
      statsCardBlock =
        <>
          <button
            className={ this.state.showStats ? "stats_card_header_button_active" : "stats_card_header_button" }
            hover_trigger="headerButtonHover"
            ref={ this.buttonRef }
            onClick={ this.onDropDown }
            onMouseEnter={ this.onStatHover }
            onMouseLeave={ this.offStatHover }
          >
            <h3>{ this.props.qSubSet }</h3>
            { header_menu_arrow }
          </button>
          { this.state.showStats &&
            <div className="stats_card_wrapper" ref={ this.statsRef }>
              <div className='stats_card_header'>
                { this.headerCards() }
              </div>
              <DashboardStatsAnswersContainer
                answers={ this.props.answers }
                qSet={ this.props.qSet }
                qSubSet={ this.props.qSubSet }
              />
            </div>
          }
        </>
    }

    return statsCardBlock
  }
}

export default DashboardStatsCard