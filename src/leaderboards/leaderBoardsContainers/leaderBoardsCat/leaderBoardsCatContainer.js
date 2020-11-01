import React from 'react'
import { connect } from 'react-redux'

import LeaderBoardsHeader from '../../leaderBoardsComponents/leaderBoardsHeader/leaderBoardsHeader'
import LeaderBoardsSubContainer from '../../leaderBoardsComponents/leaderBoardsSubContainer/leaderBoardsSubContainer'

import './leaderBoardsCatContainer.css'

const LeaderBoardsCatContainer = (props) => {
  return(
    <div className="leader_boards_cat_container">
      <LeaderBoardsHeader header_text={ "Categories" } sub_text={ null } />
      { props.leaderBoards.cat &&
        <LeaderBoardsSubContainer
          history={ props.history }
          pageLimit={ 10 }
          scores={ props.leaderBoards.cat.international }
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

export default connect(mapStateToProps)(LeaderBoardsCatContainer)