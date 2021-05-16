const calcVoteAvg = function(voteObj) {
  let multiplyObj = { ...voteObj }
  multiplyObj.FiveStars = voteObj.FiveStars * 5
  multiplyObj.FourStars = voteObj.FourStars * 4
  multiplyObj.ThreeStars = voteObj.ThreeStars * 3
  multiplyObj.TwoStars = voteObj.TwoStars * 2
  multiplyObj.OneStars = voteObj.OneStars * 1
  multiplyObj.total = parseFloat(((multiplyObj.FiveStars + multiplyObj.FourStars + multiplyObj.ThreeStars + multiplyObj.TwoStars + multiplyObj.OneStars) / voteObj.total).toFixed(2))
  return multiplyObj
}

export default calcVoteAvg