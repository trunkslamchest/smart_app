import React from 'react'
import { connect } from 'react-redux'

import LeaderBoardsHeader from '../../leaderBoardsComponents/leaderBoardsHeader/leaderBoardsHeader'
import LeaderBoardsSubContainer from '../../leaderBoardsComponents/leaderBoardsSubContainer/leaderBoardsSubContainer'

import './leaderBoardsCountriesContainer.css'

const LeaderBoardsCountriesContainer = (props) => {
  return(
    <div className="leader_boards_countries_container">
      <LeaderBoardsHeader header_text={ "Countries" } sub_text={ null } />
      { props.leaderBoards.overall &&
        <LeaderBoardsSubContainer
          history={ props.history }
          pageLimit={ 5 }
          scores={ props.leaderBoards.overall.regional }
        />
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    leaderBoards: state.leaderBoards
  }
}

export default connect(mapStateToProps)(LeaderBoardsCountriesContainer)