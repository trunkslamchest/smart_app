const makeDashboardHelpSections = [
  {
    sub_header_text: 'Welcome to your Dashboard!',
    p_texts: [
      {
        header: '',
        texts: [
          `SmartApp™ Dashboards are where you can view all sorts of information about your profile,
           and make various changes regarding your account information or privacy settings.`,
          `You can navigate through the different dashboards by clicking their respective icons on the navigation bar at the top of the page.`
        ]
      }
    ]
  },
  {
    sub_header_text: 'Profile Dashboard',
    p_texts: [
      {
        header: '',
        texts: [
          `This is where you can view the information attached to your SmartApp™ Profile.`,
          `You can view your profile information by clicking the 'Profile' button (the first button) on the navigation bar located at the top of the page.`,
          `You can also change your information by clicking on the 'Edit Profile' button on the top right portion of the page.`,
          `You can include as much or as little information about yourself as you feel comfortable.
          SmartApp™ only requires a user name, a valid email, and a password.`,
          `Your email is not and can not be made visible on your public profile. This is for security/privacy reasons.`,
          `You can view your public profile by clicking the 'View Public Profile' button on the top right portion of the page as well.`,
          `If you do not want to have specific pieces of information displayed on your public profile,
           you can hide them by changing your Privacy settings on the Settings Dashboard.`,
          `There are some restrictions for each piece of information you can add to your profile:`
        ]
      }
    ]
  },
  {
    sub_header_text: '',
    lists: [
      {
        list_header: `Profile Picture:`,
        list_items: [
          'Cannot be larger than 150x150 in dimension',
          'Cannot be larger than 2MB in size',
        ]
      },
      {
        list_header: `User Name:`,
        list_items: [
          `Cannot be shorter than 3 characters`,
          `Cannot be longer than 20 characters`,
          `Cannot be made of only numbers`,
          `Cannot be made of only special characters`,
          "Cannot contain ! @ # % ^ & ( ) [ ] { } ; : < > \\ / ? | = + , . ` ~"
        ]
      },
      {
        list_header: 'Email:',
        list_items: [
          `Cannot be shorter than 10 characters`,
          `Cannot be longer than 100 characters`,
          `Must follow the RFC 5322 (sections 3.2.3 and 3.4.1), RFC 5321, and by extension, RFC 6531 standard formats`,
        ]
      },
      {
        list_header: 'First & Last Names:',
        list_items: [
          `Cannot contain numbers`,
          `Cannot contain only special characters`,
          `First & Last Names Cannot be shorter than 2 characters`,
          `First Names Cannot be longer than 25 characters`,
          `Last Names Cannot be longer than 50 characters`,
          `Cannot contain ! @ # $ % & * ( ) [ ] { } ; : < > \\ / ? | _ = + ~`
        ]
      },
      {
        list_header: 'Biography:',
        list_items: [
          `Cannot be longer than 255 characters`,
          `Cannot strictly contain numbers`,
          `Cannot strictly contain special characters`,
          "Cannot contain @ ^ [ ] { } < > ` ~"
        ]
      },
    ]
  },
  {
    sub_header_text: 'Statistics Dashboard',
    p_texts: [
      {
        header: '',
        texts: [
          `Here is where you can view all of the statistics gathered on the questions you have answered.`,
          `You can view your statistics by clicking the 'Statistics' button (the line graphy) on the navigation bar located at the top of the page.`,
          `If you have answered questions for a specific difficulty or category,
           you can click on it and view information on each question you have answered.
           If you have not answered questions for a specific difficulty or category,
           it will be greyed out and you will not be able to click on it.`,
          `You can only view questions you have answered, so the more questions you answer, the more questions you can view.`,
          `You can also click on the 'View Question' button for each question you have answered to view even more detailed statistics for each question,
           or to go back and vote/comment on a question you might have missed.`,
          `If you do not want to have your statstics displayed on your public profile,
           you can hide them by changing your Privacy settings on the Settings Dashboard.`
        ]
      }
    ]
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
    sub_header_text: '',
    p_texts: [
      {
        header: 'Rank',
        texts: [
          `After answering 5 questions, you are granted a SmartApp™ Rank that increases or decreases based on how well you do on each question.`,
          `Your SmartApp™ Rank is an alphanumeric representation of your SmartApp™ Rating.`
        ]
      }
    ],
    lists: [
      {
        list_header: `Every time you answer a question, your SmartApp™ Rating is re-calculate, then translated using the following scale:`,
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
        header: 'Rating',
        texts: [
          `After answering 5 questions, you will recieve a SmartApp™ Rating.`,
          `You will also receive an overall rating for each difficulty level and category you answer questions in,
           as well as individual ratings for each question you answer.`
        ]
      }
    ],
    lists: [
      {
        list_header: `Every time you answer a question, the following calculation is ran on your performance:`,
        list_items: [
          `(((1 + ((a / b) + (c * 0.15)) + ((10 - t) / 10) + d) / 3)) * 10`,
          `a = total incorrect answers for the question`,
          `b = total answers for the question`,
          `c = times users have run out of time while trying to answer the question`,
          `d = the question's difficulty rating (0.8 for Easy, 0.9 for Medium, 1.0 for Hard)`,
          `t = time it takes the user to answer the question correctly (in seconds)`
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
        ]
      }
    ]
  },
  {
    sub_header_text: 'Achievements Dashboard',
    p_texts: [
      {
        header: '',
        texts: [
          `Here is where you can view all of the Achievements you have unlocked while answering questions.`,
          `You can view both all of the achievements you have unlocked, as well as the achievements you haven't unlocked
           by clicking the 'Achievements' button (the trophy) on the navigation bar located at the top of the page.`,
          `Achievements can be unlocked by completing various goals while answering questions
           (ex: Answer 5 questions in under 1 second, Answer 10 Politics questions correctly, etc...)`,
          `You will recieve notifications after answering a question if you have unlocked and achievement,
           which will then be displayed on your Achievements Dashboard, and on your public profile.`,
          `If you do not want to have your achievements displayed on your public profile,
           you can hide them by changing your Privacy settings on the Settings Dashboard.`
        ]
      }
    ]
  },
  {
    sub_header_text: 'Settings Dashboard',
    p_texts: [
      {
        header: '',
        texts: [
          `Here is where you can change various settings for your SmartApp™ Profile.`,
          `You can view and edit your profile settings by clicking the 'Settings' button (the gear) on the navigation bar located at the top of the page.`,
          `You can delete your SmartApp Profile by clicking the 'Delete Profile' button located on the top right of the page.`,
          `At the moment, the only option is to hide or show various pieces of information attached to your profile on your public profile,
           or hide all information and set your public profile to private.`,
          `User Privacy is something we value, so that has been the main focus of development in relation to profile settings.`,
          `We plan on adding more profile settings in the near future :D`
        ]
      }
    ]
  },
]

export default makeDashboardHelpSections

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