import React from 'react'

import DefaultButton from '../../../UI/buttons/defaultButton'

const QuestionCardChoices = (props) => {

  const choices = props.choices.map((choice, index) => {
    return(
      <DefaultButton
        buttonClass="question_card_choice_button"
        buttonContainerClass="question_card_choice_button_container"
        enableButton={ props.enableQuestion }
        id="answer_button"
        key={ index }
        name="AnswerButton"
        onClickFunction={ props.onClickFunction }
        params={ JSON.stringify({ choice: choice, time: props.time }) }
        text={ choice }
        type='button'
      />
    )
  })

  return(
    <div className="question_card_choices_container">
      <div className="question_card_choices_sub_container">
        <div className='question_card_choices_sub_wrapper'>
          { choices[0] }
          { choices[1] }
        </div>
        <div className='question_card_choices_sub_wrapper'>
          { choices[2] }
          { choices[3] }
        </div>
      </div>
      <div className='divider_large' />
    </div>
  )
}

export default QuestionCardChoices
