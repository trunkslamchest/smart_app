const calcVotePercents = (voteObj) => {
  if (voteObj.total === 0) return { "FiveStars": '0%', "FourStars": '0%', "ThreeStars": '0%', "TwoStars": '0%', "OneStars": '0%', "ZeroStars": '0%' }
  else return {
    "FiveStars": ((voteObj.FiveStars / voteObj.total) * 100).toFixed(2),
    "FourStars": ((voteObj.FourStars / voteObj.total) * 100).toFixed(2),
    "ThreeStars": ((voteObj.ThreeStars / voteObj.total) * 100).toFixed(2),
    "TwoStars": ((voteObj.TwoStars / voteObj.total) * 100).toFixed(2),
    "OneStars": ((voteObj.OneStars / voteObj.total) * 100).toFixed(2),
    "ZeroStars": ((voteObj.ZeroStars / voteObj.total) * 100).toFixed(2),
  }
}

export default calcVotePercents