import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import LeaderBoardsHeader from '../leaderBoardsComponents/leaderBoardsHeader/leaderBoardsHeader'
import LeaderBoardsScoresContainer from '../leaderBoardsComponents/leaderBoardsScoresContainer/leaderBoardsScoresContainer'

const LeaderBoardsOverallContainer = (props) => {

  useEffect(() => { document.title = "SmartApp™ | International Leaderboards" }, [])

  return(
    <>
      <LeaderBoardsHeader header_text={ "International" } sub_text={ "Rating" } />
      { props.leaderBoards.overall &&
        <LeaderBoardsScoresContainer
          pageLimit={ 15 }
          scores={ props.leaderBoards.overall.international }
        />
      }
    </>
  )
}

const store = (store) => {
  return {
    leaderBoards: store.leaderBoards
  }
}

export default connect(store)(LeaderBoardsOverallContainer)