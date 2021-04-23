import React from 'react'

import LeaderBoardsScoresCard from '../leaderBoardsScoresCard/leaderBoardsScoresCard'

import './leaderBoardsSubContainer.css'

class LeaderBoardsSubContainer extends React.Component {

  render() {

    const scoresSet = Object.entries(this.props.scores)

    const distribScoresSet = scoresSet.map((scores, index) => {
      return(
        <React.Fragment key={ index }>
        <div className='leader_boards_sub_wrapper'>
          <LeaderBoardsScoresCard
            history={ this.props.history }
            pageLimit={ this.props.pageLimit }
            scoresSetName={ scores[0] }
            sub_text={ 'Rating' }
            scores={ scores[1] }
            key={ scoresSet.indexOf(scores) + scores[0] }
          />
        </div>
        <div className='divider_large' />
        </React.Fragment>
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