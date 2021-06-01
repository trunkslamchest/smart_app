const makeCommentFormButtons = (glyphIndex, onAddEditedComment, onCancelEditComment) => {
  return [
    {
      id: 'edit_comment_button',
      image: glyphIndex.formWhiteCheckMark,
      imageHover: glyphIndex.formGreyCheckMark,
      name: 'editCommentConfirmButton',
      onClickFunction: onAddEditedComment,
      tooltipText: [ 'Confirm' ],
      tooltipClass: 'edit_comment_button_tooltip',
      type: 'button'
    },
    {
      id: 'edit_comment_button',
      image: glyphIndex.formWhiteX,
      imageHover: glyphIndex.formGreyX,
      name: 'editCommentCancelButton',
      onClickFunction: onCancelEditComment,
      tooltipText: [ 'Cancel' ],
      tooltipClass: 'edit_comment_button_tooltip',
      type: 'button'
    }
  ]
}

export default makeCommentFormButtons