import React from 'react'

import PlayButton from '../../UI/buttons/playButton/playButton'

import './homeLoggedIn.css'

const HomeLoggedInPlayButtonsContainer = (props) => {


  const onClickQuickPlayFunctions = (event) => {

  }

  const onClickPlayByDifficultyFunctions = (event) => {

  }

  const onClickPlayByCategoryFunctions = (event) => {

  }

  return(
    <div className="play_buttons_container">
      <div className="quick_play_container">
        <PlayButton
          link="/quick_play"
          buttonName="quick_play_button"
          classType="quick_play_button"
          onClick={ onClickQuickPlayFunctions }
        >
          Quick Play
        </PlayButton>
      </div>
      <div className="other_play_container">
        <PlayButton
          link="/play_by_difficulty"
          buttonName="play_by_difficulty_button"
          classType="play_by_difficulty_button"
          onClick={ onClickPlayByDifficultyFunctions }
        >
          Play By Difficulty
        </PlayButton>
        <PlayButton
          link="/play_by_category"
          buttonName="play_by_category_button"
          classType="play_by_category_button"
          onClick={ onClickPlayByCategoryFunctions }
        >
          Play By Category
        </PlayButton>
      </div>
    </div>
  )
}

export default HomeLoggedInPlayButtonsContainer