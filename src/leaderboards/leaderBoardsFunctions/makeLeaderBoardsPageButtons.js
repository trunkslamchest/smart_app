const makeLeaderBoardsPageButtons = (leaderboardGlyphIndex, currentPage, maxPages) => {
  return [
    {
      alt: 'PreviousPageButton',
      id: 'leaderboard_prev_button',
      image: leaderboardGlyphIndex.leaderboardPrev,
      imageHover: leaderboardGlyphIndex.leaderboardPrevHover,
      name: 'leaderboardPrevButton',
      pageLimit: currentPage !== 0,
      tooltipText: [ 'Previous Page' ],
      value: -1
    },
    {
      alt: 'NextPageButton',
      id: 'leaderboard_next_button',
      image: leaderboardGlyphIndex.leaderboardNext,
      imageHover: leaderboardGlyphIndex.leaderboardNextHover,
      name: 'leaderboardNextButton',
      pageLimit: currentPage !== maxPages - 1,
      tooltipText: [ 'Next Page' ],
      value: 1
    }
  ]
}

export default makeLeaderBoardsPageButtons