import React from 'react'
import { connect } from 'react-redux'

import levels from '../../../datasets/levels'


import XPBar from '../../../UI/components/xpBar/xpBar'
import PlaySubHeaderCentered from '../../playComponents/playSubHeaderCentered/playSubHeaderCentered'
import makeResultsStatsSubCards from '../resultsFunctions/makeResultsStatsSubCards'
import makeResultsTrendArrows from '../resultsFunctions/makeResultsTrendArrows'

import ResultsStatsSubCard from './resultsStatsSubCard'

import trendArrowIndex from '../../../assets/trend_arrows/trendArrowIndex'

import './resultsStatsPerf.css'
import './resultsStatsQuestion.css'
import './resultsStatsXP.css'

const ResultsStats = (props) => {

  const componentClasses = {
    statsWrapper: 'results_stats_wrapper',
    xpContainer: 'results_xp_container',
    xpWrapper: 'results_xp_wrapper',
    xpSubWrapper: 'results_xp_sub_wrapper',
    xpCount: 'results_xp_count',
    xpBarContainer: 'results_xp_bar_container',
    xpBarSubContainer: 'results_xp_bar_sub_container',
    xpTotal: 'results_xp_total',
  }

  let subCards = makeResultsStatsSubCards(
    'results_perf_container',
    props.staticResults && !props.staticUserAchievements ? 'results_question_container results_question_static_no_achievements' : 'results_question_container',
    'results_perf_sub_container',
    props.staticResults && !props.staticUserAchievements ? 'results_question_sub_container results_question_static_no_achievements' : 'results_question_sub_container',
    'results_perf_sub_wrapper_top',
    componentClasses.xpContainer,
    'results_perf_sub_wrapper results_perf_sub_wrapper_left',
    'results_perf_sub_wrapper results_perf_sub_wrapper_right',
    'results_perf_sub_cards_wrapper',
    'results_perf_sub_card_container',
    'results_perf_sub_wrapper_text',
    componentClasses.xpWrapper,
    componentClasses.xpSubWrapper,
    'results_perf_sub_card_container results_question_sub_card_container',
    'results_question_sub_card_wrapper',
    'results_perf_sub_cards_wrapper results_question_sub_cards_wrapper',
    'results_question_sub_wrapper results_question_sub_wrapper_left',
    'results_question_sub_wrapper results_question_sub_wrapper_right',
    props.userQuestionRank,
    props.userQuestionRating,
    props.questionRating,
    props.userQuestionTime,
    props.averageTime,
    props.questionTime,
    props.userNewOverallRank,
    props.userOldOverallRank,
    props.userNewOverallRating,
    props.userOldOverallRating,
    props.userNewAvgTime,
    props.userOldAvgTime,
    props.totalAnswers,
    props.correctAnswers,
    props.incorrectAnswers,
    props.outtaTimeAnswers,
    props.questionDiff,
    props.questionDiffRating,
    makeResultsTrendArrows,
    trendArrowIndex
  )

  const distribSubCards = subCards.map((container, ci) => {
    return(<div className={ container.containerClass } key={ ci } >
      <PlaySubHeaderCentered header_text={ container.headerText } />
      <div className={ container.subContainerClass }>
        { container.subContainer.map((subContainer, sci) => {
          return(<div className={ subContainer.wrapperClass } key={ sci } >
            { subContainer.subWrappers.map((subWrapper, swi) => {
              return(<div className={ subWrapper.subWrapperClass } key={ swi } >
                <h1>{ subWrapper.cardTitle }</h1>
                <div className={ subWrapper.subCardWrapperClass }>
                  { subWrapper.subCards.map((subCard, sui) => {
                    return !!subCard.xpBar ?
                      <React.Fragment key={ sui }>
                        <div className={ componentClasses.xpCount }>
                          <h4>+{ props.userXPgain }</h4><h5>XP</h5>
                        </div>
                        <div className={ componentClasses.xpBarContainer }>
                          <h4>Level { props.userXPlevel }</h4>
                          <div className={ componentClasses.xpBarSubContainer }>
                          <XPBar
                              userXP={ props.userXPtotal }
                              userLevel={ props.userXPlevel }
                              prevLevelXP={ levels[props.userXPlevel - 1] }
                            />
                          </div>
                        </div>
                        <div className={ componentClasses.xpTotal }>
                          <h4>{ props.userXPtotal }</h4><h5>/{ levels[props.userXPlevel] }</h5>
                        </div>
                      </React.Fragment>
                    :
                      <ResultsStatsSubCard
                        cardClass={ subCard.cardClass }
                        key={ sui }
                        headerText={ subCard.headerText }
                        subHeaderText={ subCard.subHeaderText }
                        subTextClass={ subCard.subTextClass }
                        trendArrows={ subCard.trendArrows }
                      />
                    })}
                </div>
              </div>
            )})}
          </div>
        )})}
      </div>
    </div>
  )})

  return props.showStats && <div className={ componentClasses.statsWrapper }>{ distribSubCards }</div>
}

