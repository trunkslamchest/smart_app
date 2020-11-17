const makeLeaderBoardsHelpSections = [
  {
    sub_header_text: '',
    p_texts: [
      {
        header: '',
        texts: [
          `SmartApp™ Leaderboards organize and list everyone using SmartApp™ based off their SmartApp™ Rating.`,
          `There is an International Leaderboard where all users are grouped together,
           a Regional Leaderboard that separates all users by the country they are from,
           and a Category Leaderboard that separates users based on their SmartApp™ Rating for each category.`,
          `You can view a specific leaderboard by clicking their respective icon on the navigation bar at the top of the page`,
          `You can navigate through a specific leaderboard by clicking the left arrow and right arrow at the bottom of each leaderboard.
           If there is no left or right arrow, it means you are at the first or last page of a leaderboard.`,
          `You can view a user's Public Profile by clicking on their name.`,
          `To appear on the International Leaderboard, a user must answer atleast 5 questions, and have a SmartApp™ Rating above 0.25.`,
          `To appear on a Regional Leaderboard, a user MUST add the country they are from to their user profile.`,
          `To appear on a Category Leaderboard, a user must have a SmartApp™ Rating above 0.25 for that specific category.`,
        ]
      }
    ]
  },
  {
    sub_header_text: `How is a user's SmartApp™ Rating calculated?`,
    lists: [
      {
        list_header: `Every time a user answers a question, the following calculation is ran on their individual performance for that question:`,
        list_items: [
          `(((1 + ((a / b) + (c * 0.15)) + ((10 - t) / 10) + d) / 3)) * 10`,
          `a = total incorrect answers for the question`,
          `b = total answers for the question`,
          `c = times users have run out of time while trying to answer the question`,
          `d = the question's difficulty rating (0.8 for Easy, 0.9 for Medium, 1.0 for Hard)`,
          `t = time it takes the user to answer the question correctly (in seconds)`,
        ]
      }
    ],
  },
  {
    sub_header_text: '',
    p_texts: [
      {
        header: '',
        texts: [
          `The results of this calculation is then averaged with their pre existing overall rating,
            and their pre existing ratings for the difficulty and category for that question,
            yielding 3 respective ratings for the user.`,
          `If a user answers a question incorrectly, their rating for that question is set to 0.25`,
          `If a user runs out of time trying to answer a question, their rating for that question is set to 0.2`,
          `All of your ratings can be viewed on your User Dashboard under the Statistics sub menu.`
        ]
      }
    ]
  },
]

export default makeLeaderBoardsHelpSections

  // {
  //   sub_header_text: '',
  //   p_texts: [
  //     {
  //       header: '',
  //       texts: [
  //
  //       ]
  //     }
  //   ]
  // },



  // {
  //   sub_header_text: '',
  //   lists: [
  //     {
  //       list_header: '',
  //       list_items: [
  //
  //       ]
  //     }
  //   ]
  // },


  // {
  //   sub_header_text: '',
  //   lists: [
  //     {
  //       list_header: '',
  //       list_items: [
  //
  //       ]
  //     }
  //   ],
  //   p_texts: [
  //     {
  //       header: '',
  //       texts: [
  //
  //       ]
  //     }
  //   ]
  // },