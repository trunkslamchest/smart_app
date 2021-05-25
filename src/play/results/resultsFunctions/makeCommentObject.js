import getTime from '../../../utility/getTime'

const makeCommentObject = (staticResults, questionId, questionDifficulty, questionCategory, comment, userName, editedComment) => {
  return {
    question: {
      qid: questionId,
      difficulty: questionDifficulty,
      category: questionCategory,
      type: !staticResults ? 'play' : 'static'
    },
    comment: {
      uid: localStorage.id,
      cid: comment.cid,
      comment: editedComment,
      user: userName,
      timestamp: getTime('fullDate')
    }
  }
}

export default makeCommentObject