const roundVoteAverageForStarRating = (avg) => {
  let calcPercent = parseFloat(((avg / 5) * 100).toFixed(2))
  let roundDown = Math.floor(calcPercent / 10) * 10
  if(roundDown < 9) roundDown = 0
  if(roundDown < 18 && roundDown >= 9) roundDown = 9
  if(roundDown < 28 && roundDown >= 18) roundDown = 18
  if(roundDown < 37 && roundDown >= 28) roundDown = 28
  if(roundDown < 47 && roundDown >= 37) roundDown = 37
  if(roundDown < 56 && roundDown >= 47) roundDown = 47
  if(roundDown < 66 && roundDown >= 56) roundDown = 56
  if(roundDown < 75 && roundDown >= 66) roundDown = 66
  if(roundDown < 85 && roundDown >= 75) roundDown = 75
  if(roundDown < 100 && roundDown >= 85) roundDown = 85
  return roundDown
}

export default roundVoteAverageForStarRating