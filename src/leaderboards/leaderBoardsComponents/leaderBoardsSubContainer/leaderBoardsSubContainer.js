import React from 'react'

import LeaderBoardsScoresCard from '../leaderBoardsScoresCard/leaderBoardsScoresCard'

import './leaderBoardsSubContainer.css'

class LeaderBoardsSubContainer extends React.Component {
  render() {

    const scoresSet = Object.entries(this.props.scores)

    const distribScoresSet = scoresSet.map(scores => {
      return(
        <div
          className='leader_boards_sub_wrapper'
          key={ scoresSet.indexOf(scores) }
        >
          <LeaderBoardsScoresCard
            history={ this.props.history }
            scoresSetName={ scores[0] }
            sub_text={ 'Rating' }
            scores={ scores[1] }
            key={ scoresSet.indexOf(scores) + scores[0] }
          />
        </div>
      )
    })

    return (
      <div className='leader_boards_sub_container'>
        { distribScoresSet }
      </div>
    )
  }
}

export default LeaderBoardsSubContainer