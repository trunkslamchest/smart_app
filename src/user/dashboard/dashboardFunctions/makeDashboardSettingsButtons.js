const makeDashboardSettingsButtons = (onSubmit, onReset, onCancel, formGlyphIndex) => {
  return [
    {
      id: 'dashboard_settings_submit',
      name: 'dashboardSettingsSubmit',
      // params: ,
      onClickFunction: onSubmit,
      type: 'button',
      // text: ,
      image: formGlyphIndex.formWhiteCheckMark,
      imageHover: formGlyphIndex.formBlackCheckMark,
      tooltipText: [ 'Confirm' ],
    },
    {
      id: 'dashboard_settings_reset',
      name: 'dashboardSettingsReset',
      // params: ,
      onClickFunction: onReset,
      type: 'button',
      // text: ,
      image: formGlyphIndex.formWhiteReset,
      imageHover: formGlyphIndex.formBlackReset,
      tooltipText: [ 'Reset' ],
    },
    {
      id: 'dashboard_settings_cancel',
      name: 'dashboardSettingsCancel',
      // params: ,
      onClickFunction: onCancel,
      type: 'button',
      // text: ,
      image: formGlyphIndex.formWhiteX,
      imageHover: formGlyphIndex.formBlackX,
      tooltipText: [ 'Cancel' ],
    }
  ]
}

export default makeDashboardSettingsButtons

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

      // { idName: 'dashboardSettingsSubmit', type: 'input', form_type: 'submit', onClickFunction: this.onSubmit, value: 'Confirm' },
      // { idName: 'dashboardSettingsReset', type: 'input', form_type: 'reset', onClickFunction: this.props.onReset, value: 'Reset' },
      // { idName: 'dashboardSettingsCancel', type: 'button', onClickFunction: this.props.onCancel, value: 'Cancel' }