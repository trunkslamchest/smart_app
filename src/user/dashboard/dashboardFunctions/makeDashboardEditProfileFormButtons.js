const makeDashboardEditProfileFormButtons = (onSubmit, onReset, onCancel, formGlyphIndex) => {
  return [
    {
      id: 'dashboard_edit_profile_submit',
      name: 'dashboardEditProfileSubmit',
      // params: ,
      onClickFunction: onSubmit,
      type: 'button',
      // text: ,
      image: formGlyphIndex.formWhiteCheckMark,
      imageHover: formGlyphIndex.formGreyCheckMark,
      tooltipText: [ 'Confirm' ],
    },
    {
      id: 'dashboard_edit_profile_reset',
      name: 'dashboardEditProfileReset',
      // params: ,
      onClickFunction: onReset,
      type: 'button',
      // text: ,
      image: formGlyphIndex.formWhiteReset,
      imageHover: formGlyphIndex.formGreyReset,
      tooltipText: [ 'Reset' ],
    },
    {
      id: 'dashboard_edit_profile_cancel',
      name: 'dashboardEditProfileCancel',
      // params: ,
      onClickFunction: onCancel,
      type: 'button',
      // text: ,
      image: formGlyphIndex.formWhiteX,
      imageHover: formGlyphIndex.formGreyX,
      tooltipText: [ 'Cancel' ],
    }
  ]
}

export default makeDashboardEditProfileFormButtons

// this.props.enableButton
// this.props.buttonClass
// this.props.id
// this.props.name
// this.props.params
// this.props.onClickFunction
// this.props.type
// this.props.text
// this.props.image
// this.props.imageHover
// this.props.tooltipText
// this.props.tooltipClass