const store = store => {
  return {
    averageTime: store.play.question ? (store.play.question.answers.avg_time).toFixed(2) : (store.questions.staticQuestion.answers.avg_time).toFixed(2),
    correctAnswers: store.play.question ? store.play.question.answers.correct : store.questions.staticQuestion.answers.correct,
    incorrectAnswers: store.play.question ? store.play.question.answers.incorrect : store.questions.staticQuestion.answers.incorrect,
    outtaTimeAnswers: store.play.question ? store.play.question.answers.outta_time : store.questions.staticQuestion.answers.outta_time,
    questionDiff: store.play.question ? store.play.question.difficulty : store.questions.staticQuestion.difficulty,
    questionDiffRating: store.play.question ? (store.play.question.diffRating).toFixed(2) : (store.questions.staticQuestion.rating.difficulty).toFixed(2),
    questionRating: store.play.question ? store.play.question.perfRating : store.questions.staticQuestion.rating.performance,
    questionTime: store.play.question ? store.play.question.answers.avg_time : store.questions.staticQuestion ? store.questions.staticQuestion.answers.avg_time : null,
    userNewAvgTime: store.play.results ? store.play.results.performance.oPerf.avgTime : store.questions.staticUserResults.performance.oPerf.avgTime,
    userNewOverallRank: store.play.results ? store.play.results.performance.oPerf.rank : store.questions.staticUserResults.performance.oPerf.rank,
    userNewOverallRating: store.play.results ? store.play.results.performance.oPerf.rating : store.questions.staticUserResults.performance.oPerf.rating,
    userOldAvgTime: store.play.results ? store.play.results.performance.oPerf.old_avgTime : store.questions.staticUserResults.performance.oPerf.old_avgTime,
    userOldOverallRank: store.play.results ? store.play.results.performance.oPerf.old_rank : store.questions.staticUserResults.performance.oPerf.old_rank,
    userOldOverallRating: store.play.results ? store.play.results.performance.oPerf.old_rating : store.questions.staticUserResults.performance.oPerf.old_rating,
    userQuestionRank: store.play.results ? store.play.results.performance.qPerf.rank : store.questions.staticUserResults.performance.qPerf.rank,
    userQuestionRating: store.play.results ? store.play.results.performance.qPerf.rating : store.questions.staticUserResults.performance.qPerf.rating,
    userQuestionTime: store.play.answer ? store.play.answer.time : store.questions.staticUserResults.time,
    userXPgain: store.play.results ? store.play.results.experience.gain : store.questions.staticUserResults.experience.gain,
    userXPtotal: store.questions.staticUserResults ? store.questions.staticUserResults.experience.newTotal : store.user.experience.total,
    userXPlevel: store.questions.staticUserResults ? store.questions.staticUserResults.experience.level : store.user.experience.level,
    totalAnswers: store.play.question ? store.play.question.answers.total : store.questions.staticQuestion.answers.total
  }
}

export default connect(store)(ResultsStats)