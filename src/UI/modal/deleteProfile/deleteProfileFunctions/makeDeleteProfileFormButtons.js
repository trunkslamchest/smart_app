const makeDeleteProfileFormButtons = (glyphIndex, onConfirm, onCancel) => {
  return [
    {
      name: 'deleteProfileFormConfirm',
      id: 'delete_profile_form_confirm',
      image: glyphIndex.formWhiteCheckMark,
      imageHover: glyphIndex.formBlackCheckMark,
      onClickFunction: onConfirm,
      tooltipText: [ 'Delete Your Profile' ],
      type: 'button',
      value: 'DeleteProfile'
    },
    {
      name: 'deleteProfileFormCancel',
      id: 'delete_profile_form_cancel',
      image: glyphIndex.formWhiteX,
      imageHover: glyphIndex.formBlackX,
      onClickFunction: onCancel,
      tooltipText: [ 'Cancel' ],
      type: 'reset',
      value: 'Cancel'
    }
  ]
}

export default makeDeleteProfileFormButtons