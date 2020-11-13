import React from 'react'
import { connect } from 'react-redux'

import LeaderBoardsHeader from '../leaderBoardsComponents/leaderBoardsHeader/leaderBoardsHeader'
import LeaderBoardsSubContainer from '../leaderBoardsComponents/leaderBoardsSubContainer/leaderBoardsSubContainer'

const LeaderBoardsCountriesContainer = (props) => {
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

const mapStateToProps = (state) => {
  return {
    leaderBoards: state.leaderBoards
  }
}

export default connect(mapStateToProps)(LeaderBoardsCountriesContainer)