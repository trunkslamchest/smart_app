const makeResultsTrendArrows = (
  userStat,
  questionStat,
  statType,
  trendArrowIndex,
  overall
) => {

  const arrows = {
    up_arrow:
      <img
        alt={ overall ? 'Stat Increase' : 'Higher than global average' }
        className='trend_arrow'
        src={ trendArrowIndex.greenArrowUp }
        title={ overall ? 'Stat Increase' : 'Higher than global average' }
      />,
    down_arrow:
      <img
        alt={ overall ? 'Stat Decrease' : 'Lower than global average' }
        className='trend_arrow'
        src={ trendArrowIndex.redArrowDown }
        title={ overall ? 'Stat Decrease' : 'Lower than global average' }
      />,
    no_arrow: <></>
  }

  function calcTrend(userStat, averageStat, statType, arrows) {
    let arrow = arrows.no_arrow
    if(userStat !== 0){
      if(statType === 'string')
        if(userStat < averageStat) arrow = arrows.up_arrow
        else if(userStat > averageStat) arrow = arrows.down_arrow
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