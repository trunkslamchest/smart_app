import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import LeaderBoardsHeader from '../leaderBoardsComponents/leaderBoardsHeader/leaderBoardsHeader'
import LeaderBoardsSubContainer from '../leaderBoardsComponents/leaderBoardsSubContainer/leaderBoardsSubContainer'

const LeaderBoardsCountriesContainer = (props) => {

  useEffect(() => { document.title = "SmartApp™ | Regional Leaderboards" }, [])

  return(
    <>
      <LeaderBoardsHeader header_text={ "Countries" } sub_text={ null } />
      { props.leaderBoards.overall &&
        <LeaderBoardsSubContainer
          history={ props.history }
          pageLimit={ 5 }
          scores={ props.leaderBoards.overall.regional }
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

export default connect(store)(LeaderBoardsCountriesContainer)