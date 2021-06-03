const paginateLeaderBoard = (pageRowLimit, leaderBoard, catTemp) => {
    const maxRowLimit = leaderBoard.length
    let page = [], pagedScores = [], overflowLimit = pageRowLimit

    for(let row = 0; row <= overflowLimit;) {
      if(row < maxRowLimit) {
        leaderBoard[row].rank = row + 1
        page.push(leaderBoard[row])
      }
      if(row === overflowLimit - 1 && overflowLimit < maxRowLimit) {
        pagedScores.push(page)
        page = []
        overflowLimit += pageRowLimit
      }
      if(row < maxRowLimit || row < overflowLimit) row++
      if(row > maxRowLimit) page.push( null )
      if(row === overflowLimit) {
        pagedScores.push(page)
        break
      }
    }

  return pagedScores
}


export default paginateLeaderBoard