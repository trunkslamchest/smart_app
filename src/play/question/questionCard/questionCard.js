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
      // <button
      //   key={ index }
      //   value={ choice }
      //   className={ props.enableQuestion ? "question_card_choice_button" : "question_card_choice_button_disabled" }
      //   name="answer_button"
      //   onClick={ props.enableQuestion ? onClickFunctions : null }
      // >
      //   { choice }
      // </button>
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


                // id={ button.id }
                // image={ button.image }
                // imageHover={ button.imageHover }
                // key={ index }
                // name={ button.name }
                // enableButton={ props.enableButton }
                // onClickFunction={ button.onClickFunction }
                // params={ button.params }
                // text={ button.text }
                // tooltipText={ button.tooltipText }
                // tooltipClass={ props.tooltipClass }
                // type={ button.type }

  return(
    <>
      { props.showTimer &&
        <div className="question_card_timer">
          <h2>Time Left</h2>
          <h1>{ props.time }</h1>
        </div>
      }
      { props.showHeader &&
        <div className="question_card_header">
          <span>In { props.play.question.category }...</span>
        </div>
      }
      { props.showQuestion &&
      <div className="question_card_text">
        <span>{ props.play.question.question }</span>
      </div>
      }
      { props.showChoices &&
        <div className="question_card_choices_container">
          <div className='div1'>
            { choices[0] }
            { choices[1] }
          </div>
          <div className='div2'>
            { choices[2] }
            { choices[3] }
          </div>
        </div>
      }
    </>
  )
}

const mapStateToProps = state => {
  return{
    play: state.play
  }
}

export default connect(mapStateToProps)(QuestionCard)