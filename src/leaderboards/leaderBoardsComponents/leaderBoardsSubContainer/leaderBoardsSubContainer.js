import React from 'react'

import LeaderBoardsScoresCard from '../leaderBoardsScoresCard/leaderBoardsScoresCard'

import './leaderBoardsSubContainer.css'

const LeaderBoardsSubContainer = (props) => {

  const scoresSet = Object.entries(props.scores)

  const distribScoresSet = scoresSet.map((scores, index) => {
    return(
      <React.Fragment key={ index }>
        <div className='leader_boards_sub_wrapper'>
          <LeaderBoardsScoresCard
            history={ props.history }
            pageLimit={ props.pageLimit }
            scoresSetName={ scores[0] }
            sub_text={ 'Rating' }
            scores={ scores[1] }
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

export default LeaderBoardsSubContainer