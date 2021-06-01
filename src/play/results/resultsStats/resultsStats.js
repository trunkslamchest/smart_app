import React from 'react'
import { connect } from 'react-redux'

import levels from '../../../datasets/levels'

import XPBar from '../../../UI/components/xpBar/xpBar'
import makeResultsTrendArrows from '../resultsFunctions/makeResultsTrendArrows'
import PlaySubHeaderCentered from '../../playComponents/playSubHeaderCentered/playSubHeaderCentered'

import trendArrowIndex from '../../../assets/trend_arrows/trendArrowIndex'

import './resultsStatsPerf.css'
import './resultsStatsQuestion.css'
import './resultsStatsXP.css'

const ResultsStats = (props) => {

  console.log(props.staticResults, !props.staticUserAchievements)

  const componentClasses = {
    questionContainer: props.staticResults && !props.staticUserAchievements ? 'results_question_container results_question_static_no_achievements' : 'results_question_container',
    questionSubContainer: props.staticResults && !props.staticUserAchievements ? 'results_question_sub_container results_question_static_no_achievements' : 'results_question_sub_container',
    questionSubWrapperLeft: 'results_question_sub_wrapper_left',
    questionSubWrapperRight: 'results_question_sub_wrapper_right',
    questionCardWrapper: 'results_question_card_wrapper',
    questionCardLeft: 'results_question_stat_card results_question_stat_card_left',
    questionCardRight: 'results_question_stat_card results_question_stat_card_right',
    perfContainer: 'results_perf_container',
    perfSubContainer: 'results_perf_sub_container',
    perfSubWrapper: 'results_perf_sub_wrapper',
    perfSubWrapperTop: 'results_perf_sub_wrapper_top',
    perfSubWrapperLeft: 'results_perf_sub_wrapper results_perf_sub_wrapper_left',
    perfSubWrapperRight: 'results_perf_sub_wrapper results_perf_sub_wrapper_right',
    perfSubWrapperHeader: 'results_perf_sub_wrapper_header',
    perfSubWrapperText: 'results_perf_sub_wrapper_text',
    statsWrapper: 'results_stats_wrapper',
    xpContainer: 'results_xp_container',
    xpWrapper: 'results_xp_wrapper',
    xpCount: 'results_xp_count',
    xpBarContainer: 'results_xp_bar_container',
    xpBarSubContainer: 'results_xp_bar_sub_container',
    xpTotal: 'results_xp_total',
  }

  return(
    <>
      { props.showStats &&
        <div className={ componentClasses.statsWrapper }>
          <div className={ componentClasses.perfContainer }>
            <PlaySubHeaderCentered header_text={ 'Your Performance' } />
            <div className={ componentClasses.perfSubContainer }>
              <div className={ componentClasses.perfSubWrapperTop }>
                <div className={ componentClasses.perfSubWrapperLeft }>
                  <div className={ componentClasses.perfSubWrapperHeader }>
                    <h4>Rank</h4>
                  </div>
                  <div className={ componentClasses.perfSubWrapperText }>
                    <h5>{ props.userRank }</h5>
                    { makeResultsTrendArrows(props.userRating, props.questionRating, 'percentage', trendArrowIndex) }
                  </div>
                </div>
                <div className={ componentClasses.perfSubWrapper }>
                    <div className={ componentClasses.perfSubWrapperHeader }>
                      <h4>Rating</h4>
                    </div>
                    <div className={ componentClasses.perfSubWrapperText }>
                      <h5>{ props.userRating }</h5>
                      { makeResultsTrendArrows(props.userRating, props.questionRating, 'percentage', trendArrowIndex) }
                    </div>
                  </div>
                <div className={ componentClasses.perfSubWrapperRight }>
                    <div className={ componentClasses.perfSubWrapperHeader }>
                      <h4>Time</h4>
                    </div>
                    <div className={ componentClasses.perfSubWrapperText }>
                      <h5>{ props.userTime } seconds</h5>
                      { makeResultsTrendArrows(props.userTime, props.questionTime, 'time', trendArrowIndex) }
                    </div>
                  </div>
                </div>
                <div className={ componentClasses.xpContainer }>
                  <div className={ componentClasses.xpWrapper }>
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
                  </div>
                </div>
              </div>
          </div>
          <div className={ componentClasses.questionContainer }>
            <PlaySubHeaderCentered header_text={ 'Question Stats' } />
           <div className={ componentClasses.questionSubContainer }>
              <div className={ componentClasses.questionSubWrapperLeft }>
                <h4>Difficulty</h4>
                <div className={ componentClasses.questionCardWrapper }>
                  <div className={ componentClasses.questionCardLeft }>
                      <h5>Level</h5>
                      <h6>{ props.questionDiff[0].toUpperCase() + props.questionDiff.slice(1, props.questionDiff.length)}</h6>
                  </div>
                  <div className={ componentClasses.questionCardRight }>
                      <h5>Rating</h5>
                      <h6>{ props.questionDiffRating }</h6>
                  </div>
                </div>
              </div>
              <div className={ componentClasses.questionSubWrapperRight }>
                <h4>Total Answers: { props.totalAnswers }</h4>
                <div className={ componentClasses.questionCardWrapper }>
                  <div className={ componentClasses.questionCardLeft }>
                    <h5>Correct</h5>
                    <h6>{ props.correctAnswers }</h6>
                  </div>
                <div className={ componentClasses.questionCardLeft }>
                    <h5>Incorrect</h5>
                    <h6>{ props.incorrectAnswers }</h6>
                </div>
                <div className={ componentClasses.questionCardLeft }>
                    <h5>Outta Times</h5>
                    <h6>{ props.outtaTimeAnswers }</h6>
                </div>
                <div className={ componentClasses.questionCardRight }>
                    <h5>Average Time</h5>
                    <h6>{ props.averageTime } seconds</h6>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

const store = store => {
  return {
    userRating: store.play.results ? store.play.results.performance.qPerf.rating : store.questions.staticUserResults.performance.rating,
    userRank: store.play.results ? store.play.results.performance.qPerf.rank : store.questions.staticUserResults.performance.rank,
    questionRating: store.play.question ? store.play.question.perfRating : store.questions.staticQuestion.rating.performance,
    userTime: store.play.answer ? store.play.answer.time : store.questions.staticUserResults.time,
    questionTime: store.play.question ? store.play.question.answers.avg_time : store.questions.staticQuestion ? store.questions.staticQuestion.answers.avg_time : null,
    userXPgain: store.play.results ? store.play.results.experience.gain : store.questions.staticUserResults.experience.gain,
    userXPtotal: store.questions.staticUserResults ? store.questions.staticUserResults.experience.newTotal : store.user.experience.total,
    userXPlevel: store.questions.staticUserResults ? store.questions.staticUserResults.experience.level : store.user.experience.level,
    questionDiff: store.play.question ? store.play.question.difficulty : store.questions.staticQuestion.difficulty,
    questionDiffRating: store.play.question ? (store.play.question.diffRating).toFixed(2) : (store.questions.staticQuestion.rating.difficulty).toFixed(2),
    totalAnswers: store.play.question ? store.play.question.answers.total : store.questions.staticQuestion.answers.total,
    correctAnswers: store.play.question ? store.play.question.answers.correct : store.questions.staticQuestion.answers.correct,
    incorrectAnswers: store.play.question ? store.play.question.answers.incorrect : store.questions.staticQuestion.answers.incorrect,
    outtaTimeAnswers: store.play.question ? store.play.question.answers.outta_time : store.questions.staticQuestion.answers.outta_time,
    averageTime: store.play.question ? (store.play.question.answers.avg_time).toFixed(2) : (store.questions.staticQuestion.answers.avg_time).toFixed(2)
  }
}

export default connect(store)(ResultsStats)