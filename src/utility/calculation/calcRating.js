export const userQuestionRating = (oRating, nRating) => {
  return oRating === 0 ? nRating : parseFloat(((oRating + nRating) / 2.00).toFixed(2))
}