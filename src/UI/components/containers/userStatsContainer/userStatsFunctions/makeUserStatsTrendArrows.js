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

  return {
    rating: calcTrend(userRating, averageRating, 'percentage', arrows),
    answered: calcTrend(userAnswered, averageAnswered, 'percentage', arrows),
    correct: calcTrend(userCorrect, averageCorrect, 'percentage', arrows),
    averageTime: calcTrend(userTime, averageTime, 'time', arrows),
    outtaTime: calcTrend(userOuttaTime, averageOuttaTime, 'percentage', arrows)
  }
}

export default makeUserStatsTrendArrows