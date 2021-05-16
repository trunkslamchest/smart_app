const makeVoteButtons = (hoverValue, voteStarsSelectIndex) => {
  return [
    {
      type: "ZeroStars",
      img: hoverValue === 0 ? voteStarsSelectIndex.noStarsSelected : voteStarsSelectIndex.noStarsUnselected,
      title: 'No Star Rating',
      vote: "ZeroStars",
      hover_value: 0
    },
    {
      type: "OneStars",
      img: hoverValue && hoverValue >= 1 ? voteStarsSelectIndex.Selected : voteStarsSelectIndex.Unselected,
      title: '1 Star Rating',
      vote: "OneStars",
      hover_value: 1
    },
    {
      type: "TwoStars",
      img: hoverValue && hoverValue >= 2 ? voteStarsSelectIndex.Selected : voteStarsSelectIndex.Unselected,
      title: '2 Star Rating',
      vote: "TwoStars",
      hover_value: 2
    },
    {
      type: "ThreeStars",
      img: hoverValue && hoverValue >= 3 ? voteStarsSelectIndex.Selected : voteStarsSelectIndex.Unselected,
      title: '3 Star Rating',
      vote: "ThreeStars",
      hover_value: 3
    },
    {
      type: "FourStars",
      img: hoverValue && hoverValue >= 4 ? voteStarsSelectIndex.Selected : voteStarsSelectIndex.Unselected,
      title: '4 Star Rating',
      vote: "FourStars",
      hover_value: 4
    },
    {
      type: "FiveStars",
      img: hoverValue && hoverValue === 5 ? voteStarsSelectIndex.Selected : voteStarsSelectIndex.Unselected,
      title: '5 Star Rating',
      vote: "FiveStars",
      hover_value: 5
    }
  ]
}

export default makeVoteButtons