const makeDashboardSettingsButtons = (onSubmit, onReset, onCancel, formGlyphIndex) => {
  return [
    {
      id: 'dashboard_settings_submit',
      name: 'dashboardSettingsSubmit',
      onClickFunction: onSubmit,
      image: formGlyphIndex.formWhiteCheckMark,
      imageHover: formGlyphIndex.formBlackCheckMark,
      tooltipText: [ 'Confirm' ],
      type: 'button'
    },
    {
      id: 'dashboard_settings_reset',
      name: 'dashboardSettingsReset',
      onClickFunction: onReset,
      image: formGlyphIndex.formWhiteReset,
      imageHover: formGlyphIndex.formBlackReset,
      tooltipText: [ 'Reset' ],
      type: 'button'
    },
    {
      id: 'dashboard_settings_cancel',
      name: 'dashboardSettingsCancel',
      onClickFunction: onCancel,
      image: formGlyphIndex.formWhiteX,
      imageHover: formGlyphIndex.formBlackX,
      tooltipText: [ 'Cancel' ],
      type: 'button'
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