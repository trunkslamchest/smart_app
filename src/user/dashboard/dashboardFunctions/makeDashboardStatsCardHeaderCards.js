const makeDashboardStatsCardHeaderCards = (userTotals, qSetTotals, questionsAnswered, trendArrowIndex) => {

  const arrows = {
    up_arrow:
      <img
        alt='Higher than global average'
        className='trend_arrow'
        src={ trendArrowIndex.greenArrowUp }
        title='Higher than global average'
      />,
    down_arrow:
      <img
        alt='Lower than global average'
        className='trend_arrow'
        src={ trendArrowIndex.redArrowDown }
        title='Lower than global average'
      />,
    no_arrow: <></>
  }

  function calcTrend(userStat, averageStat, statType, arrows) {
    let arrow = arrows.no_arrow

    if(userStat !== 0){
      if(statType === 'percentage')
        if(userStat > averageStat) arrow = arrows.up_arrow
        else if(userStat < averageStat) arrow = arrows.down_arrow
      if(statType === 'time')
        if(userStat > averageStat) arrow = arrows.down_arrow
        else if(userStat < averageStat) arrow = arrows.up_arrow
    }

    return arrow
  }

  return(
    [
      {
        header_text: 'Rank',
        span_text: userTotals.rank,
        arrow_img: calcTrend(userTotals.rating, qSetTotals.averages.rating, 'percentage', arrows)
      },
      {
        header_text: 'Rating',
        span_text: userTotals.rating,
        arrow_img: calcTrend(userTotals.rating, qSetTotals.averages.rating, 'percentage', arrows)
      },
      {
        header_text: 'Average Time',
        // span_text: `${ (userTotals.averages.avgTime).toFixed(2) }s`,
        span_text: <>{ (userTotals.averages.avgTime).toFixed(2) }<span>s</span></>,

        arrow_img: calcTrend(userTotals.averages.avgTime, qSetTotals.averages.avgTime, 'time', arrows)
      },
      {
        header_text: 'Outta Times',
        span_text: userTotals.outta_time,
        arrow_img: calcTrend(userTotals.averages.outta_time, qSetTotals.averages.outta_time, 'percentage', arrows)
      },
      {
        header_text: 'Answered',
        span_text: `${ userTotals.answered }/${ qSetTotals.questions } (${ questionsAnswered }%)`,
        arrow_img: calcTrend(questionsAnswered, qSetTotals.answers, 'percentage', arrows)
      },
      {
        header_text: 'Correct',
        span_text: `${ userTotals.correct }/${ userTotals.answered } (${ userTotals.averages.correct }%)`,
        arrow_img: calcTrend(userTotals.averages.correct, qSetTotals.averages.correct, 'percentage', arrows)
      },

    ]
  )
}

export default makeDashboardStatsCardHeaderCards