import React from 'react'
import { connect } from 'react-redux'

import LeaderBoardsHeader from '../leaderBoardsComponents/leaderBoardsHeader/leaderBoardsHeader'
import LeaderBoardsSubContainer from '../leaderBoardsComponents/leaderBoardsSubContainer/leaderBoardsSubContainer'

const LeaderBoardsCatContainer = (props) => {
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