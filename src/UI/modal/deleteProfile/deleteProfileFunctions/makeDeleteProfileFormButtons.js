const makeDeleteProfileFormButtons = (glyphIndex, onSubmitConfirm, onSubmitCancel) => {
  return [
    {
      id: 'delete_profile_form_confirm',
      image: glyphIndex.formWhiteCheckMark,
      imageHover: glyphIndex.formGreyCheckMark,
      name: 'deleteProfileFormConfirm',
      onClickFunction: onSubmitConfirm,
      tooltipText: [ 'Delete Your Profile' ],
      type: 'button',
      value: 'DeleteProfile'
    },
    {
      id: 'delete_profile_form_cancel',
      image: glyphIndex.formWhiteX,
      imageHover: glyphIndex.formGreyX,
      name: 'deleteProfileFormCancel',
      onClickFunction: onSubmitCancel,
      tooltipText: [ 'Cancel' ],
      type: 'reset',
      value: 'Cancel'
    }
  ]
}

export default makeDeleteProfileFormButtons