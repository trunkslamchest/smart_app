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
      { props.overallLeaderBoards &&
        <LeaderBoardsScoresContainer
          pageLimit={ 15 }
          scores={ props.overallLeaderBoards.international }
        />
      }
    </>
  )
}

const store = (store) => {
  return {
    overallLeaderBoards: store.leaderBoards.overall
  }
}

export default connect(store)(LeaderBoardsOverallContainer)