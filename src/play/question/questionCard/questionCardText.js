import React from 'react'

const QuestionCardText = (props) => {
  return(
    <div className="question_card_text">
      <span>{ props.question }</span>
      <div className='divider_medium' />
    </div>
  )
}

export default React.memo(QuestionCardText)