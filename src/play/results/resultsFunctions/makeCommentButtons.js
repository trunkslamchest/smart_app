const makeCommentButtons = (glyphIndex, onEditComment, onDeleteComment) => {
  return [
    {
      buttonClass: 'edit_comment_button',
      id: 'edit_comment_button',
      image: glyphIndex.whiteEdit,
      imageHover: glyphIndex.greyEdit,
      name: 'editCommentButton',
      onClickFunction: onEditComment,
      tooltipText: [ 'Edit Your Comment' ],
      tooltipClass: 'edit_comment_button_tooltip',
      type: 'button'
    },
    {
      buttonClass: 'delete_comment_button',
      id: 'delete_comment_button',
      image: glyphIndex.whiteDelete,
      imageHover: glyphIndex.greyDelete,
      name: 'deleteCommentButton',
      onClickFunction: onDeleteComment,
      tooltipText: [ 'Delete Your Comment' ],
      tooltipClass: 'edit_comment_button_tooltip',
      type: 'button'
    }
  ]
}

export default makeCommentButtons