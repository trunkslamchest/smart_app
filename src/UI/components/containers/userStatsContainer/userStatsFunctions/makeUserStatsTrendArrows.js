const makeUserStatsTrendArrows = (
  userRating,
  averageRating,
  userAnswered,
  averageAnswered,
  userCorrect,
  averageCorrect,
  userTime,
  averageTime,
  userOuttaTime,
  averageOuttaTime,
  trendArrowIndex
) => {

  const arrows = {
    even_bar:
      <img
        alt='Even with global average'
        className='trend_arrow'
        src={ trendArrowIndex.greyEvenBar }
        title='Even with global average'
      />,
    green_up_arrow:
      <img
        alt='Higher than global average'
        className='trend_arrow'
        src={ trendArrowIndex.greenArrowUp }
        title='Higher than global average'
      />,
    green_down_arrow:
      <img
        alt='Lower than global average'
        className='trend_arrow'
        src={ trendArrowIndex.greenArrowDown }
        title='Lower than global average'
      />,
    red_down_arrow:
      <img
        alt='Lower than global average'
        className='trend_arrow'
        src={ trendArrowIndex.redArrowDown }
        title='Lower than global average'
      />,
    red_up_arrow:
      <img
        alt='Higher than global average'
        className='trend_arrow'
        src={ trendArrowIndex.redArrowUp }
        title='Higher than global average'
      />
  }

  function calcTrend(userStat, averageStat, statType, arrows) {
    let arrow = arrows.even_bar

    if(userStat !== 0){
      if(statType === 'percentage')
        if(userStat > averageStat) arrow = arrows.green_up_arrow
        else if(userStat < averageStat) arrow = arrows.red_down_arrow
      if(statType === 'time')
        if(userStat > averageStat) arrow = arrows.red_up_arrow
        else if(userStat < averageStat) arrow = arrows.green_down_arrow
    }

    return arrow
  }

  return {
    rating: calcTrend(userRating, averageRating, 'percentage', arrows),
    answered: calcTrend(userAnswered, averageAnswered, 'percentage', arrows),
    correct: calcTrend(userCorrect, averageCorrect, 'percentage', arrows),
    averageTime: calcTrend(userTime, averageTime, 'time', arrows),
    outtaTime: calcTrend(userOuttaTime, averageOuttaTime, 'percentage', arrows)
  }
}

export default makeUserStatsTrendArrows