import React from 'react'
import { useEffect } from 'react'
import LeaderBoardsHeader from '../leaderBoardsComponents/leaderBoardsHeader/leaderBoardsHeader'
import LeaderBoardsScoresCard from '../leaderBoardsComponents/leaderBoardsScoresCard/leaderBoardsScoresCard'

import './leaderBoardsSubContainer.css'

const LeaderBoardsRegionalContainer = (props) => {

  const { documentTitle, headerText, pageRowLimit, scores } = props

  useEffect(() => { document.title = `SmartApp™ | ${ documentTitle } Leaderboards` }, [documentTitle])

  const scoresSet = Object.entries(scores)

  const distribScoresSet = scoresSet.map((scores, index) => {
    return(
      <LeaderBoardsScoresCard
        key={ index }
        pageRowLimit={ pageRowLimit }
        scoresSetName={ scores[0] }
        sub_text={ 'Rating' }
        scores={ scores[1] }
      />
    )
  })

  return (
    <>
      <LeaderBoardsHeader header_text={ headerText } sub_text={ null } />
      <div className='leader_boards_sub_container'>
        { distribScoresSet }
      </div>
    </>
  )
}

export default LeaderBoardsRegionalContainer