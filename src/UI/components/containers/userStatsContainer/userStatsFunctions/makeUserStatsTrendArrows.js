const makeUserStatsTrendArrows = (
  trendArrowIndex,
  userRating,
  averageRating,
  userAnswered,
  averageAnswered,
  userCorrect,
  averageCorrect,
  userTime,
  averageTime,
  userOuttaTimes,
  averageOuttaTimes
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

  function calcTrend(userStat, averageStat, arrows) {
    let arrow = arrows.no_arrow

    if(userStat !== 0){
      if(userStat > averageStat) arrow = arrows.up_arrow
      else if(userStat < averageStat) arrow = arrows.down_arrow
    }

    return arrow
  }

  return {
    rating: calcTrend(userRating, averageRating, arrows),
    answered: calcTrend(userAnswered, averageAnswered, arrows),
    correct: calcTrend(userCorrect, averageCorrect, arrows),
    averageTime: calcTrend(userTime, averageTime, arrows),
    outtaTimes: calcTrend(userOuttaTimes, averageOuttaTimes, arrows)
  }
}

export default makeUserStatsTrendArrows