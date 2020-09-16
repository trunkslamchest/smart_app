import React from 'react'

import { connect } from 'react-redux'

import './questionCard.css'

const QuestionCard = (props) => {

  const onClickFunctions = (event) => {
    event.persist()
    props.onClickFunctions(event)
  }

  const choices = props.play.question.choices.map(choice => {
    let i = props.play.question.choices.indexOf(choice)
    return <button
        key={`answer_button_${i}`}
        value={ i }
        className={props.enableQuestion ? "question_card_choices_button" : "question_card_choices_button_disabled" }
        name="answer_button"
        onClick={ props.enableQuestion ? onClickFunctions : null }
      >
        { choice }
      </button>
    })

  return(
    <div className="question_card">
      <div className={ props.showTimer ? "question_card_timer" : "blank" } >
        <h2>Time Left</h2>
        <h1>{ props.showTimer && props.time }</h1>
      </div>
      <div className={ props.showHeader ? "question_card_header" : "blank" }>
        In { props.showHeader && props.play.question.category }...
      </div>
      <div className={ props.showQuestion ? "question_card_text" : "blank" }>
        { props.showQuestion && props.play.question.question }
      </div>
      <div className={ props.showChoices ? "question_card_choices" : "blank" }>
        { props.showChoices &&
          <>
            <div className='div1'>
              { choices[0] }
              { choices[1] }
            </div>
            <div className='div2'>
              { choices[2] }
              { choices[3] }
            </div>
          </>
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return{
    play: state.play
  }
}

export default connect(mapStateToProps)(QuestionCard)