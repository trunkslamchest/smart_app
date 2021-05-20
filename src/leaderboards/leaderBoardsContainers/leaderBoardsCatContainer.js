import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import LeaderBoardsHeader from '../leaderBoardsComponents/leaderBoardsHeader/leaderBoardsHeader'
import LeaderBoardsSubContainer from '../leaderBoardsComponents/leaderBoardsSubContainer/leaderBoardsSubContainer'

const LeaderBoardsCatContainer = (props) => {

  useEffect(() => { document.title = "SmartApp™ | Category Leaderboards" }, [])

  return(
    <>
      <LeaderBoardsHeader header_text={ "Categories" } sub_text={ null } />
      { props.leaderBoards.cat &&
        <LeaderBoardsSubContainer
          pageLimit={ 10 }
          scores={ props.leaderBoards.cat.international }
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

export default connect(store)(LeaderBoardsCatContainer)