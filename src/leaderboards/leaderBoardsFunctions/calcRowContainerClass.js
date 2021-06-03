const calcRowContainerClass = (prevScore, nextScore, cardNumber, currentPage, score) => {
  let rowClass = ''

  if(cardNumber <= 3 && currentPage === 0) {
    rowClass = 'leader_boards_top3_card_container'
    if(!score) rowClass = 'leader_boards_top3_card_container_blank'
    if(cardNumber === 1) rowClass = `${rowClass} leader_boards_top3_card_container_1st`
    if(cardNumber === 2) rowClass = `${rowClass} leader_boards_top3_card_container_2nd`
    if(cardNumber === 3) rowClass = `${rowClass} leader_boards_top3_card_container_3rd`
  }
  else {
    rowClass = 'leader_boards_scores_row_container'
    if(!prevScore) rowClass = `${rowClass} leader_boards_scores_row_container_top`
    if(!nextScore) rowClass = `${rowClass} leader_boards_scores_row_container_bottom`
  }

  return rowClass
}

export default calcRowContainerClass