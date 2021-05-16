import getTime from '../../../utility/getTime'

const makeCommentObject = (props, editedComment) => {
  let obj = {}

  if(!props.staticResults) {
    obj.question = {
      type: 'play',
      qid: props.play.question.id,
      difficulty: props.play.question.difficulty,
      category: props.play.question.category
    }
  } else {
    obj.question = {
      type: 'static',
      qid: props.questions.staticQuestion.qid,
      difficulty: props.questions.staticQuestion.difficulty,
      category: props.questions.staticQuestion.category
    }
  }

  obj.comment = {
    uid: localStorage.id,
    cid: props.comment.cid,
    comment: editedComment,
    user: props.user.info.user_name,
    timestamp: getTime('fullDate')
  }

  return obj
}

export default makeCommentObject