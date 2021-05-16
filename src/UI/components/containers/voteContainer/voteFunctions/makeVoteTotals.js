const makeVoteTotals = (votePercents, voteProps, voteStarsRatingIndex) => {
  return [
    {
      alt: '5_star_rating',
      img: voteStarsRatingIndex.FiveStars,
      name: 'five_star_rating',
      title: '5 Star Rating',
      percent: votePercents.FiveStars,
      totals: voteProps.FiveStars
    },
    {
      alt: '4_star_rating',
      img: voteStarsRatingIndex.FourStars,
      name: 'four_star_rating',
      title: '4 Star Rating',
      percent: votePercents.FourStars,
      totals: voteProps.FourStars
    },
    {
      alt: '3_star_rating',
      img: voteStarsRatingIndex.ThreeStars,
      name: 'three_star_rating',
      title: '3 Star Rating',
      percent: votePercents.ThreeStars,
      totals: voteProps.ThreeStars
    },
    {
      alt: '2_star_rating',
      img: voteStarsRatingIndex.TwoStars,
      name: 'two_star_rating',
      title: '2 Star Rating',
      percent: votePercents.TwoStars,
      totals: voteProps.TwoStars
    },
    {
      alt: '1_star_rating',
      img: voteStarsRatingIndex.OneStars,
      name: 'one_star_rating',
      title: '1 Star Rating',
      percent: votePercents.OneStars,
      totals: voteProps.OneStars
    },
    {
      alt: 'no_star_rating',
      img: voteStarsRatingIndex.ZeroStars,
      name: 'zero_star_rating',
      title: 'No Star Rating',
      percent: votePercents.ZeroStars,
      totals: voteProps.ZeroStars
    }
  ]
}

export default makeVoteTotals