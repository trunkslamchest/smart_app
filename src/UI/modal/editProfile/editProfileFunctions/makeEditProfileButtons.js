const makeEditProfileButtons = (glyphIndex, onConfirm, onCancel) => {
  return [
    {
      name: 'EditProfileConfirm',
      id: 'Edit_profile_confirm',
      image: glyphIndex.formWhiteCheckMark,
      imageHover: glyphIndex.formGreyCheckMark,
      onClickFunction: onConfirm,
      tooltipText: [ 'Confirm' ],
      type: 'button',
      value: 'Confirm'
    },
    {
      name: 'EditProfileCancel',
      id: 'Edit_profile_cancel',
      image: glyphIndex.formWhiteX,
      imageHover: glyphIndex.formGreyX,
      onClickFunction: onCancel,
      tooltipText: [ 'Cancel' ],
      type: 'reset',
      value: 'Cancel'
    }
  ]
}

export default makeEditProfileButtons