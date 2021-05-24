import React from 'react'
import { useEffect } from 'react'
// import useOnMount from '../../../utility/hooks/useOnMount'
import LeaderBoardsHeader from '../../leaderBoardsComponents/leaderBoardsHeader/leaderBoardsHeader'
import LeaderBoardsScoresCard from '../../leaderBoardsComponents/leaderBoardsScoresCard/leaderBoardsScoresCard'

import './leaderBoardsSubContainer.css'

const LeaderBoardsSubContainer = (props) => {

  const { documentTitle, headerText, pageLimit, scores } = props

  useEffect(() => { document.title = `SmartApp™ | ${ documentTitle } Leaderboards` }, [documentTitle])

  const scoresSet = Object.entries(scores)

  const distribScoresSet = scoresSet.map((scores, index) => {
    return(
      <React.Fragment key={ index }>
        <div className='leader_boards_sub_wrapper'>
          <LeaderBoardsScoresCard
            pageLimit={ pageLimit }
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
    <>
      <LeaderBoardsHeader header_text={ headerText } sub_text={ null } />
      <div className='leader_boards_sub_container'>
        { distribScoresSet }
      </div>
    </>
  )
}

export default LeaderBoardsSubContainer