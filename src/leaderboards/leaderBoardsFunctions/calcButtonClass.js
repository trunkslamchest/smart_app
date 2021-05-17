const calcButtonClass = (buttons, pageLimit, index) => {
  if(pageLimit){
    if(index === 0) {
      return 'leader_boards_buttons_row_button_left'
    } else if ( index === buttons - 1) {
      return 'leader_boards_buttons_row_button_right'
    } else {
      return 'leader_boards_buttons_row_button_middle'
    }
  } else {
    return 'leader_boards_buttons_row_button_disabled'
  }
}

export default calcButtonClass