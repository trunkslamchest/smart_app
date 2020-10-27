const formatDay = (day) => {
  if(day === 0) return ''
  const number_ends = [ 'st', 'nd', 'rd', 'th' ], number_split = day.toString().split('').pop()
  if (day > 10 && day < 19) return day + number_ends[3]
  else {
    if ((number_split === '1')) return day + number_ends[0]
    else if (number_split === '2') return day + number_ends[1]
    else if (number_split === '3') return day + number_ends[2]
    else return day + number_ends[3]
  }
}

export default formatDay