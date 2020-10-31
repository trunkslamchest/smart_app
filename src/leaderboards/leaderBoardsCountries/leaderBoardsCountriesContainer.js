import React from 'react'
import { connect } from 'react-redux'

import LeaderBoardsHeader from '../leaderBoardsComponents/leaderBoardsHeader/leaderBoardsHeader'
import LeaderBoardsSubContainer from '../leaderBoardsComponents/leaderBoardsSubContainer/leaderBoardsSubContainer'

import './leaderBoardsCountriesContainer.css'

class LeaderBoardsCountriesContainer extends React.Component {

  render() {
    return(
      <div className="leader_boards_countries_container">
        <LeaderBoardsHeader header_text={ "Countries" } sub_text={ null } />
        { this.props.leaderBoards.overall && <LeaderBoardsSubContainer history={ this.props.history } scores={ this.props.leaderBoards.overall.regional } /> }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    leaderBoards: state.leaderBoards
  }
}

export default connect(mapStateToProps)(LeaderBoardsCountriesContainer)