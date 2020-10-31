import React from 'react'
import { connect } from 'react-redux'

import LeaderBoardsHeader from '../leaderBoardsComponents/leaderBoardsHeader/leaderBoardsHeader'
import LeaderBoardsSubContainer from '../leaderBoardsComponents/leaderBoardsSubContainer/leaderBoardsSubContainer'
// import LeaderBoardsScoresContainer from '../leaderBoardsComponents/leaderBoardsScoresContainer/leaderBoardsScoresContainer'

import './leaderBoardsCatContainer.css'

class LeaderBoardsCatContainer extends React.Component {

  render() {
    return(
      <div className="leader_boards_cat_container">
        <LeaderBoardsHeader header_text={ "Categories" } sub_text={ null } />
        { this.props.leaderBoards.cat && <LeaderBoardsSubContainer history={ this.props.history } scores={ this.props.leaderBoards.cat.international } /> }

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    leaderBoards: state.leaderBoards
  }
}

export default connect(mapStateToProps)(LeaderBoardsCatContainer)