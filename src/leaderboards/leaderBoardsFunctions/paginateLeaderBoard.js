const paginateLeaderBoard = (pageLimit, leaderBoard) => {
    const rowLimit = leaderBoard.length
    let page = [], pagedScores = [], currentCount = pageLimit

    // for(let i = 0; i <= currentCount; i++) {
    //   if(i < currentCount && !!leaderBoard[i]) {
    //     leaderBoard[i].rank = i + 1
    //     page.push(leaderBoard[i])
    //   }
    //   if(i === currentCount - 1) {
    //     pagedScores.push(page)
    //     page = []
    //     currentCount += 15
    //   }
    //   if(!leaderBoard[i]) {
    //     pagedScores.push(page)
    //     break
    //   }
    // }

    for(let i = 0, j = rowLimit; (i <= currentCount && currentCount <= rowLimit) || j < currentCount;) {
      if(i < rowLimit) {
        leaderBoard[i].rank = i + 1
        page.push(leaderBoard[i])
      }
      if(i === currentCount - 1) {
        pagedScores.push(page)
        page = []
        currentCount += pageLimit
      }
      if(i < rowLimit) i++
      if(i === rowLimit) j++
      if(j <= currentCount && j > rowLimit) page.push( null )
      if(j === currentCount) pagedScores.push(page)
    }

  return pagedScores
}


export default paginateLeaderBoard