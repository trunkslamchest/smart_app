import React from 'react'

const QuestionCardHeader = (props) => {
  return(
    <div className="question_card_header">
      <span>In { props.category }...</span>
      <div className='divider_medium' />
    </div>
  )
}

export default QuestionCardHeader
