const makeNextQuestionButton = (enableNextQuestionButton, onClickNextQuestion) => {
  return [
    {
      buttonClass: 'next_question_button',
      id: 'next_question_button',
      name: 'nextQuestionButton',
      enableButton: enableNextQuestionButton,
      onClickFunction: onClickNextQuestion,
      text: "Next Question",
      tooltipText: [ 'Answer another question' ],
      tooltipClass: 'next_question_button_tooltip',
      type: 'button'
   }
  ]
}

export default makeNextQuestionButton