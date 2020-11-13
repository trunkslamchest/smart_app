const gameModes = [
  {
    name:'Quick Play',
    val: 'quick_play',
    description: [
      `Questions are randomly selected from all available questions in the SmartApp™ Nexus.`,
      `You given 4 choices, and must select the correct answer within 10 seconds.`,
      `You cannot answer the same question twice.` ]
  },
  {
    name:'By Difficulty',
    val: 'by_diff',
    description: [
      `Select a specific difficulty to answer questions from.`,
      `Questions are randomly selected from all available questions from the difficulty you have selected.`,
      `You given 4 choices, and must select the correct answer within 10 seconds.`,
      `You cannot answer the same question twice.` ]
  },
  {
    name:'By Category',
    val: 'by_cat',
    description: [
      `Select a specific category to answer questions from.`,
      `Questions are randomly selected from all available questions from the category you have selected.`,
      `You given 4 choices, and must select the correct answer within 10 seconds.`,
      `You cannot answer the same question twice.` ]
  }
]

export default gameModes