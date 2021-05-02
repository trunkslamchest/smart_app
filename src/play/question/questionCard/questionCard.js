import React from 'react'
import { connect } from 'react-redux'

import DefaultButton from '../../../UI/buttons/defaultButton'

import './questionCard.css'

const QuestionCard = (props) => {

  const onClickFunction = (event) => {
    event.persist()
    props.onClickFunction(event)
  }

  const choices = props.play.question.choices.map((choice, index) => {
    return(
      <DefaultButton
        buttonClass="question_card_choice_button"
        enableButton={ props.enableQuestion }
        id="answer_button"
        key={ index }
        name="AnswerButton"
        onClickFunction={ onClickFunction }
        params={ JSON.stringify({ choice: choice }) }
        text={ choice }
        type='button'
      />
    )
  })

  return(
    <>
      { props.showTimer &&
        <div className="question_card_timer">
          <h2>Time Left</h2>
          <h1>{ props.time }</h1>
          <div className='divider_medium' />
        </div>
      }
      { props.showHeader &&
        <div className="question_card_header">
          <span>In { props.play.question.category }...</span>
          <div className='divider_medium' />
        </div>
      }
      { props.showQuestion &&
      <div className="question_card_text">
        <span>{ props.play.question.question }</span>
        <div className='divider_medium' />
      </div>
      }
      { props.showChoices &&
        <div className="question_card_choices_container">
          <div className="question_card_choices_sub_container">
            <div className='div1'>
              { choices[0] }
              { choices[1] }
            </div>
            <div className='div2'>
              { choices[2] }
              { choices[3] }
            </div>
          </div>
          <div className='divider_large' />
        </div>
      }
    </>
  )
}

const store = store => {
  return{
    play: store.play
  }
}

export default connect(store)(QuestionCard)