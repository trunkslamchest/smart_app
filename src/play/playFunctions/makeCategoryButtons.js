const makeCategoryButtons = (categories, routes, setQset) => {
  return categories.map((category, index) => {
    return {
      buttonType: 'NavLink',
      id: `${category.val}_button`,
      key: index,
      name: category.name,
      onClickFunction: setQset,
      params: JSON.stringify({ qSet: category.name, route: routes.by_cat_question }),
      route: routes.by_cat,
      text: category.name,
      tooltipText: category.description
    }
  })
}

export default makeCategoryButtons