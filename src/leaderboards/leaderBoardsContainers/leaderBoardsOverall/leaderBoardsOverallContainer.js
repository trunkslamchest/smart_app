import React from 'react'
import { connect } from 'react-redux'

import LeaderBoardsHeader from '../../leaderBoardsComponents/leaderBoardsHeader/leaderBoardsHeader'
import LeaderBoardsScoresContainer from '../../leaderBoardsComponents/leaderBoardsScoresContainer/leaderBoardsScoresContainer'

import './leaderBoardsOverallContainer.css'

const LeaderBoardsOverallContainer = (props) => {
  return(
    <div className="leader_boards_overall_container">
      <LeaderBoardsHeader header_text={ "International" } sub_text={ "Rating" } />
      { props.leaderBoards.overall &&
        <LeaderBoardsScoresContainer
          history={ props.history }
          pageLimit={ 15 }
          scores={ props.leaderBoards.overall.international }
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

export default connect(mapStateToProps)(LeaderBoardsOverallContainer)