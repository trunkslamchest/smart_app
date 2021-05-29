const makeDashboardViewQuestionButton = (glyphIndex, onPushLink, route, diff, cat, qid) => {
  return [
    {
      buttonType: 'NavLink',
      id: 'dashboard_stats_view_question_button',
      image: glyphIndex.whiteView,
      imageHover: glyphIndex.greyView,
      name: 'dashboardStatsViewQuestionButton',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: route + '/' + diff + '/' + cat + '/' + qid + '/stats' }),
      route: route + '/' + diff + '/' + cat + '/' + qid + '/stats',
      tooltipText: [ 'View Results for this question' ]
    }
  ]
}

export default makeDashboardViewQuestionButton