import React from 'react'

const QuestionCardTimer = (props) => {
  return(
    <div className="question_card_timer">
      <h2>Time Left</h2>
      <h1>{ props.time }</h1>
      <div className='divider_medium' />
    </div>
  )
}

export default React.memo(QuestionCardTimer)
