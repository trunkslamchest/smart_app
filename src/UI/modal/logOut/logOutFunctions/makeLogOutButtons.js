const makeLogOutButtons = (glyphIndex, onConfirm, onCancel) => {
  return [
    {
      name: 'LogOutSubmit',
      id: 'log_Out_submit',
      image: glyphIndex.formWhiteCheckMark,
      imageHover: glyphIndex.formBlackCheckMark,
      onClickFunction: onConfirm,
      tooltipText: [ 'Log Out' ],
      type: 'submit',
      value: 'LogOut'
    },
    {
      name: 'LogOutCancel',
      id: 'log_Out_cancel',
      image: glyphIndex.formWhiteX,
      imageHover: glyphIndex.formBlackX,
      onClickFunction: onCancel,
      tooltipText: [ 'Cancel' ],
      type: 'reset',
      value: 'Cancel'
    }
  ]
}

export default makeLogOutButtons