export const userQuestionAvgTime = (oTime, nTime) => {
  return oTime === 0 ? nTime : parseFloat(((oTime + nTime) / 2.00).toFixed(2))
}