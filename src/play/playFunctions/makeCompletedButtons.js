const makeCompletedButtons = (onClickFunction, routes) => {
  return [
    {
      buttonClass: 'completed_button',
      id: 'qp_completed_button',
      name: 'qpCompletedButton',
      onClickFunction: onClickFunction,
      params: JSON.stringify({ route: routes.quick_play, mode: 'quick_play' }),
      text: 'Quick Play',
      tooltipText: [ 'Good Job!' ],
      tooltipClass: 'completed_button_tooltip'
    },
    {
      buttonClass: 'completed_button',
      id: 'cat_completed_button',
      name: 'catCompletedButton',
      onClickFunction: onClickFunction,
      params: JSON.stringify({ route: routes.by_cat_select, mode: 'by_cat' }),
      text: 'Choose A New Category',
      tooltipText: [ 'Amazing Job!' ],
      tooltipClass: 'completed_button_tooltip'
    },
    {
      buttonClass: 'completed_button',
      id: 'diff_completed_button',
      name: 'diffCompletedButton',
      onClickFunction: onClickFunction,
      params: JSON.stringify({ route: routes.by_diff_select, mode: 'by_diff' }),
      text: 'Choose A New Difficulty',
      tooltipText: [ 'Great Job!' ],
      tooltipClass: 'completed_button_tooltip'
    }
  ]
}

export default makeCompletedButtons