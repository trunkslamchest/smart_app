import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'

import LeaderBoardsHeader from '../leaderBoardsComponents/leaderBoardsHeader/leaderBoardsHeader'
import LeaderBoardsScoresContainer from '../leaderBoardsContainers/leaderBoardsScoresContainer/leaderBoardsScoresContainer'

const LeaderBoardsOverallContainer = (props) => {

  useEffect(() => { document.title = "SmartApp™ | International Leaderboards" }, [])

  return(
    <>
      <LeaderBoardsHeader header_text={ "International" } sub_text={ "Rating" } />
      <LeaderBoardsScoresContainer
        pageRowLimit={ 15 }
        scores={ props.overallLeaderBoards }
      />
    </>
  )
}

const store = (store) => {
  return {
    overallLeaderBoards: store.leaderBoards.overall.international
  }
}

export default connect(store)(LeaderBoardsOverallContainer)