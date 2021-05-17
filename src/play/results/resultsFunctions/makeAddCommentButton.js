const makeAddCommentButton = (enableAddCommentButton, onAddComment) => {
  return [
    {
      buttonClass: 'add_comment_button',
      id: 'add_comment_button',
      name: 'addCommentButton',
      enableButton: enableAddCommentButton,
      onClickFunction: onAddComment,
      text: "Leave A Comment",
      tooltipText: [ 'Discuss!' ],
      tooltipClass: 'add_comment_button_tooltip',
      type: 'submit'
    }
  ]
}

export default makeAddCommentButton