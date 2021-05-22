const makeResultsTrendArrows = (
  userStat,
  questionStat,
  statType,
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

  return calcTrend(userStat, questionStat, statType, arrows)
}

export default makeResultsTrendArrows