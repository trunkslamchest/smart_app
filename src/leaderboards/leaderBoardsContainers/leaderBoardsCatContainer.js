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
          history={ props.history }
          pageLimit={ 10 }
          scores={ props.leaderBoards.cat.international }
        />
      }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    leaderBoards: state.leaderBoards
  }
}

export default connect(mapStateToProps)(LeaderBoardsCatContainer)