const makeResultsHelpSections = [
  {
    sub_header_text: '',
    p_texts: [
      {
        header: '',
        texts: [
          `Here is where you can view statistics for an individual question,
           give the question a rating based on how much you like or dislike the question,
           or discuss the question with other users.`,
          `You can also view/discuss questions you have previously answered at any time
           by accessing the question from your Statistics Dashboard on your Profile.`,
          `The only catch is that you can only view/discuss questions that you have answered.
           This is to prevent users obtaining pre existing knowledge of questions before they are answered.`,
          `If you want to move on and continue answering questions,
           you can click on the 'Next Question' button at the bottom of the page.`
        ]
      }
    ]
  },
  {
    sub_header_text: 'Statistics',
    p_texts: [
      {
        header: '',
        texts: [
          `Your Individual performance and statistics can be viewed by clicking on the 'Results' button (the line graph)
           located on the nav bar at the top of the page.`,
          `The results of your performance will be displayed (Correct, Incorrect or Outta Time),
           and if you answered the question incorrectly, the correct answer will be displayed as well.`
        ]
      }
    ],
  },
  {
    sub_header_text: '',
    p_texts: [
      {
        header: 'Performance',
        texts: [
          `In the Performance section, you can view the SmartApp™ Rating, SmartApp Rank™, and the time it took you to answer the question.`
        ]
      }
    ],
    lists: [
      {
        list_header: `SmartApp™ Ratings are determined by the following calculation:`,
        list_items: [
          `(((1 + ((a / b) + (c * 0.15)) + ((10 - t) / 10) + d) / 3)) * 10`,
          `a = total incorrect answers for the question`,
          `b = total answers for the question`,
          `c = times users have run out of time while trying to answer the question`,
          `d = the question's difficulty rating (0.8 for Easy, 0.9 for Medium, 1.0 for Hard)`,
          `t = time it takes the user to answer the question correctly (in seconds)`
        ]
      },
      {
        list_header: `SmartApp™ Ranks are an alphanumeric representation of your SmartApp™ Rating, and are translated using the following scale:`,
        list_items: [
          `rating higher than 1.00 = S`,
          `rating between 1.00 and 0.95 = A+`,
          `rating between 0.95 and 0.9 = A`,
          `rating between 0.9 and 0.85 = A-`,
          `rating between 0.85 and 0.8 = B+`,
          `rating between 0.8 and 0.75 = B`,
          `rating between 0.75 and 0.7 = B-`,
          `rating between 0.7 and 0.65 = C+`,
          `rating between 0.65 and 0.6 = C`,
          `rating between 0.6 and 0.55 = C-`,
          `rating between 0.55 and 0.5 = D+`,
          `rating between 0.5 and 0.45 = D`,
          `rating between 0.45 and 0.4 = D-`,
          `rating between 0.4 and 0.35 = F+`,
          `rating between 0.35 and 0.3 = F`,
          `rating between 0.3 and 0.25 = F-`,
          `rating lower than 0.25`
        ]
      }
    ],
  },
  {
    sub_header_text: '',
    p_texts: [
      {
        header: 'Experience',
        texts: [
        `You gain experience for each question you answer.
         The harder the questions you answer, the less time it takes you to answer a question correctly,
         the more experience you gain, and the more levels you unlock.`,
        `Each level takes 100XP to unlock.`
        ]
      }
    ],
    lists: [
      {
        list_header: `Experience gained from each question is calculated with the following formula:`,
        list_items: [
          `a + b + (10 - t) * 1.05`,
          `a = base experience (8 if answered correctly, 3 if answered incorrectly)`,
          `b = question difficulty ratio (2 for Easy questions, 5 for Medium, 10 for Hard)`,
          `t = the amount of time it takes you to answer the question`
        ]
      }
    ],
  },
  {
    sub_header_text: 'Question Statistics',
    p_texts: [
      {
        header: '',
        texts: [
          `The Question Statistics section lists various information about the question you've answered that is not specific to your results or performance.`
        ]
      },
      {
        header: 'Difficulty',
        texts: [
          `The Question Difficulty Level is the level of difficulty the question has been categorized as,
           while the Question Difficulty Rating is an amalgamation of how difficult the question is based off the answers of users.`
        ]
      }
    ],
    lists: [
      {
        list_header: 'Question Difficulty Ratings are determined by the following calculation:',
        list_items: [
          `(a / b) + (c * 0.15)`,
          `a = total amount of incorrect answers`,
          `b = total amount of all answers`,
          `c = total amount of users who ran out of time trying to answer the question`,
          `If a question has no correct answers, the question's difficulty rating is set to 1.00`
        ]
      }
    ]
  },
  {
    sub_header_text: 'Achievements',
    p_texts: [
      {
        header: '',
        texts: [
          `If you unlock one or more achievements while answering a question, it will be displayed here.`,
          `Achievements can be unlocked by completing various goals while answering questions
           (ex: Answer 5 questions in under 1 second, Answer 10 Politics questions correctly, etc...)`,
          `The achievements you unlock will also be displayed on your Profile Dashboard,
           as well as your public user profile.`,
          `If you do not want to have your achievements displayed on your public profile,
           you can hide them by changing your Privacy settings on the Settings Dashboard.`
        ]
      }
    ]
  },
  {
    sub_header_text: 'Voting',
    p_texts: [
      {
        header: '',
        texts: [
          `After answering a question,
           you can give the question a rating based on how much you like or dislike the question,
           from 0 stars (the worst) to 5 stars (the best).`,
           `Voting is located in the 'Discuss' section of SmartApp Results,
           and can be accessed by clicking on the 'Discuss' button (the chat bubble) located on the nav bar at the top of the page.`,
           `Once you vote on a question, you can view the overall voting statistics of all users on the question,
            organized by votes for each rating, average rating, total votes, and an overall approval rating.`,
           `You can only vote on a question once, so chose wisely!`
        ]
      }
    ]
  },
  {
    sub_header_text: '',
    p_texts: [
      {
        header: 'Question Approval Ratings',
        texts: [
          `Each question recieves a Question Approval Rating as users vote on their opinion of the question.`
        ]
      }
    ],
    lists: [
      {
        list_header: 'Question Approval Rating are a weighted average using the following calculation:',
        list_items: [
          `((a * 5) + (b * 4) + (c * 3) + (d * 2) + (e * 1)) / f) * 2) / 10`,
          `a = number of 5 Star Ratings`,
          `b = number of 4 Star Ratings`,
          `c = number of 3 Star Ratings`,
          `d = number of 2 Star Ratings`,
          `e = number of 1 Star Ratings`,
          `f = total number of votes`,
          `After a question's Approval Rating is calculated, it is translated to the same S-E scale that SmartApp™ Ranks use.`
        ]
      }
    ],
  },
  {
    sub_header_text: 'Comments',
    p_texts: [
      {
        header: '',
        texts: [
          `After answering a question, you can discuss the question with other users by adding comments.`,
          `Commenting and Discussion threads are located in the 'Discuss' section of SmartApp Results,
           and can be accessed by clicking on the 'Discuss' button (the chat bubble) located on the nav bar at the top of the page.`,
          `You can add, edit or delete any of the comments you have previously made at any time.`
        ]
      }
    ],
    lists: [
      {
        list_header: `There are some restrictions for the comments you add to a discussion:`,
        list_items: [
          `Cannot be less than 2 character`,
          `Cannot be more than 255 characters`,
          `Cannot strictly contain numbers`,
          `Cannot strictly contain special characters`,
          'Cannot contain ^ [ ] { } | ` ~ '
        ]
      }
    ]
  },
  {
    sub_header_text: 'Support',
    p_texts: [
      {
        header: '',
        texts: [
          `If you have any issues creating viewing statistics, voting or discussing questions,
          please submit a support ticket(TBA).`,
        ]
      }
    ]
  },
]

export default makeResultsHelpSections

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
  //   p_texts: [
  //     {
  //       header: '',
  //       texts: [
  //
  //       ]
  //     }
  //   ],
  //   lists: [
  //     {
  //       list_header: '',
  //       list_items: [
  //
  //       ]
  //     }
  //   ],
  // },