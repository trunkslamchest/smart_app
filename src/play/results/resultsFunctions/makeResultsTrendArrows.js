const makeResultsTrendArrows = (userStat, questionStat, statType, trendArrowIndex, overall) => {

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
        alt={ overall ? 'Stat Increase' : 'Higher than global average' }
        className='trend_arrow'
        src={ trendArrowIndex.greenArrowUp }
        title={ overall ? 'Stat Increase' : 'Higher than global average' }
      />,
    green_down_arrow:
      <img
        alt={ overall ? 'Stat Increase' : 'Lower than global average' }
        className='trend_arrow'
        src={ trendArrowIndex.greenArrowDown }
        title={ overall ? 'Stat Decrease' : 'Lower than global average' }
      />,
    red_down_arrow:
      <img
        alt={ overall ? 'Stat Decrease' : 'Lower than global average' }
        className='trend_arrow'
        src={ trendArrowIndex.redArrowDown }
        title={ overall ? 'Stat Decrease' : 'Lower than global average' }
      />,
    red_up_arrow:
      <img
        alt={ overall ? 'Stat Decrease' : 'Higher than global average' }
        className='trend_arrow'
        src={ trendArrowIndex.redArrowUp }
        title={ overall ? 'Stat Decrease' : 'Higher than global average' }
      />
  }

  function calcTrend(userStat, averageStat, statType, arrows) {
    let arrow = arrows.even_bar

    if(userStat !== 0){
      if(statType === 'string')
        if(userStat < averageStat) arrow = arrows.green_up_arrow
        else if(userStat > averageStat) arrow = arrows.red_down_arrow
      if(statType === 'percentage')
        if(userStat > averageStat) arrow = arrows.green_up_arrow
        else if(userStat < averageStat) arrow = arrows.red_down_arrow
      if(statType === 'time')
        if(userStat > averageStat) arrow = arrows.red_up_arrow
        else if(userStat < averageStat) arrow = arrows.green_down_arrow
    }

    return arrow
  }

  return calcTrend(userStat, questionStat, statType, arrows)
}

export default makeResultsTrendArrows