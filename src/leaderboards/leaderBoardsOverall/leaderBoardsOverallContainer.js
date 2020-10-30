import React from 'react'
import { connect } from 'react-redux'

import LeaderBoardsHeader from '../leaderBoardsComponents/leaderBoardsHeader/leaderBoardsHeader'
import LeaderBoardsCountriesContainer from '../leaderBoardsComponents/leaderBoardsCountriesContainer/leaderBoardsCountriesContainer'
import LeaderBoardsScoresContainer from '../leaderBoardsComponents/leaderBoardsScoresContainer/leaderBoardsScoresContainer'

import './leaderBoardsOverallContainer.css'

class LeaderBoardsOverallContainer extends React.Component {

  render() {
    return(
      <div className="leader_boards_overall_container">
        <div className="leader_boards_overall_sub_container">
          <LeaderBoardsHeader header_text={ "International" } sub_text={ "Rating"} />
          { this.props.leaderBoards.overall && <LeaderBoardsScoresContainer history={ this.props.history } scores={ this.props.leaderBoards.overall.international } /> }
        </div>
        <div className="leader_boards_overall_sub_container">
          <LeaderBoardsHeader header_text={ "Countries" } sub_text={ null } />
          { this.props.leaderBoards.overall && <LeaderBoardsCountriesContainer history={ this.props.history } scores={ this.props.leaderBoards.overall.regional } /> }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    leaderBoards: state.leaderBoards
  }
}

export default connect(mapStateToProps)(LeaderBoardsOverallContainer)