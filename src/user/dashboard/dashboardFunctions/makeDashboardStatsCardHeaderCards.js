const makeDashboardStatsCardHeaderCards = (userTotals, qSetTotals, questionsAnswered, questionsCorrect, arrow_up, arrow_down) => {

  return(
    [
      {
        header_text: 'Rank',
        span_text: userTotals.rank
      },
      {
        header_text: 'Rating',
        span_text: userTotals.rating,
        arrow_img: userTotals.rating >= qSetTotals.averages.rating ? arrow_up : arrow_down
      },
      {
        header_text: 'Average Time',
        span_text: `${ (userTotals.avg_time).toFixed(2) } seconds`,
        arrow_img: userTotals.avg_time <= qSetTotals.averages.avgTime ? arrow_up : arrow_down
      },
      {
        header_text: 'Outta Times',
        span_text: userTotals.outta_times
      },
      {
        header_text: 'Answered',
        span_text: `${ userTotals.answered }/${ qSetTotals.questions } (${ questionsAnswered }%)`
      },
      {
        header_text: 'Correct',
        span_text: `${ userTotals.correct }/${ userTotals.answered } (${ questionsCorrect }%)`,
        arrow_img: questionsCorrect >= qSetTotals.averages.correct ? arrow_up : arrow_down
      },

    ]
  )
}

export default makeDashboardStatsCardHeaderCards