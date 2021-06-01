const makeDeleteProfileButtons = (glyphIndex, onConfirm, onCancel) => {
  return [
    {
      name: 'deleteProfileConfirm',
      id: 'delete_profile_confirm',
      image: glyphIndex.formWhiteCheckMark,
      imageHover: glyphIndex.formGreyCheckMark,
      onClickFunction: onConfirm,
      tooltipText: [ 'Confirm' ],
      type: 'button',
      value: 'Confirm'
    },
    {
      name: 'deleteProfileCancel',
      id: 'delete_profile_cancel',
      image: glyphIndex.formWhiteX,
      imageHover: glyphIndex.formGreyX,
      onClickFunction: onCancel,
      tooltipText: [ 'Cancel' ],
      type: 'reset',
      value: 'Cancel'
    }
  ]
}

export default makeDeleteProfileButtons