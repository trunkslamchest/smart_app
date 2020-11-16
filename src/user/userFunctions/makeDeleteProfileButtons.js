const makeDeleteProfileButtons = (glyphIndex, onConfirm, onCancel, enableButton) => {
  return [
    {
      name: 'deleteProfileConfirm',
      id: 'delete_profile_confirm',
      image: glyphIndex.formWhiteCheckMark,
      imageHover: glyphIndex.formBlackCheckMark,
      onClickFunction: onConfirm,
      tooltipText: [ 'Confirm' ],
      type: 'button',
      enableButton: enableButton,
      value: 'Confirm'
    },
    {
      name: 'deleteProfileCancel',
      id: 'delete_profile_cancel',
      image: glyphIndex.formWhiteX,
      imageHover: glyphIndex.formBlackX,
      onClickFunction: onCancel,
      tooltipText: [ 'Cancel' ],
      type: 'reset',
      enableButton: enableButton,
      value: 'Cancel'
    }
  ]
}

export default makeDeleteProfileButtons