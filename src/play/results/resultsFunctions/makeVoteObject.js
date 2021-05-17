const makeVoteObject = (type, qid, difficulty, category) => {
  return {
    type: type,
    qid: qid,
    difficulty: difficulty,
    category: category
  }
}

export default makeVoteObject