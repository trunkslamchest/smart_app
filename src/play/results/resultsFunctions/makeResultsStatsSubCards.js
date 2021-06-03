const makeResultsStatsSubCards = (
  perfContainer,
  questionContainer,
  perfSubContainer,
  questionSubContainer,
  perfSubWrapperTop,
  xpContainer,
  perfSubWrapperLeft,
  perfSubWrapperRight,
  perfSubCardsWrapper,
  perfSubCard,
  perfSubWrapperText,
  xpWrapper,
  xpSubWrapper,
  questionSubCard,
  questionSubCardWrapper,
  questionSubCardsWrapper,
  questionSubWrapperLeft,
  questionSubWrapperRight,
  userQuestionRank,
  userQuestionRating,
  questionRating,
  userQuestionTime,
  averageTime,
  questionTime,
  userNewOverallRank,
  userOldOverallRank,
  userNewOverallRating,
  userOldOverallRating,
  userNewAvgTime,
  userOldAvgTime,
  totalAnswers,
  correctAnswers,
  incorrectAnswers,
  outtaTimeAnswers,
  questionDiff,
  questionDiffRating,
  makeResultsTrendArrows,
  trendArrowIndex
) => {

  return [
    {
      containerClass: perfContainer,
      headerText: 'Your Stats',
      subContainerClass: perfSubContainer,
      subContainer: [
        {
          wrapperClass: perfSubWrapperTop,
          subWrappers: [
            {
              subWrapperClass: perfSubWrapperLeft,
              subCardWrapperClass: perfSubCardsWrapper,
              cardTitle: 'This Question',
              subCards: [
                {
                  cardClass: perfSubCard,
                  subTextClass: perfSubWrapperText,
                  headerText: 'Rank',
                  subHeaderText: userQuestionRank,
                  trendArrows: makeResultsTrendArrows(userQuestionRating, questionRating, 'percentage', trendArrowIndex, false)
                },
                {
                  cardClass: perfSubCard,
                  subTextClass: perfSubWrapperText,
                  headerText: 'Rating',
                  subHeaderText: userQuestionRating,
                  trendArrows: makeResultsTrendArrows(userQuestionRating, questionRating, 'percentage', trendArrowIndex, false)
                },
                {
                  cardClass: perfSubCard,
                  subTextClass: perfSubWrapperText,
                  headerText: 'Time',
                  subHeaderText: `${ userQuestionTime } seconds`,
                  trendArrows: makeResultsTrendArrows(averageTime, questionTime, 'time', trendArrowIndex, false)
                }
              ]
            },
            {
              subWrapperClass: perfSubWrapperRight,
              subCardWrapperClass: perfSubCardsWrapper,
              cardTitle: 'Overall',
              subCards: [
                {
                  cardClass: perfSubCard,
                  subTextClass: perfSubWrapperText,
                  headerText: 'Rank',
                  subHeaderText: userNewOverallRank,
                  trendArrows: makeResultsTrendArrows(userNewOverallRank, userOldOverallRank, 'string', trendArrowIndex, true)
                },
                {
                  cardClass: perfSubCard,
                  subTextClass: perfSubWrapperText,
                  headerText: 'Rating',
                  subHeaderText: userNewOverallRating,
                  trendArrows: makeResultsTrendArrows(userNewOverallRating, userOldOverallRating, 'percentage', trendArrowIndex, true)
                },
                {
                  cardClass: perfSubCard,
                  subTextClass: perfSubWrapperText,
                  headerText: 'Average Time',
                  subHeaderText: `${ userNewAvgTime } seconds`,
                  trendArrows: makeResultsTrendArrows(userNewAvgTime, userOldAvgTime, 'time', trendArrowIndex, true)
                }
              ]
            },
          ]
        },
        {
          wrapperClass: xpContainer,
          subWrappers: [
            {
              subWrapperClass: xpSubWrapper,
              subCardWrapperClass: xpWrapper,
              cardTitle: 'Experience',
              subCards: [ { xpBar: true } ]
            }
          ]
        }
      ]
    },
    {
      containerClass: questionContainer,
      headerText: 'Question Stats',
      subContainerClass: questionSubContainer,
      subContainer: [
        {
          wrapperClass: questionSubWrapperLeft,
          subWrappers: [
            {
              subWrapperClass: questionSubCardWrapper,
              subCardWrapperClass: questionSubCardsWrapper,
              cardTitle: `Total Answers: ${ totalAnswers }`,
              subCards: [
                {
                  cardClass: questionSubCard,
                  subTextClass: perfSubWrapperText,
                  headerText: 'Correct',
                  subHeaderText: correctAnswers
                },
                {
                  cardClass: questionSubCard,
                  subTextClass: perfSubWrapperText,
                  headerText: 'Incorrect',
                  subHeaderText: incorrectAnswers
                },
                {
                  cardClass: questionSubCard,
                  subTextClass: perfSubWrapperText,
                  headerText: 'Outta Times',
                  subHeaderText: outtaTimeAnswers
                },
                {
                  cardClass: questionSubCard,
                  subTextClass: perfSubWrapperText,
                  headerText: 'Average Time',
                  subHeaderText: averageTime
                }
              ]
            }
          ]
        },
        {
          wrapperClass: questionSubWrapperRight,
          subWrappers: [
            {
              subWrapperClass: questionSubCardWrapper,
              subCardWrapperClass: perfSubCardsWrapper,
              cardTitle: 'Difficulty',
              subCards: [
                {
                  cardClass: perfSubCard,
                  subTextClass: perfSubWrapperText,
                  headerText: 'Level',
                  subHeaderText: questionDiff[0].toUpperCase() + questionDiff.slice(1, questionDiff.length)
                },
                {
                  cardClass: perfSubCard,
                  subTextClass: perfSubWrapperText,
                  headerText: 'Rating',
                  subHeaderText: questionDiffRating
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

export default makeResultsStatsSubCards